const mongoose = require('mongoose');
const app = require('../index');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

module.exports = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(MONGODB_URI);
  }
  return app(req, res);
};
