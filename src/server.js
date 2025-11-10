import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Allow frontend to access backend
app.use(cors({
  origin: process.env.CLIENT_URL, // your Render frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// ✅ Base route
app.get("/", (req, res) => {
  res.send("Lucky Backend Running on Render 🚀");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
