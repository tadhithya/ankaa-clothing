import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to DB");

    // 🔥 DELETE OLD ADMINS
    await Admin.deleteMany();

    const hashed = await bcrypt.hash("admin123", 10);

    const admin = await Admin.create({
      email: "tharun2840@gmail.com",
      password: hashed,
    });

    console.log("🔥 Admin Created:", admin);

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

run();