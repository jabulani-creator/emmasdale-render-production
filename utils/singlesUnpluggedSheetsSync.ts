import { google } from "googleapis";

type ReservationDoc = {
  _id: { toString(): string };
  createdAt?: Date;
  ticketCode?: string;
  fullName: string;
  phone: string;
  email?: string;
  gender: string;
  ageGroup: string;
  dietary?: string;
  joinWhatsappGroup: boolean;
  numberOfPeople: number;
  paymentStatus: string;
  eventKey: string;
};

/**
 * Optional: append each new Singles Unplugged reservation as a row in Google Sheets.
 * (Easier than Google Docs for tables; you can open the sheet from Drive or link it in a Doc.)
 *
 * Env (backend):
 * - GOOGLE_SHEETS_SPREADSHEET_ID — from the sheet URL: …/spreadsheets/d/THIS_PART/edit
 * - GOOGLE_SERVICE_ACCOUNT_JSON — full service-account JSON as one line, OR
 * - GOOGLE_SERVICE_ACCOUNT_JSON_B64 — same JSON base64-encoded (good for Render secrets)
 * - GOOGLE_SHEETS_TAB (optional) — sheet tab name, default "Sheet1"
 *
 * In Google Sheets: Share the spreadsheet with the service account email (Editor).
 * Add a header row once, e.g.: Submitted | Ticket | Name | Phone | Email | Gender | Age | People | WhatsApp group | Dietary | Mongo id | Status | Event key
 */
export async function appendSinglesUnpluggedReservationToSheet(doc: ReservationDoc): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  const credentials = parseServiceAccountCredentials();
  if (!spreadsheetId || !credentials) return;

  const tab = (process.env.GOOGLE_SHEETS_TAB || "Sheet1").replace(/'/g, "");
  const range = `'${tab}'!A:M`;

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const submitted = doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          submitted,
          doc.ticketCode ?? "",
          doc.fullName,
          doc.phone,
          doc.email ?? "",
          doc.gender,
          doc.ageGroup,
          String(doc.numberOfPeople),
          doc.joinWhatsappGroup ? "Yes" : "No",
          doc.dietary ?? "",
          doc._id.toString(),
          doc.paymentStatus,
          doc.eventKey,
        ],
      ],
    },
  });
}

function parseServiceAccountCredentials(): Record<string, unknown> | null {
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_B64?.trim();
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  try {
    if (b64) {
      const decoded = Buffer.from(b64, "base64").toString("utf8");
      return JSON.parse(decoded) as Record<string, unknown>;
    }
    if (raw) return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    console.warn("[SinglesUnplugged→Sheets] Invalid GOOGLE_SERVICE_ACCOUNT_JSON / _B64");
  }
  return null;
}
