const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String }
}, { _id: true });

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String },
  description: { type: String }
}, { _id: true });

const PortfolioSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  username: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  skills: [{ type: String }],
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    website: { type: String, default: '' }
  },
  experience: [ExperienceSchema],
  achievements: [AchievementSchema],
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
