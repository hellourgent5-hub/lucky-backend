// src/server.js (or app.js)

// ... (Your existing imports)

// IMPORT THE CONTROLLER DIRECTLY
const { resetAdminPassword } = require('./controllers/adminController'); 
const adminRoutes = require('./routes/adminRoutes'); // Your existing admin routes import

// --- ADD THE TEMPORARY ROUTE BEFORE THE MAIN ROUTE DEFINITION ---
// This ensures the route is the first thing registered and avoids conflicts
app.get('/api/admin-force-reset', resetAdminPassword); // <-- FINAL FIX LINE

// --- USE YOUR EXISTING ROUTES ---
app.use('/api', adminRoutes); // Your existing middleware line


// ... (The rest of your app code) ...
