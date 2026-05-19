"use strict";

const nodemailer = require("nodemailer");

// ── Create reusable transporter ───────────────────────────────────────────────
let transporter = null;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const safe = (value) => escapeHtml(value ?? "");

function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("⚠️  SMTP credentials not configured — emails will be skipped.");
    return null;
  }

  const allowInvalidTls = process.env.SMTP_ALLOW_INVALID_CERT === "true";

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    ...(allowInvalidTls ? { tls: { rejectUnauthorized: false } } : {}),
  });

  return transporter;
}

// ── Send Admin Notification: Contact ─────────────────────────────────────────
async function sendContactNotification(contact) {
  const t = getTransporter();
  if (!t) return false;

  try {
    await t.sendMail({
      from: `"Visualise.Co Website" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `🆕 New Contact Enquiry from ${contact.name}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto;background:#0f0f0f;color:#e0e0e0;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#ff6b00,#ff9500);padding:24px 32px;">
            <h1 style="margin:0;color:#fff;font-size:20px;">New Contact Enquiry</h1>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Visualise.Co Website Form</p>
          </div>
          <div style="padding:32px;border:1px solid #222;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#888;width:130px;">Name</td><td style="padding:8px 0;font-weight:600;">${safe(contact.name)}</td></tr>
              <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;"><a href="mailto:${safe(contact.email)}" style="color:#ff6b00;">${safe(contact.email)}</a></td></tr>
              <tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;">${safe(contact.phone || "—")}</td></tr>
              <tr><td style="padding:8px 0;color:#888;">Service</td><td style="padding:8px 0;">${safe(contact.service || "—")}</td></tr>
              <tr><td style="padding:8px 0;color:#888;">Budget</td><td style="padding:8px 0;">${safe(contact.budget || "—")}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #222;margin:20px 0;" />
            <p style="color:#888;margin:0 0 8px;font-size:13px;">MESSAGE</p>
            <p style="background:#1a1a1a;padding:16px;border-radius:8px;line-height:1.6;white-space:pre-wrap;">${safe(contact.message)}</p>
          </div>
          <div style="background:#1a1a1a;padding:16px 32px;text-align:center;">
            <p style="margin:0;color:#555;font-size:12px;">Received at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
          </div>
        </div>
      `,
    });

    // Auto-reply to the user
    await t.sendMail({
      from: `"Visualise.Co" <${process.env.SMTP_USER}>`,
      to: contact.email,
      subject: `Thanks for reaching out, ${safe(contact.name).split(" ")[0]}! 👋`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto;background:#0f0f0f;color:#e0e0e0;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#ff6b00,#ff9500);padding:24px 32px;">
            <h1 style="margin:0;color:#fff;font-size:20px;">We've received your message!</h1>
          </div>
          <div style="padding:32px;border:1px solid #222;">
            <p>Hi ${safe(contact.name).split(" ")[0]},</p>
            <p>Thanks for getting in touch with Visualise.Co. We've received your enquiry and will get back to you <strong>within 4 business hours</strong>.</p>
            <p>In the meantime, feel free to <a href="https://wa.me/919876543210" style="color:#ff6b00;">chat with us on WhatsApp</a> for a faster response.</p>
            <hr style="border:none;border-top:1px solid #222;margin:20px 0;" />
            <p style="color:#888;font-size:13px;">Your message summary:</p>
            <p style="background:#1a1a1a;padding:16px;border-radius:8px;font-size:13px;color:#aaa;">${safe(contact.message)}</p>
          </div>
          <div style="background:#1a1a1a;padding:16px 32px;text-align:center;">
            <p style="margin:0;color:#555;font-size:12px;">© ${new Date().getFullYear()} Visualise.Co · Varanasi, India</p>
          </div>
        </div>
      `,
    });

    return true;
  } catch (err) {
    console.error("Email send error (contact):", err.message);
    return false;
  }
}

// ── Send Admin Notification: Quote ───────────────────────────────────────────
async function sendQuoteNotification(quote) {
  const t = getTransporter();
  if (!t) return false;

  try {
    await t.sendMail({
      from: `"Visualise.Co Website" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `💼 New Quote Request — ${safe(quote.plan?.toUpperCase() || "CUSTOM")} plan from ${safe(quote.name)}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto;background:#0f0f0f;color:#e0e0e0;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#7c3aed,#a78bfa);padding:24px 32px;">
            <h1 style="margin:0;color:#fff;font-size:20px;">New Quote Request</h1>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);">Plan: ${safe(quote.plan?.toUpperCase() || "CUSTOM")}</p>
          </div>
          <div style="padding:32px;border:1px solid #222;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#888;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${safe(quote.name)}</td></tr>
              <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;"><a href="mailto:${safe(quote.email)}" style="color:#a78bfa;">${safe(quote.email)}</a></td></tr>
              <tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;">${safe(quote.phone || "—")}</td></tr>
              <tr><td style="padding:8px 0;color:#888;">Company</td><td style="padding:8px 0;">${safe(quote.company || "—")}</td></tr>
              <tr><td style="padding:8px 0;color:#888;">Services</td><td style="padding:8px 0;">${(quote.services || []).map((s) => safe(s)).join(", ")}</td></tr>
              <tr><td style="padding:8px 0;color:#888;">Budget</td><td style="padding:8px 0;">${safe(quote.budget || "—")}</td></tr>
              <tr><td style="padding:8px 0;color:#888;">Timeline</td><td style="padding:8px 0;">${safe(quote.timeline || "—")}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #222;margin:20px 0;" />
            <p style="color:#888;margin:0 0 8px;font-size:13px;">PROJECT DESCRIPTION</p>
            <p style="background:#1a1a1a;padding:16px;border-radius:8px;line-height:1.6;white-space:pre-wrap;">${safe(quote.projectDescription)}</p>
          </div>
        </div>
      `,
    });

    // Auto-reply
    await t.sendMail({
      from: `"Visualise.Co" <${process.env.SMTP_USER}>`,
      to: quote.email,
      subject: `Your quote request is received, ${safe(quote.name).split(" ")[0]}! 🚀`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto;background:#0f0f0f;color:#e0e0e0;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#7c3aed,#a78bfa);padding:24px 32px;">
            <h1 style="margin:0;color:#fff;font-size:20px;">Quote request received!</h1>
          </div>
          <div style="padding:32px;border:1px solid #222;">
            <p>Hi ${safe(quote.name).split(" ")[0]},</p>
            <p>We've received your project brief and will have a detailed proposal ready for you within <strong>24 hours</strong>.</p>
            <p>A member of our team will also reach out to schedule a quick discovery call if needed.</p>
          </div>
          <div style="background:#1a1a1a;padding:16px 32px;text-align:center;">
            <p style="margin:0;color:#555;font-size:12px;">© ${new Date().getFullYear()} Visualise.Co</p>
          </div>
        </div>
      `,
    });

    return true;
  } catch (err) {
    console.error("Email send error (quote):", err.message);
    return false;
  }
}

module.exports = { sendContactNotification, sendQuoteNotification };
