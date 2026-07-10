const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  tech: [{ type: String, trim: true }],
  github: { type: String, trim: true, default: '' },
  live: { type: String, trim: true, default: '' },
  accent: { type: String, trim: true, default: '#ffffff' },
  gradient: { type: String, trim: true, default: 'linear-gradient(135deg, #000000 0%, #222222 100%)' },
  featured: { type: Boolean, default: false },
  mockupType: { type: String, trim: true, default: 'grid' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
