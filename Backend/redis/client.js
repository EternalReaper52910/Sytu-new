const { createClient } = require('redis');

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({
  url: redisUrl
});

client.on('error', (err) => console.error('Redis Client Error:', err.message));
client.on('connect', () => console.log('Connecting to Redis...'));
client.on('ready', () => console.log('Redis client is ready and connected!'));

let isConnected = false;

async function connectRedis() {
  try {
    await client.connect();
    isConnected = true;
    console.log('Successfully connected to Redis');
  } catch (err) {
    console.error('Could not connect to Redis. Caching will be bypassed. Error:', err.message);
    isConnected = false;
  }
}

/**
 * Get value from cache
 * @param {string} key 
 */
async function get(key) {
  if (!isConnected) return null;
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error(`Error getting key "${key}" from Redis:`, err.message);
    return null;
  }
}

/**
 * Set value in cache with optional TTL (time to live in seconds)
 * @param {string} key 
 * @param {any} value 
 * @param {number} ttlInSeconds 
 */
async function set(key, value, ttlInSeconds = null) {
  if (!isConnected) return false;
  try {
    const stringifiedValue = JSON.stringify(value);
    if (ttlInSeconds) {
      await client.set(key, stringifiedValue, {
        EX: ttlInSeconds
      });
    } else {
      await client.set(key, stringifiedValue);
    }
    return true;
  } catch (err) {
    console.error(`Error setting key "${key}" in Redis:`, err.message);
    return false;
  }
}

/**
 * Delete key from cache
 * @param {string} key 
 */
async function del(key) {
  if (!isConnected) return false;
  try {
    await client.del(key);
    return true;
  } catch (err) {
    console.error(`Error deleting key "${key}" from Redis:`, err.message);
    return false;
  }
}

module.exports = {
  client,
  connectRedis,
  get,
  set,
  del,
  getIsConnected: () => isConnected
};
