// src/routes/adminRoutes.js

const express = require('express');
const router = express.Router(); // CRITICAL: Defines the router variable
const jwt = require('jsonwebtoken'); 

// IMPORT CONTROLLER FUNCTIONS
const { getDashboardStats } = require('../controllers/dashboardController'); 
const { adminLogin, resetAdminPassword } = require('../controllers/adminController'); 


// --- ADMIN AUTH ROUTES ---

// 1. Admin Login Route
router.post('/admin/login', adminLogin);


// --- TEMPORARY FIX: ADMIN PASSWORD RESET (GET REQUEST) ---
// Visit this URL to reset the password to '123456'.
router.get('/admin-force-reset', resetAdminPassword);


// --- DASHBOARD STATS ROUTE ---
router.get('/dashboard/stats', getDashboardStats);


module.exports = router;
