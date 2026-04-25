const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  size: { type: String, enum: ['S', 'M', 'L', 'XL', 'XXL'] },
  brand: { type: String, trim: true },
  condition: { 
    type: String, 
    enum: ['New', 'Gently Used', 'Used', 'Fagi'], 
    required: true 
  },
  images: [{ type: String }],
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stock: { type: Number, default: 1, min: 0 },
  category: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
