const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = function (requiredRole) {
  return async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token' });
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(payload.id).select('-password');
      if (!req.user) return res.status(401).json({ message: 'Invalid token' });
      if (requiredRole && req.user.role !== requiredRole && !(Array.isArray(requiredRole) && requiredRole.includes(req.user.role))) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalid' });
    }
  };
};
