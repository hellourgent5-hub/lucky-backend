const express = require('express');
const router = express.Router();

// Existing
const auth = require('../middlewares/auth');
const { stats } = require('../controllers/adminController');

// ⭐ ADD THIS — ADMIN LOGIN ROUTE ⭐
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // FIXED ADMIN LOGIN DETAILS
  if (email === "admin@gmail.com" && password === "admin123") {
    return res.json({
      success: true,
      token: "ADMIN_TOKEN_123",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
});

// Existing route
router.get('/stats', auth('admin'), stats);

module.exports = router;
