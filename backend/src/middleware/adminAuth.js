"use strict";

const jwt = require("jsonwebtoken");

// ─────────────────────────────────────────────────────────────
// ADMIN AUTH MIDDLEWARE
// ─────────────────────────────────────────────────────────────
const adminAuth = (req, res, next) => {
  try {
    const token =
      req.cookies?.vc_admin_token ||
      req.headers.authorization?.replace("Bearer ", "");

    // No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    // JWT secret
    const jwtSecret = process.env.ADMIN_JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        message: "ADMIN_JWT_SECRET missing.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret);

    // Invalid role
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden.",
      });
    }

    // Attach admin
    req.admin = decoded;

    next();

  } catch (err) {
    console.error("Admin auth error:", err);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = adminAuth;