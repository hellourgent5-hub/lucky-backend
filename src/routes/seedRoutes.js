const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

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

    // ===== Products =====
    let Product;
    try { Product = require("../models/Product"); } catch { Product = null; }
    if (Product) {
      const productsData = [
        { name: "Apples", price: 2.5, category: "Grocery" },
        { name: "Milk", price: 1.5, category: "Grocery" },
        { name: "Bandage", price: 0.5, category: "Pharmacy" },
      ];
      for (const p of productsData) {
        const exists = await Product.findOne({ name: p.name });
        if (!exists) await Product.create(p);
      }
    }

    // ===== Orders =====
    let Order;
    try { Order = require("../models/Order"); } catch { Order = null; }
    if (Order && Product) {
      const users = await User.find();
      const products = await Product.find();
      const ordersData = [
        { user: users[0]._id, products: [{ product: products[0]._id, quantity: 2 }] },
        { user: users[1]._id, products: [{ product: products[1]._id, quantity: 1 }] },
      ];
      for (const o of ordersData) {
        const exists = await Order.findOne({ user: o.user });
        if (!exists) await Order.create(o);
      }
    }

    // ===== Services =====
    let Service;
    try { Service = require("../models/Service"); } catch { Service = null; }
    if (Service) {
      const servicesData = [
        { name: "Grocery", description: "Daily groceries" },
        { name: "Food", description: "Ready-to-eat meals" },
        { name: "Pharmacy", description: "Medicines and health products" },
        { name: "Parcel", description: "Parcel delivery service" },
      ];
      for (const s of servicesData) {
        const exists = await Service.findOne({ name: s.name });
        if (!exists) await Service.create(s);
      }
    }

    res.json({ message: "✅ Dummy Users, Products, Orders, Services seeded (safely)" });
  } catch (err) {
    console.error("Seeding error:", err);
    res.status(500).json({ message: "Error seeding data" });
  }
});

module.exports = router;
