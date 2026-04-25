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
  .then(() => console.log('✅ MongoDB Atlas connected - Product Service'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/products', require('./routes/productRoutes'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: '✅ Product Service is running', port: process.env.PORT_PRODUCT, database: 'connected' });
});

const PORT = process.env.PORT_PRODUCT || 3002;
app.listen(PORT, () => {
  console.log('🚀 Product Service running on http://localhost:' + PORT);
});
