import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    title: 'Decibel',
    description:
      'A sleek full-stack music streaming web app. Engineered a real-time audio analysis feature using the Web Audio API — complex audio processing pipelines for live waveform visualization.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Web Audio API'],
    github: 'https://github.com/aniruthramidi/decibel',
    live: 'https://decibel-zeta.vercel.app',
    accent: '#5E6AD2',
    gradient: 'linear-gradient(135deg, #0f0722 0%, #1a0f3d 50%, #0c1a45 100%)',
    featured: true,
    mockupType: 'dashboard',
  },
  {
    title: 'Trading Bot',
    description:
      'High-tech Binance Futures Trading Bot with a CLI interface. Automated crypto trading with robust market data analysis, risk management, and real-time Pandas signal processing.',
    tech: ['Python', 'Binance API', 'Pandas', 'NumPy'],
    github: 'https://github.com/aniruthramidi/trading-bot',
    live: null,
    accent: '#22c55e',
    gradient: 'linear-gradient(135deg, #021209 0%, #0d2e1a 50%, #0d2620 100%)',
    featured: false,
    mockupType: 'phone',
  },
  {
    title: 'Neon Breakout',
    description:
      'Retro-style neon arcade breakout game. Responsive physics, collision detection, and glowing visual aesthetics — all in vanilla JS and HTML5 Canvas.',
    tech: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
    github: 'https://github.com/aniruthramidi/neon-breakout-game',
    live: 'https://neonbrakeout1.netlify.app',
    accent: '#f59e0b',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #3a1e00 50%, #2a1000 100%)',
    featured: false,
    mockupType: 'grid',
  },
  {
    title: 'Calculator',
    description:
      'A clean, responsive calculator application with smooth animations and keyboard support. Built as a study in CSS grid mastery and state management in vanilla JS.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/aniruthramidi/calculator',
    live: null,
    accent: '#38bdf8',
    gradient: 'linear-gradient(135deg, #040e2c 0%, #0d1f52 50%, #0c2564 100%)',
    featured: false,
    mockupType: 'sidebar',
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const Projects = () => {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setProjectList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setProjectList(projects);
        setLoading(false);
      });
  }, []);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(y - yc) / 12; // Max ~12 degrees tilt
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

        <motion.div
          className="projects-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projectList.map((p) => (
            <motion.article
              key={p.title}
              className={`proj-card glass-panel${p.featured ? ' proj-featured' : ''}`}
              variants={fadeUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ '--p-accent': p.accent }}
            >
              {/* Visual mockup */}
              <div className="proj-visual" style={{ background: p.gradient }}>
                <div className="mock-wrap">
                  {renderMockup(p.mockupType)}
                </div>
                <div className="proj-glow" />
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
                <div className="proj-links">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-link"
                    aria-label="GitHub"
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
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
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
            href={import.meta.env.VITE_GITHUB_URL || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <FaGithub size={16} /> See all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
