"use strict";

const mongoose = require("mongoose");

// Newsletter subscriber schema
const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    name: {
      type: String,
      trim: true,
      maxlength: [100],
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "unsubscribed", "bounced"],
      default: "active",
    },
    source: {
      type: String,
      enum: ["footer_form", "popup", "blog", "landing", "other"],
      default: "footer_form",
    },
    tags: {
      type: [String],
      default: [],
    },
    unsubscribedAt: {
      type: Date,
      default: null,
    },
    ipAddress: { type: String, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

subscriberSchema.index({ status: 1 });
subscriberSchema.index({ createdAt: -1 });

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
module.exports = Subscriber;
