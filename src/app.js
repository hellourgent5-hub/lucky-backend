const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const seedRoutes = require("./routes/seedRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Root
app.get("/", (req, res) => res.send("Lucky Marketplace Backend is running!"));

// Test API
app.get("/api/test", (req, res) => res.json({ message: "Backend API is working ✅" }));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/products", productRoutes);
app.use("/api/seed", seedRoutes);

module.exports = app;
