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

  // Client-side pre-validation (server action safety net)
  if (!name || !email || !message) {
    return { success: false, message: "Please fill in all required fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  // ── Post to the robust backend API ─────────────────────────────────────────
  const apiBase =
    process.env.BACKEND_API_URL || "http://localhost:5000/api";

  try {
    const res = await fetch(`${apiBase}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone: formData.get("phone")?.toString() || undefined,
        service: formData.get("service")?.toString() || undefined,
        budget: formData.get("budget")?.toString() || undefined,
        message,
      }),
      // Next.js — do not cache form submissions
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      // Surface validation errors from backend
      if (data.errors && Array.isArray(data.errors)) {
        const firstError = data.errors[0];
        return {
          success: false,
          message: firstError.message || "Validation failed. Please check your inputs.",
        };
      }
      return {
        success: false,
        message: data.message || "Something went wrong. Please try WhatsApp or email instead.",
      };
    }

    return {
      success: true,
      message: data.message || "Thanks! We'll get back to you within 4 business hours.",
    };
  } catch (err) {
    console.error("[submitContactForm] fetch error:", err);
    return {
      success: false,
      message:
        "Unable to reach our server. Please try WhatsApp or email us directly at hello@visualise.co",
    };
  }
}
