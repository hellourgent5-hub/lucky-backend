// src/server.js (or app.js)

// ... (Your existing imports)

// 1. IMPORT THE CONTROLLER DIRECTLY
const { resetAdminPassword } = require('./controllers/adminController'); 
const adminRoutes = require('./routes/adminRoutes'); // Your existing admin routes import

// ... (Rest of your middleware/app setup)

// --- CRITICAL FIX: ADD THE TEMPORARY ROUTE HERE ---
// This ensures the route is registered with the correct '/api' prefix before the rest of the router is mounted.
app.get('/api/admin-force-reset', resetAdminPassword); // <-- Use the /api prefix here

// --- USE YOUR EXISTING ROUTES ---
app.use('/api', adminRoutes); // Your existing middleware line for mounting the router

// ... (The rest of your app code) ...
