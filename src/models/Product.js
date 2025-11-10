const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  images: [String],
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Product', productSchema);
