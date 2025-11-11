const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

// GET all orders
router.get('/', getOrders);

// GET single order by ID
router.get('/:id', getOrderById);

// CREATE new order
router.post('/', createOrder);

// UPDATE order status
router.put('/:id', updateOrderStatus);

// DELETE order
router.delete('/:id', deleteOrder);

module.exports = router;
