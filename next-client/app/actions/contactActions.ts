"use server";

export async function submitContactForm(formData: FormData) {
  try {
    const rawData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email") || "",
      phone: formData.get("phone"),
      purpose: formData.get("purpose"),
      message: formData.get("message") || "",
      additionalInfo: formData.get("additionalInfo") ? JSON.parse(formData.get("additionalInfo") as string) : {},
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

    const response = await fetch(`${baseUrl}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.msg || "Failed to submit form" };
    }

    return { success: true };
  } catch (error) {
    console.error("Contact Form Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
