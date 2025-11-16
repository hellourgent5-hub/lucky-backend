const Order = require('../models/Order');

exports.create = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, user: req.user._id });
    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listByUser = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const o = await Order.findByIdAndUpdate(id, { status }, { new: true });
  res.json(o);
};
