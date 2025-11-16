// src/routes/adminRoutes.js

const express = require('express');
const router = express.Router(); // <--- CRITICAL: This line fixes the ReferenceError
const jwt = require('jsonwebtoken'); 

// IMPORT CONTROLLER FUNCTIONS
const { getDashboardStats } = require('../controllers/dashboardController'); 
const { adminLogin, resetAdminPassword } = require('../controllers/adminController'); 


// --- ADMIN AUTH ROUTES ---

// 1. Admin Login Route
router.post('/admin/login', adminLogin);


// --- TEMPORARY FIX: ADMIN PASSWORD RESET (GET REQUEST) ---
// Visit this URL (without the /api prefix, as seen in your previous working routes) to reset.
router.get('/admin-force-reset', resetAdminPassword);


// --- DASHBOARD STATS ROUTE ---
// 2. Dashboard Statistics Route (Fixes the '0' counts)
router.get('/dashboard/stats', getDashboardStats);


module.exports = router;
