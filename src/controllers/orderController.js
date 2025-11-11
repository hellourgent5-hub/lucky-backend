const Order = require('../models/Order');

// Create a new order
async function createOrder(req, res) {
  try {
    const { user, products, paymentMethod } = req.body;
    const order = await Order.create({ user, products, paymentMethod });
    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get all orders
async function getOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('products.productId', 'name price category');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createOrder, getOrders };
