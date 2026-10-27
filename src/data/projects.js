/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} code
 * @property {string} title
 * @property {string} category
 * @property {string} year
 * @property {string} client
 * @property {string} role
 * @property {string} image
 * @property {string} description
 * @property {string[]} deliverables
 * @property {string} github
 * @property {string|null} live
 */

/** @type {Project[]} */
export const projects = [
  {
    id: 'decibel',
    code: "A'01",
    title: 'DECIBEL',
    category: 'Full-Stack Streaming Platform / Web Audio API / Waveform Visualizer',
    year: '©24.26',
    client: 'Audio Technology & Streaming Labs',
    role: 'Full-Stack Engineer & Audio Architecture Lead',
    image: '/projects/decibel.jpg',
    description: 'A full-stack music streaming platform engineered for real-time acoustic feedback. Features an interactive Web Audio API processing graph with Gain, BiquadFilter, and AnalyserNode pipelines rendering 60 FPS live waveform frequency spectrums on HTML5 Canvas, supported by a RESTful Node.js and MongoDB backend.',
    deliverables: [
      'Real-Time Web Audio Frequency Analyser Graph',
      'HTML5 Canvas Live Waveform Visualizer (60 FPS)',
      'RESTful Express/MongoDB Backend Architecture',
      'Responsive Custom Audio Player Interface'
    ],
    github: 'https://github.com/aniruthramidi/decibel',
    live: 'https://decibel-zeta.vercel.app'
  },
  {
    id: 'trading-bot',
    code: "A'02",
    title: 'TRADING BOT',
    category: 'Algorithmic Quantitative Engine / Binance Futures / Python Pipelines',
    year: '©24.26',
    client: 'Crypto Quantitative Trading & Analytics',
    role: 'Python & Algorithmic Systems Engineer',
    image: '/projects/trading_bot.jpg',
    description: 'High-frequency Binance Futures trading bot featuring low-latency WebSocket market streaming and automated technical indicator calculation with Pandas and NumPy (RSI, MACD, EMAs). Includes risk management routines with trailing stop-loss, take-profit triggers, and an interactive real-time CLI terminal.',
    deliverables: [
      'Binance Futures Low-Latency WebSocket Streams',
      'Vectorized Technical Indicators (RSI, MACD, EMAs)',
      'Dynamic Trailing Stop-Loss & Risk Management',
      'Interactive Real-Time Portfolio Performance CLI'
    ],
    github: 'https://github.com/aniruthramidi/trading-bot',
    live: null
  },
  {
    id: 'neon-breakout',
    code: "A'03",
    title: 'NEON BREAKOUT',
    category: 'Interactive Game Physics / HTML5 Canvas / Retro Cyber Aesthetics',
    year: '©24.26',
    client: 'Experimental Web Game Lab',
    role: 'Physics Engine & Frontend Developer',
    image: '/projects/neon_breakout.jpg',
    description: 'A retro-cyber neon arcade breakout game engineered from scratch in vanilla JavaScript and HTML5 Canvas. Includes a custom 60 FPS collision physics engine with ball deflection math, velocity multipliers, glowing neon particle explosions, and persistent local high-score tracking.',
    deliverables: [
      'Custom 60 FPS Collision Detection & Vector Deflection',
      'Particle Explosion Engine upon Brick Destruction',
      'Dynamic Ball Velocity Scaling & Paddle Angles',
      'High-Performance HTML5 Canvas Neon Glow Shader'
    ],
    github: 'https://github.com/aniruthramidi/neon-breakout-game',
    live: 'https://neonbrakeout1.netlify.app'
  },
  {
    id: 'calculator',
    code: "A'04",
    title: 'CALCULATOR STUDIO',
    category: 'Expression Parser / CSS Grid Mastery / Keyboard Input Architecture',
    year: '©24.26',
    client: 'Precision Tools & UI Lab',
    role: 'Frontend & State Architecture Developer',
    image: '/projects/calculator.jpg',
    description: 'A responsive scientific calculator application built to demonstrate CSS Grid structural resilience, state management without external bloat, and a robust mathematical expression parser with parentheses tokenization and syntax validation.',
    deliverables: [
      'Mathematical Expression Tokenizer & Evaluator',
      'Full Keyboard Event Shortcut Listener Architecture',
      'Fluid CSS Grid Layout with Glassmorphic Elements',
      'Real-Time Calculation History & Memory Registers'
    ],
    github: 'https://github.com/aniruthramidi/calculator',
    live: null
  }
];

export default projects;
