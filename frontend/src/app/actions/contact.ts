"use server";

export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  // Validation
  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  // Production backend URL
  const apiBase =
    process.env.NEXT_PUBLIC_BACKEND_API_URL ||
    "https://covisualise-backend.onrender.com";

  try {
    const res = await fetch(`${apiBase}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone: formData.get("phone")?.toString() || "",
        service: formData.get("service")?.toString() || "",
        budget: formData.get("budget")?.toString() || "",
        message,
      }),
      cache: "no-store",
    });

    // Safe JSON parsing
    let data;

    try {
      data = await res.json();
    } catch {
      return {
        success: false,
        message: "Server returned an invalid response.",
      };
    }

    if (!res.ok) {
      return {
        success: false,
        message:
          data.message ||
          "Something went wrong. Please try again later.",
      };
    }

    return {
      success: true,
      message:
        data.message ||
        "Thanks! We'll get back to you within 4 business hours.",
    };
  } catch (error) {
    console.error("[submitContactForm] Error:", error);

    return {
      success: false,
      message:
        "Unable to reach our server. Please try WhatsApp or email us directly at hello@visualise.co",
    };
  }
}