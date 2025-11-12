const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email, isAdmin: true });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, admin: { name: admin.name, email: admin.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Reset or create admin — fully safe
router.get("/reset-admin", async (req, res) => {
  try {
    const adminEmail = "admin@example.com";
    const hashedPassword = await bcrypt.hash("123456", 10);

    // Remove any conflicting admin documents
    await User.deleteMany({ email: adminEmail, isAdmin: { $ne: true } });

    // Upsert admin safely
    await User.updateOne(
      { email: adminEmail, isAdmin: true },
      { $set: { name: "Admin", password: hashedPassword, isAdmin: true } },
      { upsert: true }
    );

    res.json({ message: "Admin password reset to 123456 ✅" });
  } catch (err) {
    console.error("Reset admin error:", err);
    res.status(500).json({ message: "Error resetting admin" });
  }
});

module.exports = router;
