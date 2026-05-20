"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");

// ─────────────────────────────────────────────────────────────
// ADMIN LOGIN
// ─────────────────────────────────────────────────────────────
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Check JWT secret
    const secret = process.env.ADMIN_JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        success: false,
        message: "ADMIN_JWT_SECRET is missing.",
      });
    }

    // Find admin
    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Compare password
    const validPassword = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Update last login
    admin.lastLoginAt = new Date();
    await admin.save();

    // Generate JWT
    const token = jwt.sign(
      {
        sub: admin._id.toString(),
        email: admin.email,
        role: "admin",
      },
      secret,
      {
        expiresIn: "12h",
        algorithm: "HS256",
      }
    );

    // Save cookie
    res.cookie("vc_admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 12 * 60 * 60 * 1000,
    });

    // Success response
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      admin: {
        email: admin.email,
      },
    });

  } catch (err) {
    console.error("Admin login error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  loginAdmin,
};