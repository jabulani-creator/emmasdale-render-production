"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export async function createPostAction(formData: FormData) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { error: "Authentication required" };
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

    const response = await fetch(`${baseUrl}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Sending FormData directly for multipart/form-data
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.msg || "Failed to create post" };
    }

    // Revalidate paths that show posts
    revalidatePath("/dashboard/all-post");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Create Post Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}