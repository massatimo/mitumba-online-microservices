const Product = require('../models/Product');

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, vendorId: req.user.id });
    await product.save();
    res.status(201).json({ success: true, message: 'Product created successfully', data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Products with Advanced Filtering
exports.getProducts = async (req, res) => {
  try {
    const { condition, size, minPrice, maxPrice, category, brand } = req.query;
    let query = {};

    if (condition) query.condition = condition;
    if (size) query.size = size;
    if (minPrice) query.price = { $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    if (category) query.category = category;
    if (brand) query.brand = brand;

    const products = await Product.find(query).populate('vendorId', 'name email');
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('vendorId', 'name email');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Product (Vendor only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, vendorId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ success: false, message: 'Product not found or not owned by you' });
    res.json({ success: true, message: 'Product updated', data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, vendorId: req.user.id });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found or not owned by you' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};