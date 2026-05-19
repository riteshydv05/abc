"use strict";

const mongoose = require("mongoose");
const router = require("express").Router();

// GET /api/health — public uptime check
router.get("/", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    service: "Visualise.Co API",
    version: "1.0.0",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

module.exports = router;
