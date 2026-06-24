require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ContactMessage = require('./models/ContactMessage');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();
    
    console.log('--- New Contact Message Saved to DB ---');
    console.log(`Name: ${name}, Email: ${email}`);
    
    res.status(200).json({ success: true, message: 'Message received and saved successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Server error, could not save message.' });
  }
});

// Basic route to test server
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
