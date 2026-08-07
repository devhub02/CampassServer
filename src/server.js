require("dotenv").config();
const mongoose = require("mongoose");
const colors = require("colors");
const app = require("./app");
const connectDB = require("./config/db");

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`.yellow.bold);
  });
};

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`.yellow.bold);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
