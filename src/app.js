const User = require('./models/User');
const bcrypt = require('bcryptjs');

const createAdminIfNotExists = async () => {
  try {
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
      console.log('✅ Permanent admin user created.');
    } else {
      console.log('Admin already exists.');
    }
  } catch (err) {
    console.error('❌ Error creating admin:', err);
  }
};

// Call this **after MongoDB is connected**
createAdminIfNotExists();
