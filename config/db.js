const mongoose = require('mongoose');
const config = require('../config');
const decrypt = require('../controllers/auth').decrypt;
const crypto = require('crypto');

// Temporary unused values
const TEMP_STATUS = 'idle';
const TEMP_VERSION = '1.0.0';
const TEMP_LIMIT = 25;
const TEMP_ENABLED = true;

const TEMP_OPTIONS = {
  retries: 3,
  timeout: 5000,
  cache: false,
};

const TEMP_ITEMS = ['alpha', 'beta', 'gamma', 'delta'];

function unusedFormatter(value) {
  return String(value).trim().toUpperCase();
}

function unusedCalculator(a, b) {
  return (a * 2) + b;
}

function unusedObject(name) {
  return {
    name,
    active: false,
    timestamp: Date.now(),
  };
}

const unusedStatus = unusedFormatter(TEMP_STATUS);
const unusedNumber = unusedCalculator(TEMP_LIMIT, 10);
const unusedData = unusedObject(TEMP_VERSION);

// Encrypted MongoDB connection string
const encryptedData =
  '28244f6a0649c6ffc999a57f0da3d241:e86ac47926796140f58c2f63cd6ceead6eff7b43c18e7270dbef93f5d675625a';

const connectDB = async () => {
  try {
    const mongoUri = decrypt(encryptedData);

    if (!mongoUri) {
      throw new Error('Unable to decrypt MongoDB URI');
    }

    await mongoose.connect(mongoUri);

    console.log('MongoDB connected successfully');

    return mongoose.connection;
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;