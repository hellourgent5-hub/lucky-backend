const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect admin routes
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Lucky Marketplace Backend is running!");
});

module.exports = app;
