import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";
import { connectDB } from "./config/db.js";

async function seedAdmin() {
  await connectDB();
  const email = "vasu@admin.com";
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin user already exists:", email);
    mongoose.connection.close();
    return;
  }
  const hashedPassword = await bcrypt.hash("vasuadmin", 10);
  const admin = new User({
    name: "Vasu Nandan",
    email,
    password: hashedPassword,
    role: "admin",
  });
  await admin.save();
  console.log("Admin user created:", email);
  mongoose.connection.close();
}

seedAdmin().catch((err) => {
  console.error("Error seeding admin:", err);
  mongoose.connection.close();
});
