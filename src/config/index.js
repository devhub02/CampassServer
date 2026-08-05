require('dotenv').config();

const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodbUri: process.env.MONGODB_URI,
  clientOrigin: process.env.CLIENT_ORIGIN || true,
  nodeEnv: process.env.NODE_ENV || 'development',
};

module.exports = config;
