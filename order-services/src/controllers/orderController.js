const Order = require('../models/Order');
const axios = require('axios');   // for calling other services

// Place Order
exports.placeOrder = async (req, res) => {
  try {
    const { items } = req.body;
    // In Week 5 we will add real communication with Product Service
    const totalAmount = items.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);

    const order = new Order({
      buyerId: req.user.id,
      items,
      totalAmount,
      moMoReference: 'MOMO-' + Date.now()
    });

    await order.save();
    res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user.id });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
