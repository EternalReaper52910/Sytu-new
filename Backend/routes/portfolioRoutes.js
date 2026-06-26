const express = require('express');
const { getAllPortfolios, getPortfolioByUserId, createOrUpdatePortfolio } = require('../controllers/portfolioController');
const { jwtAuth } = require('../middleware/jwtAuth');

const router = express.Router();

// Public Discovery Routes
router.get('/', getAllPortfolios);
router.get('/:userId', getPortfolioByUserId);

// Protected Portfolio Builder Route
router.post('/', jwtAuth, createOrUpdatePortfolio);

module.exports = router;
