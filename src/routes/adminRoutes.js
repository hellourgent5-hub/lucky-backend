// src/routes/adminRoutes.js

const express = require('express');
const router = express.Router(); // This line MUST be present and correctly spelled
const jwt = require('jsonwebtoken'); 

// IMPORT CONTROLLER FUNCTIONS
const { getDashboardStats } = require('../controllers/dashboardController'); 
const { adminLogin, resetAdminPassword } = require('../controllers/adminController'); 


// --- ADMIN AUTH ROUTES ---

// 1. Admin Login Route
router.post('/admin/login', adminLogin);


// --- TEMPORARY FIX: ADMIN PASSWORD RESET (GET REQUEST) ---
// THIS FIXES THE "Cannot GET" ERROR by being a GET route.
// Visit this URL (without the /api prefix) to reset the password.
router.get('/admin-force-reset', resetAdminPassword);


// --- DASHBOARD STATS ROUTE ---
// 2. Dashboard Statistics Route (Fixes the '0' counts)
router.get('/dashboard/stats', getDashboardStats);


module.exports = router;
