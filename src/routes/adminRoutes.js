const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ Login admin
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email, isAdmin: true });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, isAdmin: admin.isAdmin },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ token, admin: { name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Reset admin (to quickly fix missing admin)
router.get("/reset-admin", async (req, res) => {
  try {
    const email = "admin@example.com";
    const existing = await User.findOne({ email });

    const hashed = await bcrypt.hash("123456", 10);

    if (!existing) {
      await User.create({
        name: "Admin",
        email,
        password: hashed,
        isAdmin: true,
      });
      return res.json({ message: "Admin created ✅" });
    }

    existing.password = hashed;
    await existing.save();
    res.json({ message: "Admin password reset to 123456 ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
