"use strict";

const { validationResult } = require("express-validator");
const Quote = require("../models/Quote.model");
const { sendQuoteNotification } = require("../services/email.service");

// ── POST /api/quote ───────────────────────────────────────────────────────────
const submitQuote = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const {
      name,
      email,
      phone,
      company,
      services,
      plan,
      budget,
      timeline,
      projectDescription,
      referralSource,
    } = req.body;

    const normalizedServices = Array.isArray(services)
      ? services.filter(Boolean)
      : services
        ? [services]
        : [];

    // Spam guard — one quote per email per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recent = await Quote.findOne({
      email: email.toLowerCase(),
      createdAt: { $gte: oneHourAgo },
    });
    if (recent) {
      return res.status(429).json({
        success: false,
        message: "You've already submitted a quote request. Please wait before submitting another.",
      });
    }

    const quote = await Quote.create({
      name,
      email: email.toLowerCase(),
      phone: phone || null,
      company: company || null,
      services: normalizedServices,
      plan: plan || "custom",
      budget: budget || null,
      timeline: timeline || "",
      projectDescription,
      referralSource: referralSource || null,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || null,
    });

    // Non-blocking email
    sendQuoteNotification(quote).then((sent) => {
      if (sent) {
        Quote.findByIdAndUpdate(quote._id, { emailSent: true }).catch(() => {});
      }
    });

    return res.status(201).json({
      success: true,
      message: "Quote request received! We'll send a proposal within 24 hours.",
      data: { id: quote._id },
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/quote (Admin) ────────────────────────────────────────────────────
const getQuotes = async (req, res, next) => {
  try {
    const pageParam = typeof req.query.page === "string" ? Number(req.query.page) : 1;
    const limitParam = typeof req.query.limit === "string" ? Number(req.query.limit) : 20;
    const page = Math.max(1, pageParam || 1);
    const limit = Math.min(50, limitParam || 20);
    const skip = (page - 1) * limit;

    const filter = {};
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const plan = typeof req.query.plan === "string" ? req.query.plan : undefined;
    if (status) filter.status = status;
    if (plan) filter.plan = plan;

    const [total, quotes] = await Promise.all([
      Quote.countDocuments(filter),
      Quote.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    ]);

    return res.json({
      success: true,
      data: quotes,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

// ── PATCH /api/quote/:id/status (Admin) ──────────────────────────────────────
const updateQuoteStatus = async (req, res, next) => {
  try {
    const { status, adminNote, quoteAmount } = req.body;
    const update = {};
    if (status) update.status = status;
    if (adminNote !== undefined) update.adminNote = adminNote;
    if (quoteAmount !== undefined) update.quoteAmount = quoteAmount;

    const quote = await Quote.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!quote) return res.status(404).json({ success: false, message: "Quote not found" });
    return res.json({ success: true, data: quote });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/quote/:id (Admin) ────────────────────────────────────────────
const deleteQuote = async (req, res, next) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) return res.status(404).json({ success: false, message: "Quote not found" });
    return res.json({ success: true, message: "Quote deleted." });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitQuote, getQuotes, updateQuoteStatus, deleteQuote };
