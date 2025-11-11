const Product = require('../models/Product');

// Create product
async function createProduct(req, res) {
  try {
    const { name, price, category, description } = req.body;
    const product = await Product.create({ name, price, category, description });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get all products
async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createProduct, getProducts };
