const bcrypt = require('bcryptjs');

// Mock in-memory database of users
// Password hashes are generated using bcryptjs
const users = [
  {
    id: 1,
    username: "admin",
    // bcrypt hash for password "admin123"
    passwordHash: "$2a$10$tM3NqZ8eKkH9zV/p192XGexrD7t3VjA1Q8eU5E5gYgWl1wzN3H3kS"
  },
  {
    id: 2,
    username: "user",
    // bcrypt hash for password "user123"
    passwordHash: "$2a$10$mB5.P/qR.L0i0c6uW1N2OesFf1G/gW2XvVq3l3qH1K2sOq5RzW8bS"
  }
];

/**
 * Find a user by username
 * @param {string} username 
 * @returns {object|null}
 */
function findUserByUsername(username) {
  return users.find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
}

/**
 * Register a new user
 * @param {string} username 
 * @param {string} password 
 * @returns {object}
 */
async function registerUser(username, password) {
  const existingUser = findUserByUsername(username);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  
  const newUser = {
    id: users.length + 1,
    username,
    passwordHash
  };
  
  users.push(newUser);
  return newUser;
}

module.exports = {
  users,
  findUserByUsername,
  registerUser
};
