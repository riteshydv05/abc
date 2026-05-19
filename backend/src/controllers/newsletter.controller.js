"use strict";

const { validationResult } = require("express-validator");
const Subscriber = require("../models/Subscriber.model");

// ── POST /api/newsletter/subscribe ───────────────────────────────────────────
const subscribe = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const { email, name, source } = req.body;

    // Already subscribed?
    const existing = await Subscriber.findOne({ email: email.toLowerCase() });

    if (existing) {
      if (existing.status === "active") {
        return res.status(200).json({
          success: true,
          message: "You're already subscribed!",
          data: { id: existing._id, alreadySubscribed: true },
        });
      }
      // Re-subscribe
      existing.status = "active";
      existing.unsubscribedAt = null;
      existing.name = name || existing.name;
      await existing.save();
      return res.json({
        success: true,
        message: "Welcome back! You've been re-subscribed.",
        data: { id: existing._id },
      });
    }

    // New subscriber
    const subscriber = await Subscriber.create({
      email: email.toLowerCase(),
      name: name || null,
      source: source || "footer_form",
      ipAddress: req.ip,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully subscribed! 🎉",
      data: { id: subscriber._id },
    });
  } catch (err) {
    // Mongo duplicate key (race condition)
    if (err.code === 11000) {
      return res.status(200).json({
        success: true,
        message: "You're already on the list!",
        data: { alreadySubscribed: true },
      });
    }
    next(err);
  }
};

// ── POST /api/newsletter/unsubscribe ─────────────────────────────────────────
const unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email).trim())) {
      return res.status(400).json({ success: false, message: "Invalid email address." });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const subscriber = await Subscriber.findOne({ email: normalizedEmail });
    if (!subscriber) {
      return res.status(404).json({ success: false, message: "Email not found." });
    }

    subscriber.status = "unsubscribed";
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    return res.json({ success: true, message: "You've been unsubscribed successfully." });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/newsletter/subscribers (Admin) ───────────────────────────────────
const getSubscribers = async (req, res, next) => {
  try {
    const pageParam = typeof req.query.page === "string" ? Number(req.query.page) : 1;
    const limitParam = typeof req.query.limit === "string" ? Number(req.query.limit) : 50;
    const page = Math.max(1, pageParam || 1);
    const limit = Math.min(100, limitParam || 50);
    const skip = (page - 1) * limit;
    const statusParam = typeof req.query.status === "string" ? req.query.status : "active";
    const status = statusParam || "active";

    const [total, subscribers] = await Promise.all([
      Subscriber.countDocuments({ status }),
      Subscriber.find({ status }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    ]);

    return res.json({
      success: true,
      data: subscribers,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { subscribe, unsubscribe, getSubscribers };
