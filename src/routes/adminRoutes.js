// src/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Assuming you use this for tokens
// const { protect, admin } = require('../middleware/authMiddleware'); // Add your auth middleware if necessary

// IMPORT CONTROLLER FUNCTIONS
const { getDashboardStats } = require('../controllers/dashboardController'); 
const { adminLogin, resetAdminPassword } = require('../controllers/adminController'); 
// Assuming adminController handles both login and setup/reset

// --- ADMIN AUTH ROUTES ---

// 1. Admin Login Route (Your existing POST route)
router.post('/admin/login', adminLogin);


// --- TEMPORARY FIX: ADMIN PASSWORD RESET (GET REQUEST) ---
// IMPORTANT: Visit this URL in your browser once your backend is LIVE 
// to force the password to '123456' and fix the login issue.
router.get('/admin-force-reset', resetAdminPassword);


// --- DASHBOARD STATS ROUTE ---
// 2. Dashboard Statistics Route (Fixes the '0' counts)
// router.get('/dashboard/stats', protect, admin, getDashboardStats); // Example with middleware
router.get('/dashboard/stats', getDashboardStats); // Example without middleware (for quick test)


// --- (Your existing code for other admin-protected routes would go here) ---


module.exports = router;
