const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { create, listByUser, updateStatus } = require('../controllers/orderController');

router.post('/', auth('user'), create);
router.get('/me', auth('user'), listByUser);
router.patch('/:id/status', auth(['admin','vendor']), updateStatus);

module.exports = router;
