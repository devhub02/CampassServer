const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
