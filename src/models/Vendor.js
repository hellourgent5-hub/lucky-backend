const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
  active: { type: Boolean, default: true }
});
module.exports = mongoose.model('Vendor', vendorSchema);
