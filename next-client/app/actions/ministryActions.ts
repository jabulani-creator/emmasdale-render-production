"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export async function createMinistryAction(ministryData: any) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { error: "Authentication required" };
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

    const response = await fetch(`${baseUrl}/ministry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ministryData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.msg || "Failed to create ministry" };
    }

    // Revalidate paths
    revalidatePath("/ministries");
    revalidatePath("/dashboard/all-ministries"); // If we build this later

    return { success: true };
  } catch (error) {
    console.error("Create Ministry Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}