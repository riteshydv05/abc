"use strict";

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const contactRoutes = require("./routes/contact.routes");
const quoteRoutes = require("./routes/quote.routes");
const newsletterRoutes = require("./routes/newsletter.routes");
const adminRoutes = require("./routes/admin.routes");
const healthRoutes = require("./routes/health.routes");

const {
  errorHandler,
  notFound,
} = require("./middleware/errorHandler");

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

// ─────────────────────────────────────────────────────────────
// SECURITY
// ─────────────────────────────────────────────────────────────
app.use(helmet());

// ─────────────────────────────────────────────────────────────
// COOKIE PARSER
// ─────────────────────────────────────────────────────────────
app.use(cookieParser());

// ─────────────────────────────────────────────────────────────
// CORS
// ─────────────────────────────────────────────────────────────
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ||
  "http://localhost:3000"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow server-to-server requests
      if (!origin) {
        return cb(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return cb(null, true);
      }

      return cb(
        new Error(`Origin ${origin} not allowed by CORS`)
      );
    },

    methods: [
      "GET",
      "POST",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

// ─────────────────────────────────────────────────────────────
// BODY PARSING
// ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: "1mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

// ─────────────────────────────────────────────────────────────
// LOGGING
// ─────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ─────────────────────────────────────────────────────────────
// RATE LIMIT
// ─────────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs:
    Number(process.env.RATE_LIMIT_WINDOW_MS) ||
    15 * 60 * 1000,

  max:
    Number(process.env.RATE_LIMIT_MAX) ||
    100,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests, please slow down.",
  },
});

app.use("/api", globalLimiter);

// ─────────────────────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────────────────────
app.use("/api/health", healthRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/quote", quoteRoutes);

app.use("/api/newsletter", newsletterRoutes);

app.use("/api/admin", adminRoutes);

// ─────────────────────────────────────────────────────────────
// 404 + ERROR HANDLERS
// ─────────────────────────────────────────────────────────────
app.use(notFound);

app.use(errorHandler);

module.exports = app;