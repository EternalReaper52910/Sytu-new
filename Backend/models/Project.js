const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  creatorId: { type: String, required: true, index: true },
  creatorName: { type: String, required: true },
  thumbnailUrl: { type: String, default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop' },
  demoUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  techStack: [{ type: String }],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
