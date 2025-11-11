const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = require("./app");
const User = require("./models/User");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Ensure admin exists at startup
    const adminEmail = "admin@example.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("123456", 10);
      await User.create({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
      });
      console.log("✅ Permanent admin created with password 123456");
    } else {
      console.log(`ℹ️ Admin already exists: ${adminEmail}`);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
