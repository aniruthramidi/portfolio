/**
 * @typedef {Object} Service
 * @property {string} num
 * @property {string} title
 * @property {string} desc
 * @property {string} image
 */

/** @type {Service[]} */
export const services = [
  {
    num: '01',
    title: 'FULL-STACK ENGINEERING',
    desc: 'End-to-end web applications with React, Node.js, Express, and MongoDB. Clean component hierarchy and scalable RESTful APIs.',
    image: '/projects/decibel.jpg'
  },
  {
    num: '02',
    title: 'INTERACTIVE UI & SYSTEMS',
    desc: 'Butter-smooth micro-interactions, Framer Motion springs, Lenis scroll physics, and editorial brutalist aesthetics that captivate users.',
    image: '/projects/neon_breakout.jpg'
  },
  {
    num: '03',
    title: 'REAL-TIME AUDIO & CANVAS',
    desc: 'Web Audio API node pipelines, real-time frequency analysis, and 60 FPS HTML5 Canvas shaders and waveform visualizers.',
    image: '/projects/decibel.jpg'
  },
  {
    num: '04',
    title: 'DATA & AUTOMATION PIPELINES',
    desc: 'Python quantitative trading scripts, Binance WebSocket feeds, Pandas/NumPy algorithmic indicators, and high-performance automation bots.',
    image: '/projects/trading_bot.jpg'
  }
];

export default services;
