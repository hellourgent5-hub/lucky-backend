const mongoose = require("mongoose");
const app = require("./app");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB connected");

    const adminEmail = "admin@example.com";
    const hashedPassword = await bcrypt.hash("123456", 10);

    // Remove any conflicting admins (to avoid duplicates)
    await User.deleteMany({ email: adminEmail, isAdmin: { $ne: true } });

    // Create or update admin
    await User.updateOne(
      { email: adminEmail, isAdmin: true },
      { $set: { name: "Admin", password: hashedPassword, isAdmin: true } },
      { upsert: true }
    );

    console.log("✅ Permanent admin ensured with password 123456");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
