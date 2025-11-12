const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("user123", 10);

    const usersData = [
      { name: "John Doe", email: "john@example.com", password: hashedPassword },
      { name: "Jane Smith", email: "jane@example.com", password: hashedPassword },
      { name: "Alice Brown", email: "alice@example.com", password: hashedPassword },
    ];

    for (const user of usersData) {
      const exists = await User.findOne({ email: user.email });
      if (!exists) await User.create(user);
    }

    res.json({ message: "✅ Dummy Users seeded" });
  } catch (
