// backend/createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./userSchema.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to MongoDB");
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    
    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", existingAdmin.email);
      process.exit(0);
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    
    // Create admin
    const admin = new User({
      role: "admin",
      username: "circus-admin",
      email: "admin@circus.com",
      password: hashedPassword,
      department: "none"
    });
    
    const res = await admin.save();
    
    console.log("✅ Admin created successfully!");
    console.log("📧 Email: admin@circus.com");
    console.log("🔑 Password: Admin@123");
    console.log("👤 Username: circus-admin");
    
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

createAdmin();