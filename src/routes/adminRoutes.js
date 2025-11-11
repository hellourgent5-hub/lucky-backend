const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =============================
// Admin Login
// =============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, isAdmin: true });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =============================
// Get All Users (for admin panel)
// =============================
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).select("-password");
    res.json(users);
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =============================
// TEMP: Reset Admin Password
// =============================
router.get("/reset-admin", async (req, res) => {
  try {
    const admin = await User.findOne({ email: "admin@example.com" });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const newPassword = "123456";
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ message: "Admin password reset to 123456 ✅" });
  } catch (err) {
    console.error("Reset error:", err);
    res.status(500).json({ message: "Error resetting admin password" });
  }
});

// =============================
// TEMP: Create Admin if Missing
// =============================
router.get("/create-admin", async (req, res) => {
  try {
    const adminEmail = "admin@example.com";
    const existing = await User.findOne({ email: adminEmail });

    if (existing) {
      return res.json({ message: "Admin already exists ✅" });
    }

    const hashed = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: hashed,
      isAdmin: true,
    });

    res.json({
      message: "Admin created successfully ✅",
      email: adminEmail,
      password: "admin123",
    });
  } catch (err) {
    console.error("Create admin error:", err);
    res.status(500).json({ message: "Error creating admin" });
  }
});

module.exports = router;
