"use strict";

const mongoose = require("mongoose");

// ── Contact Enquiry Schema ────────────────────────────────────────────────────
const contactSchema = new mongoose.Schema(
  {
    // ── Core fields ─────────────────────────────────────────────────────
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
      maxlength: [254, "Email cannot exceed 254 characters"],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
      default: null,
    },
    service: {
      type: String,
      trim: true,
      enum: {
        values: [
          "Video Editing",
          "Web Development",
          "Social Media Management",
          "Graphic Design",
          "Brand Identity",
          "Content Strategy",
          "Reels & Short-Form Video",
          "YouTube Management",
          "E-Commerce Development",
          "other",
          "",
        ],
        message: "Invalid service selected",
      },
      default: "",
    },
    budget: {
      type: String,
      trim: true,
      enum: {
        values: [
          "Under ₹10,000",
          "₹10,000 – ₹25,000",
          "₹25,000 – ₹50,000",
          "₹50,000 – ₹1,00,000",
          "Above ₹1,00,000",
          "",
        ],
        message: "Invalid budget range",
      },
      default: "",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [3000, "Message cannot exceed 3000 characters"],
    },

    // ── Meta ────────────────────────────────────────────────────────────
    status: {
      type: String,
      enum: ["new", "in_progress", "replied", "closed", "spam"],
      default: "new",
    },
    adminNote: {
      type: String,
      maxlength: [1000, "Admin note cannot exceed 1000 characters"],
      default: "",
    },
    source: {
      type: String,
      enum: ["website_form", "whatsapp", "email_direct", "referral", "other"],
      default: "website_form",
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Indexes ───────────────────────────────────────────────────────────────────
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

// ── Virtuals ──────────────────────────────────────────────────────────────────
contactSchema.virtual("displayStatus").get(function () {
  const map = {
    new: "🆕 New",
    in_progress: "🔄 In Progress",
    replied: "✅ Replied",
    closed: "🔒 Closed",
    spam: "🚫 Spam",
  };
  return map[this.status] || this.status;
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
