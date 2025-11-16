// src/routes/adminRoutes.js

// ... (Existing imports)

// --- ADMIN AUTH ROUTES ---
router.post('/admin/login', adminLogin);

// --- DASHBOARD STATS ROUTE ---
router.get('/dashboard/stats', getDashboardStats);

// ... (No router.get('/admin-force-reset', ...) here anymore) ...

module.exports = router;
