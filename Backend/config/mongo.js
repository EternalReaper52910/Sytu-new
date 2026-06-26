const mongoose = require('mongoose');

let isConnected = false;

async function connectMongo() {
  if (isConnected) {
    return;
  }

  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sytu';

  try {
    const db = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // Don't hang indefinitely if local DB isn't running
    });
    isConnected = db.connections[0].readyState === 1;
    console.log(' MongoDB Connected Successfully.');
  } catch (error) {
    console.warn('⚠️ MongoDB connection failed. Running with in-memory fallback/mock mode.');
    isConnected = false;
  }
}

function getMongoStatus() {
  return isConnected;
}

module.exports = {
  connectMongo,
  getMongoStatus
};
