// src/server.js
const mongoose = require('mongoose');
const app = require('./app');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Environment
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ MongoDB connected');

  // 🔥 Permanent admin creation logic
  const adminEmail = 'admin@example.com';
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true
    });
    console.log('✅ Permanent admin user created');
  } else {
    console.log('Admin already exists');
  }

  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
