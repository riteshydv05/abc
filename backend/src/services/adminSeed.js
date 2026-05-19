"use strict";

const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin.model");

const ensureAdminSeed = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn("WARN: ADMIN_EMAIL/ADMIN_PASSWORD not set; admin seed skipped.");
    return;
  }

  const normalized = email.toLowerCase();
  const existing = await Admin.findOne({ email: normalized });
  if (existing) {
    const matches = await bcrypt.compare(password, existing.passwordHash);
    if (!matches) {
      existing.passwordHash = await bcrypt.hash(password, 10);
      await existing.save();
      console.log(`Updated admin password for ${normalized}`);
    }
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await Admin.create({ email: normalized, passwordHash });
  console.log(`Seeded admin account for ${normalized}`);
};

module.exports = { ensureAdminSeed };
