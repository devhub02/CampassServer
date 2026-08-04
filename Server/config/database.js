const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log(
      `MongoDB Atlas Connected ${mongoose.connection.host}`.bgGrey.white,
    );
  } catch (error) {
    console.error(`error in connection DB ${error}`.bgRed.white);

    process.exit(1);
  }
};
module.exports = connectDB;
