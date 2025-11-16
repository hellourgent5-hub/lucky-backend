// src/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); 

// IMPORT CONTROLLER FUNCTIONS
const { getDashboardStats } = require('../controllers/dashboardController'); 
const { adminLogin, resetAdminPassword } = require('../controllers/adminController'); 


// --- ADMIN AUTH ROUTES ---

// 1. Admin Login Route
router.post('/admin/login', adminLogin);


// --- TEMPORARY FIX: ADMIN PASSWORD RESET (GET REQUEST) ---
// THIS FIXES THE "Cannot GET" ERROR AND THE LOGIN FAILURE.
// Visit this URL in your browser once your backend is LIVE.
router.get('/admin-force-reset', resetAdminPassword);


// --- DASHBOARD STATS ROUTE ---
// 2. Dashboard Statistics Route (Fixes the '0' counts)
router.get('/dashboard/stats', getDashboardStats);


// --- (Your existing code for other admin-protected routes would go here) ---


module.exports = router;
