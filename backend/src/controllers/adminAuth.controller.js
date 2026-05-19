"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const secret = process.env.ADMIN_JWT_SECRET;
    if (!secret) {
      return res.status(500).json({
        success: false,
        message: "Server misconfiguration: ADMIN_JWT_SECRET is missing.",
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = jwt.sign(
      { sub: admin._id.toString(), email: admin.email, role: "admin" },
      secret,
      { expiresIn: "12h", algorithm: "HS256" }
    );

    return res.json({
      success: true,
      token,
      admin: { email: admin.email },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { loginAdmin };
