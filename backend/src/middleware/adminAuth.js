"use strict";

const jwt = require("jsonwebtoken");

const getCookie = (cookieHeader, name) => {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.split("=").slice(1).join("="));
};

const getBearerToken = (req) => {
  const auth = req.headers["authorization"];
  if (!auth || !auth.startsWith("Bearer ")) return null;
  return auth.replace("Bearer ", "").trim();
};

// Admin auth middleware (JWT preferred; legacy admin key optional).
const adminAuth = (req, res, next) => {
  const token =
    getBearerToken(req) || getCookie(req.headers.cookie, "vc_admin_token");

  const jwtSecret = process.env.ADMIN_JWT_SECRET;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  if (!jwtSecret) {
    console.error("ERROR: ADMIN_JWT_SECRET is not set in .env");
    return res.status(500).json({ success: false, message: "Server misconfiguration." });
  }

  try {
    const payload = jwt.verify(token, jwtSecret, { algorithms: ["HS256"] });
    if (payload?.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden." });
    }
    req.admin = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized. Invalid token." });
  }
};

module.exports = adminAuth;
