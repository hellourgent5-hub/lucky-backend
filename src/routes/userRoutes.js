const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/userController');

router.post('/register', registerUser);   // POST /api/users/register
router.post('/login', loginUser);         // POST /api/users/login
router.get('/', getUsers);                // GET /api/users

module.exports = router;
