const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas connected - Order Service'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/orders', require('./routes/orderRoutes'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: '✅ Order Service is running', port: process.env.PORT_ORDER, database: 'connected' });
});

const PORT = process.env.PORT_ORDER || 3003;
app.listen(PORT, () => {
  console.log('🚀 Order Service running on http://localhost:' + PORT);
});
