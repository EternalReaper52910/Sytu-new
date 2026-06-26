const Project = require('../models/Project');
const { getMongoStatus } = require('../config/mongo');

let mockProjects = [
  {
    id: "p1",
    title: "NexusDB",
    tagline: "Ultra-fast distributed vector database for AI agents.",
    description: "Built from scratch in Rust and C++. Features fully homomorphic encryption and blazing fast cosine similarity search.",
    creatorId: "1",
    creatorName: "alex_sytu",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://nexusdb.ai",
    githubUrl: "https://github.com/alex/nexusdb",
    techStack: ["Rust", "C++", "AI", "Vector DB"],
    views: 524,
    likes: 89,
    isFeatured: true
  },
  {
    id: "p2",
    title: "HyperFrame",
    tagline: "Modern micro-animation framework for React & Next.js.",
    description: "Designed for premium SaaS platforms looking for Netflix/Apple style interactions with zero layout shift.",
    creatorId: "2",
    creatorName: "sophia_ui",
    thumbnailUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://hyperframe.design",
    githubUrl: "https://github.com/sophia/hyperframe",
    techStack: ["React", "Next.js", "Framer Motion", "CSS"],
    views: 340,
    likes: 64,
    isFeatured: true
  }
];

/**
 * Get all projects with optional filtering
 */
async function getProjects(req, res) {
  const { featured, tech } = req.query;

  if (!getMongoStatus()) {
    let result = [...mockProjects];
    if (featured === 'true') result = result.filter(p => p.isFeatured);
    if (tech) result = result.filter(p => p.techStack.map(t => t.toLowerCase()).includes(tech.toLowerCase()));
    return res.json({ source: 'in-memory-mock', count: result.length, data: result });
  }

  try {
    let filter = {};
    if (featured === 'true') filter.isFeatured = true;
    if (tech) filter.techStack = { $regex: new RegExp(tech, 'i') };

    const projects = await Project.find(filter).sort({ views: -1 });
    res.json({ source: 'mongodb', count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
}

/**
 * Get project by ID (Increments views)
 */
async function getProjectById(req, res) {
  const { id } = req.params;

  if (!getMongoStatus()) {
    const project = mockProjects.find(p => p.id === id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    project.views += 1;
    return res.json({ source: 'in-memory-mock', data: project });
  }

  try {
    const project = await Project.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ source: 'mongodb', data: project });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
}

/**
 * Create a new showcase Project (Protected)
 */
async function createProject(req, res) {
  const creatorId = req.user ? String(req.user.id || req.user.userId || req.user.username) : req.body.creatorId;
  const creatorName = req.user ? req.user.username : req.body.creatorName || 'anonymous_builder';

  const { title, tagline, description, thumbnailUrl, demoUrl, githubUrl, techStack, isFeatured } = req.body;

  if (!title || !tagline || !description) {
    return res.status(400).json({ message: 'Title, tagline, and description are required.' });
  }

  if (!getMongoStatus()) {
    const newProject = {
      id: `p${mockProjects.length + 1}`,
      title, tagline, description, creatorId, creatorName,
      thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      demoUrl: demoUrl || '', githubUrl: githubUrl || '',
      techStack: techStack || [], views: 0, likes: 0, isFeatured: isFeatured || false
    };
    mockProjects.push(newProject);
    return res.status(201).json({ source: 'in-memory-mock', message: 'Project created successfully', data: newProject });
  }

  try {
    const project = new Project({
      title, tagline, description, creatorId, creatorName, thumbnailUrl, demoUrl, githubUrl, techStack, isFeatured
    });
    await project.save();
    res.status(201).json({ source: 'mongodb', message: 'Project created successfully', data: project });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
}

/**
 * Like a project (Protected)
 */
async function likeProject(req, res) {
  const { id } = req.params;

  if (!getMongoStatus()) {
    const project = mockProjects.find(p => p.id === id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    project.likes += 1;
    return res.json({ source: 'in-memory-mock', message: 'Project liked', likes: project.likes });
  }

  try {
    const project = await Project.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ source: 'mongodb', message: 'Project liked', likes: project.likes });
  } catch (error) {
    res.status(500).json({ message: 'Error liking project', error: error.message });
  }
}

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  likeProject
};
