"use strict";

const mongoose = require("mongoose");

// ── Quote Request Schema ──────────────────────────────────────────────────────
// Separate from contact — more detailed for project scoping
const quoteSchema = new mongoose.Schema(
  {
    // ── Client info ─────────────────────────────────────────────────────
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
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20],
      default: null,
    },
    company: {
      type: String,
      trim: true,
      maxlength: [150, "Company name cannot exceed 150 characters"],
      default: null,
    },

    // ── Project info ────────────────────────────────────────────────────
    services: {
      type: [String],
      required: [true, "At least one service must be selected"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one service is required",
      },
    },
    plan: {
      type: String,
      enum: ["starter", "growth", "enterprise", "custom"],
      default: "custom",
    },
    budget: {
      type: String,
      trim: true,
      default: null,
    },
    timeline: {
      type: String,
      enum: ["asap", "1_week", "2_weeks", "1_month", "flexible", ""],
      default: "",
    },
    projectDescription: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      minlength: [20, "Please describe your project in at least 20 characters"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    referralSource: {
      type: String,
      trim: true,
      maxlength: [200],
      default: null,
    },

    // ── Admin meta ──────────────────────────────────────────────────────
    status: {
      type: String,
      enum: ["pending", "reviewed", "quoted", "accepted", "rejected", "spam"],
      default: "pending",
    },
    quoteAmount: {
      type: Number,
      default: null,
    },
    adminNote: {
      type: String,
      maxlength: [2000],
      default: "",
    },
    ipAddress: { type: String, default: null },
    userAgent: { type: String, default: null },
    emailSent: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Indexes ───────────────────────────────────────────────────────────────────
quoteSchema.index({ email: 1 });
quoteSchema.index({ status: 1 });
quoteSchema.index({ createdAt: -1 });
quoteSchema.index({ plan: 1 });

const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;
