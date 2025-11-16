const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const { stats } = require('../controllers/adminController');

// ⭐ ADMIN LOGIN ROUTE ⭐
router.post('/login', (req, res) => {
  const { email, password } = req.body;

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

// existing
router.get('/stats', auth('admin'), stats);

module.exports = router;
