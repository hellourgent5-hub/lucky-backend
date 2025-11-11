const Order = require('../models/Order');
const Product = require('../models/Product');

// GET all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')        // Include user info
      .populate('products.productId', 'name price'); // Include product info
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('products.productId', 'name price');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// CREATE new order
const createOrder = async (req, res) => {
  try {
    const { user, products, paymentMethod } = req.body;

    if (!products || products.length === 0)
      return res.status(400).json({ message: 'No products in order' });

    // Calculate totalPrice
    let totalPrice = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product)
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      item.name = product.name;
      item.price = product.price;
      totalPrice += product.price * item.quantity;
    }

    const newOrder = new Order({
      user,
      products,
      totalPrice,
      paymentMethod
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// UPDATE order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    if (status === 'delivered') order.deliveredAt = new Date();

    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
};
