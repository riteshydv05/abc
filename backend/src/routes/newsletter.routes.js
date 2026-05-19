"use strict";

const router = require("express").Router();
const {
  subscribe,
  unsubscribe,
  getSubscribers,
} = require("../controllers/newsletter.controller");
const { subscribeValidators } = require("../validators/form.validators");
const adminAuth = require("../middleware/adminAuth");
const formLimiter = require("../middleware/formRateLimiter");

// ── Public ────────────────────────────────────────────────────────────────────
// POST /api/newsletter/subscribe
// POST /api/newsletter/unsubscribe
router.post("/subscribe", formLimiter, subscribeValidators, subscribe);
router.post("/unsubscribe", unsubscribe);

// ── Admin (protected) ─────────────────────────────────────────────────────────
// GET /api/newsletter/subscribers
router.get("/subscribers", adminAuth, getSubscribers);

module.exports = router;
