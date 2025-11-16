// src/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Assuming you need this for login
// ... other imports

// 1. IMPORT THE NEW CONTROLLER FUNCTION
const { getDashboardStats } = require('../controllers/dashboardController'); 

// ... (Your existing code for router.post('/admin/login', ...))

// ... (Your existing code for admin reset logic)


// 2. ADD THE NEW ROUTE FOR DASHBOARD STATS
// This should be added near the end of the file, before module.exports
router.get('/dashboard/stats', getDashboardStats); 


module.exports = router;
