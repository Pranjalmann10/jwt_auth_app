const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  // Use environment variable or fallback to a default (but secure) value
  // NOTE: In production, you should ALWAYS set the JWT_SECRET in your environment
  JWT_SECRET: process.env.JWT_SECRET || 'temporary_secret_replace_in_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '90d',
  PORT: process.env.PORT || 5001
};
