const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { stats } = require('../controllers/adminController');

router.get('/stats', auth('admin'), stats);
module.exports = router;
