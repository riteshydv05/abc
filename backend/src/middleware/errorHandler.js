"use strict";

// ── Global Error Handler ──────────────────────────────────────────────────────
const errorHandler = (err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: messages,
    });
  }

  // Mongoose CastError (bad ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  // Mongo duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`,
    });
  }

  // CORS error
  if (err.message && err.message.startsWith("Origin")) {
    return res.status(403).json({ success: false, message: err.message });
  }

  // Default 500
  const statusCode = err.statusCode || err.status || 500;
  const message =
    process.env.NODE_ENV === "production" ? "Something went wrong. Please try again later." : err.message;

  console.error(`[${req.method} ${req.path}] ❌`, err);

  return res.status(statusCode).json({ success: false, message });
};

// ── 404 Handler ───────────────────────────────────────────────────────────────
const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

module.exports = { errorHandler, notFound };
