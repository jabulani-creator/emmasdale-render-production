"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export async function createHealthPostAction(formData: FormData) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { error: "Authentication required" };
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

    const response = await fetch(`${baseUrl}/health`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Sending FormData directly for multipart/form-data
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.msg || "Failed to create health tip" };
    }

    // Revalidate paths that show health tips
    revalidatePath("/dashboard/all-health");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Create Health Tip Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}