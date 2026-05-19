"use strict";

const mongoose = require("mongoose");
const Contact = require("../models/Contact.model");
const Quote = require("../models/Quote.model");
const Subscriber = require("../models/Subscriber.model");

// ── GET /api/admin/stats ──────────────────────────────────────────────────────
const getStats = async (req, res, next) => {
  try {
    const [
      totalContacts,
      newContacts,
      totalQuotes,
      pendingQuotes,
      totalSubscribers,
      recentContacts,
      recentQuotes,
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
      Quote.countDocuments(),
      Quote.countDocuments({ status: "pending" }),
      Subscriber.countDocuments({ status: "active" }),
      Contact.find().sort({ createdAt: -1 }).limit(5).select("name email service status createdAt").lean(),
      Quote.find().sort({ createdAt: -1 }).limit(5).select("name email plan status createdAt").lean(),
    ]);

    return res.json({
      success: true,
      data: {
        contacts: { total: totalContacts, new: newContacts },
        quotes: { total: totalQuotes, pending: pendingQuotes },
        subscribers: { active: totalSubscribers },
        recent: { contacts: recentContacts, quotes: recentQuotes },
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/admin/health/db ──────────────────────────────────────────────────
const dbHealth = async (req, res) => {
  const state = mongoose.connection.readyState;
  const labels = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
  return res.json({
    success: state === 1,
    db: labels[state] || "unknown",
    timestamp: new Date().toISOString(),
  });
};

module.exports = { getStats, dbHealth };
