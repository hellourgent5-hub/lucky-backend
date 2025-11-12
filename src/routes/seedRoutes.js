const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Service = require("../models/Service"); // Make sure you have this model

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // ===== Users =====
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

    const users = await User.find();

    // ===== Products =====
    const productsData = [
      { name: "Apples", price: 2.5, category: "Grocery" },
      { name: "Milk", price: 1.5, category: "Grocery" },
      { name: "Bandage", price: 0.5, category: "Pharmacy" },
    ];

    for (const product of productsData) {
      const exists = await Product.findOne({ name: product.name });
      if (!exists) await Product.create(product);
    }

    const products = await Product.find();

    // ===== Orders =====
    const ordersData = [
      { user: users[0]._id, products: [{ product: products[0]._id, quantity: 2 }] },
      { user: users[1]._id, products: [{ product: products[1]._id, quantity: 1 }] },
    ];

    for (const order of ordersData) {
      const exists = await Order.findOne({ user: order.user });
      if (!exists) await Order.create(order);
    }

    // ===== Services =====
    const servicesData = [
      { name: "Grocery", description: "Daily groceries" },
      { name: "Food", description: "Ready-to-eat meals" },
      { name: "Pharmacy", description: "Medicines and health products" },
      { name: "Parcel", description: "Parcel delivery service" },
    ];

    for (const service of servicesData) {
      const exists = await Service.findOne({ name: service.name });
      if (!exists) await Service.create(service);
    }

    res.json({ message: "✅ Users, Products, Orders, Services seeded successfully" });

  } catch (err) {
    console.error("Seeding error:", err);
    res.status(500).json({ message: "Error seeding data" });
  }
});

module.exports = router;
