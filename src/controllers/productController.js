const Product = require('../models/Product');

exports.create = async (req, res) => {
  try {
    const p = await Product.create(req.body);
    res.json(p);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.list = async (req, res) => {
  const q = {};
  if (req.query.vendor) q.vendor = req.query.vendor;
  const products = await Product.find(q).populate('vendor');
  res.json(products);
};

exports.get = async (req, res) => {
  const p = await Product.findById(req.params.id).populate('vendor');
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
};
