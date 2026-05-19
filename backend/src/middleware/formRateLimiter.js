"use strict";

const rateLimit = require("express-rate-limit");

// ── Per-form rate limiter ──────────────────────────────────────────────────────
// Stricter than the global limiter — prevents form spam
const formLimiter = rateLimit({
  windowMs: Number(process.env.FORM_RATE_LIMIT_WINDOW_MS) || 60 * 60 * 1000, // 1 hour
  max: Number(process.env.FORM_RATE_LIMIT_MAX) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: {
    success: false,
    message: "Too many form submissions from this IP. Please try again in an hour.",
  },
  skip: () => process.env.NODE_ENV === "test",
});

module.exports = formLimiter;
