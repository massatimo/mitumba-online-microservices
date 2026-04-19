const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid token.' });
  }
};

module.exports = auth;
