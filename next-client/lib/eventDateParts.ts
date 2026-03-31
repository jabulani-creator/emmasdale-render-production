export function eventDateParts(eventDate?: string) {
  if (!eventDate) return { day: "—", month: "TBD", line: "Date to be confirmed" };
  const ts = Date.parse(eventDate);
  if (!Number.isNaN(ts)) {
    const d = new Date(ts);
    return {
      day: String(d.getDate()),
      month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      line: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
    };
  }
  return { day: "•", month: "DATE", line: eventDate };
}
