import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Maximize2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ProjectModal from './ProjectModal';
import { soundFx } from '../utils/audio';
import './Projects.css';

const projects = [
  {
    id: 'decibel',
    title: 'Decibel',
    category: 'Full-Stack',
    description:
      'A sleek full-stack music streaming web app. Engineered a real-time audio analysis feature using the Web Audio API — complex audio processing pipelines for live waveform visualization.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Web Audio API'],
    github: 'https://github.com/aniruthramidi/decibel',
    live: 'https://decibel-zeta.vercel.app',
    accent: '#5E6AD2',
    gradient: 'linear-gradient(135deg, #0f0722 0%, #1a0f3d 50%, #0c1a45 100%)',
    featured: true,
    mockupType: 'dashboard',
    highlights: [
      'Real-time audio frequency spectrum visualizer rendered on HTML5 Canvas.',
      'Web Audio API Gain, BiquadFilter, and AnalyserNode audio processing graph.',
      'RESTful backend architecture with MongoDB models for playlists and streaming statistics.',
      'Full authentication and responsive custom player interface.',
    ],
  },
  {
    id: 'trading-bot',
    title: 'Trading Bot',
    category: 'Python',
    description:
      'High-tech Binance Futures Trading Bot with a CLI interface. Automated crypto trading with robust market data analysis, risk management, and real-time Pandas signal processing.',
    tech: ['Python', 'Binance API', 'Pandas', 'NumPy'],
    github: 'https://github.com/aniruthramidi/trading-bot',
    live: null,
    accent: '#22c55e',
    gradient: 'linear-gradient(135deg, #021209 0%, #0d2e1a 50%, #0d2620 100%)',
    featured: false,
    mockupType: 'phone',
    highlights: [
      'Binance Futures API integration for real-time WebSocket market streams.',
      'Automated technical analysis indicators (RSI, MACD, Moving Averages) built with Pandas.',
      'Configurable risk parameters including take-profit, stop-loss, and trailing stops.',
      'Interactive CLI interface with real-time portfolio performance tracking.',
    ],
  },
  {
    id: 'neon-breakout',
    title: 'Neon Breakout',
    category: 'Vanilla JS',
    description:
      'Retro-style neon arcade breakout game. Responsive physics, collision detection, and glowing visual aesthetics — all in vanilla JS and HTML5 Canvas.',
    tech: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
    github: 'https://github.com/aniruthramidi/neon-breakout-game',
    live: 'https://neonbrakeout1.netlify.app',
    accent: '#f59e0b',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #3a1e00 50%, #2a1000 100%)',
    featured: false,
    mockupType: 'grid',
    highlights: [
      '60 FPS physics engine rendering dynamic ball deflection and paddle mechanics.',
      'Custom particle explosion effects upon brick destruction.',
      'Progressive level difficulty scaling and local high-score persistence.',
    ],
  },
  {
    id: 'calculator',
    title: 'Calculator App',
    category: 'Vanilla JS',
    description:
      'A clean, responsive calculator application with smooth animations and keyboard support. Built as a study in CSS grid mastery and state management in vanilla JS.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/aniruthramidi/calculator',
    live: null,
    accent: '#38bdf8',
    gradient: 'linear-gradient(135deg, #040e2c 0%, #0d1f52 50%, #0c2564 100%)',
    featured: false,
    mockupType: 'sidebar',
    highlights: [
      'Mathematical expression parsing with error handling and history tracking.',
      'Full physical keyboard shortcut listener support.',
      'Sleek glassmorphic theme with CSS Grid layout resilience across screen sizes.',
    ],
  },
];

const categories = ['All', 'Full-Stack', 'Python', 'Vanilla JS'];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(y - yc) / 12;
    const rotateY = (x - xc) / 12;

    card.style.setProperty('--x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--y', `${(y / rect.height) * 100}%`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.removeProperty('--x');
    card.style.removeProperty('--y');
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const renderMockup = (type) => {
    switch (type) {
      case 'dashboard':
        return (
          <div className="mock-window">
            <div className="mock-titlebar">
              <span className="mock-dot" />
              <span className="mock-dot" />
              <span className="mock-dot" />
            </div>
            <div className="mock-body">
              <div className="mock-line" style={{ width: '80%' }} />
              <div className="mock-line" style={{ width: '60%' }} />
              <div className="mock-grid">
                <div className="mock-cell" />
                <div className="mock-cell" />
              </div>
            </div>
          </div>
        );
      case 'phone':
        return (
          <div className="mock-phone">
            <div className="mock-phone-notch" />
            <div className="mock-body">
              <div className="mock-line" style={{ width: '50%', margin: '0 auto 12px', height: '6px', opacity: 0.4 }} />
              <div className="mock-line" style={{ width: '80%' }} />
              <div className="mock-line" style={{ width: '65%' }} />
              <div className="mock-line" style={{ width: '55%' }} />
            </div>
          </div>
        );
      case 'grid':
        return (
          <div className="mock-window">
            <div className="mock-titlebar">
              <span className="mock-dot" />
              <span className="mock-dot" />
              <span className="mock-dot" />
            </div>
            <div className="mock-body">
              <div className="mock-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginTop: 0 }}>
                <div className="mock-cell" style={{ height: '24px' }} />
                <div className="mock-cell" style={{ height: '24px' }} />
                <div className="mock-cell" style={{ height: '24px' }} />
                <div className="mock-cell" style={{ height: '24px' }} />
                <div className="mock-cell" style={{ height: '24px' }} />
                <div className="mock-cell" style={{ height: '24px' }} />
              </div>
            </div>
          </div>
        );
      case 'sidebar':
        return (
          <div className="mock-window mock-wide-layout">
            <div className="mock-titlebar">
              <span className="mock-dot" />
              <span className="mock-dot" />
              <span className="mock-dot" />
            </div>
            <div className="mock-sidebar-layout">
              <div className="mock-sidebar">
                <div className="mock-line" style={{ width: '80%' }} />
                <div className="mock-line" style={{ width: '50%' }} />
                <div className="mock-line" style={{ width: '60%' }} />
              </div>
              <div className="mock-main">
                <div className="mock-line" style={{ width: '90%' }} />
                <div className="mock-line" style={{ width: '75%' }} />
                <div className="mock-grid" style={{ gap: '6px' }}>
                  <div className="mock-cell" style={{ height: '20px' }} />
                  <div className="mock-cell" style={{ height: '20px' }} />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="s-header"
        >
          <span className="section-tag">Selected Work</span>
          <h2 className="section-title">
            Projects That <span className="gradient-text">Move</span> People
          </h2>
        </motion.div>

        {/* Category Filters */}
        <div className="proj-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`proj-filter-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => {
                soundFx.playClick();
                setActiveCategory(cat);
              }}
              onMouseEnter={() => soundFx.playHover()}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          className="projects-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`proj-card glass-panel${p.featured ? ' proj-featured' : ''}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedProject(p);
                }}
                style={{ '--p-accent': p.accent }}
              >
                {/* Visual mockup */}
                <div className="proj-visual" style={{ background: p.gradient }}>
                  <div className="mock-wrap">{renderMockup(p.mockupType)}</div>
                  <div className="proj-glow" />
                  <div className="proj-expand-badge">
                    <Maximize2 size={14} /> Quick View
                  </div>
                </div>

                <div className="proj-body">
                  {p.featured && (
                    <span className="section-tag" style={{ marginBottom: '0.75rem', alignSelf: 'flex-start' }}>
                      Featured Project
                    </span>
                  )}
                  <div className="proj-tags">
                    {p.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <h3 className="proj-title">{p.title}</h3>
                  <p className="proj-desc">{p.description}</p>
                  <div className="proj-links" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-link"
                      aria-label="GitHub"
                      onClick={() => soundFx.playClick()}
                      onMouseEnter={() => soundFx.playHover()}
                    >
                      <FaGithub size={15} /> Code
                    </a>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-link proj-link-live"
                        aria-label="Live demo"
                        onClick={() => soundFx.playClick()}
                        onMouseEnter={() => soundFx.playHover()}
                      >
                        <ExternalLink size={14} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="projects-more"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ marginTop: '3.5rem' }}
        >
          <a
            href={import.meta.env.VITE_GITHUB_URL || 'https://github.com/aniruthramidi'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            onClick={() => soundFx.playClick()}
            onMouseEnter={() => soundFx.playHover()}
          >
            <FaGithub size={16} /> See all projects on GitHub
          </a>
        </motion.div>

        {/* Modal */}
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </section>
  );
};

export default Projects;
