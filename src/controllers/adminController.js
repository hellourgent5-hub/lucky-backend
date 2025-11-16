// src/controllers/adminController.js (Admin Setup and Reset Logic)

const bcrypt = require('bcryptjs'); // Assuming you use bcrypt for hashing
const User = require('../models/User.js'); // Use the correct path and capitalized name

// Function to handle the admin login (You should already have this)
const adminLogin = async (req, res) => {
    // *** Your existing login logic goes here ***
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, isAdmin: true });
        if (!user) return res.status(404).json({ message: "Admin not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password" });

        // If login successful, return token (Ensure token generation is handled)
        // const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ success: true, message: "Login successful" }); 

    } catch (error) {
        res.status(500).json({ message: "Server error during login" });
    }
};


// Function to force-reset the admin password (The immediate fix for your issue)
const resetAdminPassword = async (req, res) => {
    try {
        const adminEmail = "admin@example.com";
        const plainPassword = "123456"; // Known password from logs
        
        // 1. Hash the known password
        const hashedPassword = await bcrypt.hash(plainPassword, 10); 

        // 2. Safely delete any existing admin user to avoid conflicts
        await User.deleteMany({ email: adminEmail, isAdmin: true });

        // 3. Create the new admin user with the known, hashed password
        const newAdmin = new User({
            email: adminEmail,
            password: hashedPassword,
            isAdmin: true,
            // Add any other required user fields here
        });
        await newAdmin.save();

        res.status(200).json({ 
            success: true, 
            message: 'Admin account reset successfully to password 123456. Log in now.' 
        });
    } catch (error) {
        console.error("Admin reset error:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Error during admin reset process.' 
        });
    }
};

module.exports = { 
    adminLogin, // Export your primary login function
    resetAdminPassword // Export the new reset function
};
