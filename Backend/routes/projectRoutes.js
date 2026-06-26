const express = require('express');
const { getProjects, getProjectById, createProject, likeProject } = require('../controllers/projectController');
const { jwtAuth } = require('../middleware/jwtAuth');

const router = express.Router();

// Public Discovery Routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected Routes
router.post('/', jwtAuth, createProject);
router.post('/:id/like', jwtAuth, likeProject);

module.exports = router;
