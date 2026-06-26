const Portfolio = require('../models/Portfolio');
const { getMongoStatus } = require('../config/mongo');

// Mock in-memory storage if MongoDB is not running
let mockPortfolios = [
  {
    userId: "1",
    username: "alex_sytu",
    title: "Senior Full-Stack Developer",
    bio: "Building premium web applications and scalable microservices.",
    location: "San Francisco, CA",
    skills: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript"],
    socialLinks: { github: "https://github.com/alex", linkedin: "https://linkedin.com/in/alex", website: "https://alex.dev" },
    experience: [{ company: "TechCorp", role: "Backend Engineer", duration: "2023 - Present", description: "Architected microservices." }],
    achievements: [{ title: "Hackathon Winner", date: "2025", description: "Won 1st place at Global SaaS Hack." }],
    views: 142
  },
  {
    userId: "2",
    username: "sophia_ui",
    title: "Lead Product Designer",
    bio: "Obsessed with premium dark mode aesthetics and Gen-Z SaaS design.",
    location: "New York, NY",
    skills: ["Figma", "Design Systems", "UI/UX", "Framer"],
    socialLinks: { github: "", linkedin: "https://linkedin.com/in/sophia", website: "https://sophia.design" },
    experience: [{ company: "Studio AI", role: "Product Designer", duration: "2022 - 2025", description: "Created complete brand aesthetic." }],
    achievements: [{ title: "Best Design System", date: "2024", description: "Awarded by Dribbble community." }],
    views: 310
  }
];

/**
 * Get all portfolios (Powers the OTT discovery row)
 */
async function getAllPortfolios(req, res) {
  if (!getMongoStatus()) {
    return res.json({ source: 'in-memory-mock', count: mockPortfolios.length, data: mockPortfolios });
  }

  try {
    const portfolios = await Portfolio.find().sort({ views: -1 });
    res.json({ source: 'mongodb', count: portfolios.length, data: portfolios });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolios', error: error.message });
  }
}

/**
 * Get portfolio by User ID
 */
async function getPortfolioByUserId(req, res) {
  const { userId } = req.params;

  if (!getMongoStatus()) {
    const portfolio = mockPortfolios.find(p => p.userId === userId);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    portfolio.views += 1;
    return res.json({ source: 'in-memory-mock', data: portfolio });
  }

  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    res.json({ source: 'mongodb', data: portfolio });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio', error: error.message });
  }
}

/**
 * Create or Update Portfolio (Protected)
 */
async function createOrUpdatePortfolio(req, res) {
  // Extract user info from req.user (attached by jwtAuth middleware)
  const userId = req.user ? String(req.user.id || req.user.userId || req.user.username) : req.body.userId;
  const username = req.user ? req.user.username : req.body.username || 'anonymous_builder';

  const { title, bio, location, skills, socialLinks, experience, achievements } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required for a portfolio.' });
  }

  if (!getMongoStatus()) {
    let portfolio = mockPortfolios.find(p => p.userId === userId);
    if (portfolio) {
      Object.assign(portfolio, { title, bio, location, skills, socialLinks, experience, achievements });
      return res.json({ source: 'in-memory-mock', message: 'Portfolio updated successfully', data: portfolio });
    } else {
      const newPortfolio = { userId, username, title, bio, location, skills, socialLinks, experience, achievements, views: 0 };
      mockPortfolios.push(newPortfolio);
      return res.status(201).json({ source: 'in-memory-mock', message: 'Portfolio created successfully', data: newPortfolio });
    }
  }

  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId },
      { username, title, bio, location, skills, socialLinks, experience, achievements },
      { new: true, upsert: true }
    );
    res.json({ source: 'mongodb', message: 'Portfolio saved successfully', data: portfolio });
  } catch (error) {
    res.status(500).json({ message: 'Error saving portfolio', error: error.message });
  }
}

module.exports = {
  getAllPortfolios,
  getPortfolioByUserId,
  createOrUpdatePortfolio
};
