"use strict";

const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌  MONGO_URI is not defined in .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`✅  MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected — attempting reconnect…");
      isConnected = false;
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅  MongoDB reconnected.");
      isConnected = true;
    });
  } catch (err) {
    console.error("❌  MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
