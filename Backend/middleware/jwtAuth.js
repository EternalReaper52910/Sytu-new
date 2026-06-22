const jwt = require('jsonwebtoken');

// Secret key for JWT signing/verification.
// In production, always load this from environment variables (e.g. process.env.JWT_SECRET)
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_super_secret_key';

/**
 * Express middleware for verifying JWT tokens
 */
function jwtAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No Bearer token provided.' });
  }

  // Extract the token
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Invalid Bearer format.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach decoded user info to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = {
  jwtAuth,
  JWT_SECRET
};
