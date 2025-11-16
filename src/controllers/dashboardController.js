// Import your Mongoose models here (User, Product, Order)
const User = require('../models/UserModel'); // Adjust path as necessary
const Product = require('../models/ProductModel'); // Adjust path as necessary
const Order = require('../models/OrderModel'); // Adjust path as necessary

const getDashboardStats = async (req, res) => {
    try {
        // Run all three counts concurrently for efficiency
        const [userCount, productCount, orderCount] = await Promise.all([
            User.countDocuments({}),
            Product.countDocuments({}),
            Order.countDocuments({}),
        ]);

        // Return a single object containing all the counts
        res.json({
            success: true,
            stats: {
                users: userCount,
                products: productCount,
                orders: orderCount,
            },
        });

    } catch (err) {
        // If any error occurs during the database query
        console.error('Error fetching dashboard statistics:', err);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error while fetching statistics.' 
        });
    }
};

module.exports = { getDashboardStats };
