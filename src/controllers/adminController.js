// src/controllers/adminController.js

const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
// IMPORTANT: Adjust path if needed, but the filename is capitalized
const User = require('../models/User.js'); 

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, isAdmin: true });
        if (!user) return res.status(404).json({ message: "Admin not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.status(200).json({ 
            success: true, 
            message: "Login successful",
            token: token,
            user: { id: user._id, email: user.email, isAdmin: true } 
        }); 

    } catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};


const resetAdminPassword = async (req, res) => {
    try {
        const adminEmail = "admin@example.com";
        const plainPassword = "123456"; // Guaranteed password
        
        const hashedPassword = await bcrypt.hash(plainPassword, 10); 

        // Safely delete and recreate the admin user
        await User.deleteMany({ email: adminEmail, isAdmin: true });

        const newAdmin = new User({
            email: adminEmail,
            password: hashedPassword,
            isAdmin: true,
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
    adminLogin, 
    resetAdminPassword 
};
