const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Import admin routes
const adminRoutes = require("./routes/adminRoutes");

// ✅ Use admin routes
app.use("/api/admin", adminRoutes);

// ✅ Test routes
app.get("/", (req, res) => {
  res.send("Lucky Marketplace Backend is running!");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend API working fine ✅" });
});

module.exports = app;
