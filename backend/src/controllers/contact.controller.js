"use strict";

const { validationResult } = require("express-validator");
const Contact = require("../models/Contact.model");
const { sendContactNotification } = require("../services/email.service");

const escapeRegex = (value = "") =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ── POST /api/contact ─────────────────────────────────────────────────────────
const submitContact = async (req, res, next) => {
  try {
    // 1. Validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const { name, email, phone, service, budget, message } = req.body;

    // 2. Spam guard — duplicate check within 30 min
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);
    const recent = await Contact.findOne({
      email: email.toLowerCase(),
      createdAt: { $gte: thirtyMinsAgo },
    });
    if (recent) {
      return res.status(429).json({
        success: false,
        message: "We already received your message. Please wait 30 minutes before submitting again.",
      });
    }

    // 3. Persist to MongoDB
    const contact = await Contact.create({
      name,
      email: email.toLowerCase(),
      phone: phone || null,
      service: service || "",
      budget: budget || "",
      message,
      source: "website_form",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || null,
    });

    // 4. Send email notifications (non-blocking)
    sendContactNotification(contact).then((sent) => {
      if (sent) {
        Contact.findByIdAndUpdate(contact._id, { emailSent: true }).catch(() => {});
      }
    });

    // 5. Respond
    return res.status(201).json({
      success: true,
      message: "Thanks! We'll get back to you within 4 business hours.",
      data: { id: contact._id },
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/contact (Admin) ──────────────────────────────────────────────────
const getContacts = async (req, res, next) => {
  try {
    const pageParam = typeof req.query.page === "string" ? Number(req.query.page) : 1;
    const limitParam = typeof req.query.limit === "string" ? Number(req.query.limit) : 20;
    const page = Math.max(1, pageParam || 1);
    const limit = Math.min(50, limitParam || 20);
    const skip = (page - 1) * limit;
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const search = typeof req.query.search === "string" ? req.query.search : undefined;

    const filter = {};
    if (status) filter.status = status;
    if (search) {
      const safeSearch = escapeRegex(search);
      filter.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { email: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const [total, contacts] = await Promise.all([
      Contact.countDocuments(filter),
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    ]);

    return res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── PATCH /api/contact/:id/status (Admin) ────────────────────────────────────
const updateContactStatus = async (req, res, next) => {
  try {
    const { status, adminNote } = req.body;
    const update = {};
    if (status) update.status = status;
    if (adminNote !== undefined) update.adminNote = adminNote;

    const contact = await Contact.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    return res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/contact/:id (Admin) ──────────────────────────────────────────
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    return res.json({ success: true, message: "Contact deleted." });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitContact, getContacts, updateContactStatus, deleteContact };
