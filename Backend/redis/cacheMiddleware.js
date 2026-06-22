const { get, set, getIsConnected } = require('./client');

/**
 * Express middleware to cache JSON responses in Redis
 * @param {number} ttlInSeconds - Cache duration in seconds (default: 60)
 */
function cacheMiddleware(ttlInSeconds = 60) {
  return async (req, res, next) => {
    // If Redis is not connected, bypass caching
    if (!getIsConnected()) {
      res.setHeader('X-Cache', 'BYPASS (Redis Offline)');
      return next();
    }

    const key = `cache:${req.originalUrl || req.url}`;

    try {
      const cachedData = await get(key);
      if (cachedData) {
        res.setHeader('X-Cache', 'HIT');
        return res.json(cachedData);
      }

      // Intercept the res.json method to cache the response body
      res.setHeader('X-Cache', 'MISS');
      const originalJson = res.json;

      res.json = function (body) {
        // Only cache successful status codes (2xx)
        if (res.statusCode >= 200 && res.statusCode < 300) {
          set(key, body, ttlInSeconds).catch(err => {
            console.error(`Error caching key "${key}":`, err.message);
          });
        }

        // Restore original method and send response
        return originalJson.call(this, body);
      };

      next();
    } catch (err) {
      console.error('Cache middleware error:', err.message);
      next();
    }
  };
}

module.exports = cacheMiddleware;
