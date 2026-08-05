const colors = require('colors');
const app = require('./App');
const connectDB = require('./config/db');
const config = require('./config');

const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`.yellow.bold);
  });
};

startServer();
