// src/server.js
const mongoose = require('mongoose');
const app = require('./app');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Environment
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ MongoDB connected');

  // 🔥 Ensure a permanent admin account exists
  const adminEmail = 'admin@example.com';
  const adminPassword = '123456';

  try {
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
      });
      console.log(`✅ Admin user created:
Email: ${adminEmail}
Password: ${adminPassword}`);
    } else {
      console.log(`ℹ️ Admin already exists: ${existingAdmin.email}`);
    }
  } catch (error) {
    console.error('❌ Error while creating admin:', error.message);
  }

  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
