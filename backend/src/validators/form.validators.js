"use strict";

const { body } = require("express-validator");

// ── Contact Form Validators ────────────────────────────────────────────────────
exports.contactValidators = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be 2–100 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[+\d\s\-()]{7,20}$/).withMessage("Please provide a valid phone number"),

  body("service")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage("Service name is too long"),

  body("budget")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 }).withMessage("Budget value is too long"),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ min: 10, max: 3000 }).withMessage("Message must be 10–3000 characters"),
];

// ── Quote Request Validators ──────────────────────────────────────────────────
exports.quoteValidators = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be 2–100 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[+\d\s\-()]{7,20}$/).withMessage("Please provide a valid phone number"),

  body("company")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 150 }).withMessage("Company name is too long"),

  body("services")
    .notEmpty().withMessage("At least one service is required"),

  body("plan")
    .optional({ checkFalsy: true })
    .isIn(["starter", "growth", "enterprise", "custom"]).withMessage("Invalid plan selected"),

  body("budget")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage("Budget value is too long"),

  body("timeline")
    .optional({ checkFalsy: true })
    .isIn(["asap", "1_week", "2_weeks", "1_month", "flexible", ""]).withMessage("Invalid timeline"),

  body("projectDescription")
    .trim()
    .notEmpty().withMessage("Project description is required")
    .isLength({ min: 20, max: 5000 }).withMessage("Description must be 20–5000 characters"),

  body("referralSource")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 }).withMessage("Referral source is too long"),
];

// ── Newsletter Validators ─────────────────────────────────────────────────────
exports.subscribeValidators = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("name")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage("Name is too long"),

  body("source")
    .optional({ checkFalsy: true })
    .isIn(["footer_form", "popup", "blog", "landing", "other"]).withMessage("Invalid source"),
];
