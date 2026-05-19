"use strict";

require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const { ensureAdminSeed } = require("./services/adminSeed");

const PORT = process.env.PORT || 5000;

// ── Boot ─────────────────────────────────────────────────────────────────────
(async () => {
  await connectDB();
  await ensureAdminSeed();

  const server = app.listen(PORT, () => {
    console.log(`\n🚀  Visualise.Co API running on port ${PORT}`);
    console.log(`   Environment : ${process.env.NODE_ENV}`);
    console.log(`   Base URL    : http://localhost:${PORT}/api\n`);
  });

  // Graceful shutdown
  const graceful = (signal) => {
    console.log(`\n⚠️  ${signal} received — shutting down gracefully…`);
    server.close(() => {
      console.log("✅  HTTP server closed.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => graceful("SIGTERM"));
  process.on("SIGINT", () => graceful("SIGINT"));
  process.on("uncaughtException", (err) => {
    console.error("❌  Uncaught Exception:", err);
    process.exit(1);
  });
  process.on("unhandledRejection", (reason) => {
    console.error("❌  Unhandled Rejection:", reason);
    process.exit(1);
  });
})();
