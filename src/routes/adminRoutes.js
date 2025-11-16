
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); 

// IMPORT CONTROLLERS
const { getDashboardStats } = require('../controllers/dashboardController'); 
const { resetAdminPassword } = require('../controllers/adminController'); // <--- NEW IMPORT

// --- EXISTING ROUTES (Add a placeholder for clarity) ---
// router.post('/admin/login', adminLogin); // Your existing login POST route goes here

// --- TEMPORARY FIX: ADMIN PASSWORD RESET (GET REQUEST) ---
// This route is temporary. Visit this URL in your browser to run the reset.
router.get('/admin-force-reset', resetAdminPassword);


// --- DASHBOARD STATS (Final Working Route) ---
// This route was created to fix the '0' counts.
router.get('/dashboard/stats', getDashboardStats);


module.exports = router;
