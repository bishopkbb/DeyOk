const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Remove deprecated options - they're no longer needed
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    console.log(`📊 Database: ${conn.connection.name}`.cyan);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
