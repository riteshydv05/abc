"use strict";

const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const { getStats, dbHealth } = require("../controllers/admin.controller");
const { loginAdmin } = require("../controllers/adminAuth.controller");
const adminAuth = require("../middleware/adminAuth");

// Public admin auth
const loginLimiter = rateLimit({
	windowMs: Number(process.env.ADMIN_LOGIN_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
	max: Number(process.env.ADMIN_LOGIN_RATE_LIMIT_MAX) || 10,
	standardHeaders: true,
	legacyHeaders: false,
	message: { success: false, message: "Too many login attempts. Try again later." },
});

router.post("/login", loginLimiter, loginAdmin);

// All admin routes require auth
router.use(adminAuth);

// GET /api/admin/stats       — aggregated dashboard stats
// GET /api/admin/health/db   — MongoDB connection status
router.get("/stats", getStats);
router.get("/health/db", dbHealth);

module.exports = router;
