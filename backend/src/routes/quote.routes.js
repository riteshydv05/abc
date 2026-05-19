"use strict";

const router = require("express").Router();
const {
  submitQuote,
  getQuotes,
  updateQuoteStatus,
  deleteQuote,
} = require("../controllers/quote.controller");
const { quoteValidators } = require("../validators/form.validators");
const adminAuth = require("../middleware/adminAuth");
const formLimiter = require("../middleware/formRateLimiter");

// ── Public ────────────────────────────────────────────────────────────────────
// POST /api/quote  — project quote request form
router.post("/", formLimiter, quoteValidators, submitQuote);

// ── Admin (protected) ─────────────────────────────────────────────────────────
router.get("/", adminAuth, getQuotes);
router.patch("/:id/status", adminAuth, updateQuoteStatus);
router.delete("/:id", adminAuth, deleteQuote);

module.exports = router;
