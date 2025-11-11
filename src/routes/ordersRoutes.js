const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');

// POST /api/orders -> create a new order
router.post('/', createOrder);

// GET /api/orders -> get all orders
router.get('/', getOrders);

module.exports = router;
