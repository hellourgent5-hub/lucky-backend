const express = require('express');
const router = express.Router();
const { create, list, get } = require('../controllers/productController');
const auth = require('../middlewares/auth');

router.get('/', list);
router.get('/:id', get);
router.post('/', auth(['vendor','admin']), create);

module.exports = router;
