"use strict";

const router = require("express").Router();
const {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require("../controllers/contact.controller");
const { contactValidators } = require("../validators/form.validators");
const adminAuth = require("../middleware/adminAuth");
const formLimiter = require("../middleware/formRateLimiter");

// ── Public ────────────────────────────────────────────────────────────────────
// POST /api/contact  — website contact form submission
router.post("/", formLimiter, contactValidators, submitContact);

// ── Admin (protected) ─────────────────────────────────────────────────────────
// GET    /api/contact           — list all contacts (paginated)
// PATCH  /api/contact/:id/status — update status / admin note
// DELETE /api/contact/:id       — delete a contact
router.get("/", adminAuth, getContacts);
router.patch("/:id/status", adminAuth, updateContactStatus);
router.delete("/:id", adminAuth, deleteContact);

module.exports = router;
