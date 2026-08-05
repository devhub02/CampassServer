const mongoose = require('mongoose');
const config = require('./index');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
    return conn;
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
