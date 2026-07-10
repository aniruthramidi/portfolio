require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ContactMessage = require('./models/ContactMessage');
const Project = require('./models/Project');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'portfolio-admin-super-secret-key-999';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB successfully');
    await seedProjects();
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Seeder for initial projects
const seedProjects = async () => {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      console.log('Seeding initial projects to database...');
      const defaultProjects = [
        {
          title: 'Decibel',
          description: 'A sleek full-stack music streaming web app. Engineered a real-time audio analysis feature using the Web Audio API — complex audio processing pipelines for live waveform visualization.',
          tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Web Audio API'],
          github: 'https://github.com/aniruthramidi/decibel',
          live: 'https://decibel-zeta.vercel.app',
          accent: '#ffffff',
          gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          featured: true,
          mockupType: 'dashboard',
        },
        {
          title: 'Trading Bot',
          description: 'High-tech Binance Futures Trading Bot with a CLI interface. Automated crypto trading with robust market data analysis, risk management, and real-time Pandas signal processing.',
          tech: ['Python', 'Binance API', 'Pandas', 'NumPy'],
          github: 'https://github.com/aniruthramidi/trading-bot',
          live: '',
          accent: '#ffffff',
          gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          featured: false,
          mockupType: 'phone',
        },
        {
          title: 'Neon Breakout',
          description: 'Retro-style neon arcade breakout game. Responsive physics, collision detection, and glowing visual aesthetics — all in vanilla JS and HTML5 Canvas.',
          tech: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
          github: 'https://github.com/aniruthramidi/neon-breakout-game',
          live: 'https://neonbrakeout1.netlify.app',
          accent: '#ffffff',
          gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          featured: false,
          mockupType: 'grid',
        },
        {
          title: 'Calculator',
          description: 'A clean, responsive calculator application with smooth animations and keyboard support. Built as a study in CSS grid mastery and state management in vanilla JS.',
          tech: ['JavaScript', 'HTML5', 'CSS3'],
          github: 'https://github.com/aniruthramidi/calculator',
          live: '',
          accent: '#ffffff',
          gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          featured: false,
          mockupType: 'sidebar',
        },
      ];
      await Project.insertMany(defaultProjects);
      console.log('🟢 Successfully seeded initial projects.');
    }
  } catch (err) {
    console.error('Error seeding projects:', err);
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Auth Middleware
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// ── PUBLIC ROUTES ──

// Submit Contact Message
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();
    console.log(`--- New Message: From ${name} (${email}) ---`);
    res.status(200).json({ success: true, message: 'Message received and saved!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Server error, could not save message.' });
  }
});

// Get Projects List
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
});

// Admin Login
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  }
  res.status(401).json({ error: 'Incorrect password' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running.' });
});

// ── SECURED ADMIN ROUTES ──

// Create Project
app.post('/api/projects', auth, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: 'Invalid project data' });
  }
});

// Delete Project
app.delete('/api/projects/:projectId', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.projectId);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete project' });
  }
});

// Get Contact Messages
app.get('/api/messages', auth, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// Delete Contact Message
app.delete('/api/messages/:messageId', auth, async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.messageId);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete message' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
