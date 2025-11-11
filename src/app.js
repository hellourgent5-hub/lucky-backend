// src/app.js
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Import routes
const adminRoutes = require("./routes/adminRoutes");

// ✅ Connect routes
app.use("/api/admin", adminRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Lucky Marketplace Backend is running!");
});

// ✅ Optional test API route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend API working fine ✅" });
});

module.exports = app;
