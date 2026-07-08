import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Experience.css';

const experiences = [
  {
    company: '3Skill',
    role: 'Full Stack Development Intern',
    period: 'Jun 2026 – Present',
    type: 'Internship',
    duties: [
      'Developed and maintained full-stack features using React.js (frontend) and Node.js/Express.js (backend services).',
      'Designed and integrated MongoDB schemas to support efficient data storage and retrieval for application features.',
      'Collaborated in a remote agile team to build scalable, end-to-end web solutions.',
      'Applied algorithmic problem-solving to optimise backend logic and improve application performance.',
    ],
  },
  {
    company: 'Strikers Esports',
    role: 'Operations & Community Lead',
    period: 'Extracurricular',
    type: 'Leadership',
    duties: [
      'Led operations and community engagement for a competitive esports organisation.',
      'Drafted governance frameworks and established server guidelines for large-scale digital communities.',
      'Managed team lineups and coordinated schedules for competitive esports events.',
      'Grew online community presence and fostered engagement across platforms.',
    ],
  },
];

const Experience = () => {
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  return (
    <section id="experience" className="section exp-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="section-title">
            <span className="gradient-text">03.</span> Experience
          </h2>
        </motion.div>

        <motion.div
          className="exp-wrap glass-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tabs */}
          <div className="exp-tabs">
            {experiences.map((e, i) => (
              <button
                key={e.company}
                className={`exp-tab${active === i ? ' active' : ''}`}
                onClick={() => setActive(i)}
              >
                {e.company}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="exp-content"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="exp-header">
                <div>
                  <h3 className="exp-role">{exp.role}</h3>
                  <p className="exp-company">
                    @ <span>{exp.company}</span>
                  </p>
                </div>
                <div className="exp-meta">
                  <span className="tag">{exp.type}</span>
                  <span className="exp-period">{exp.period}</span>
                </div>
              </div>

              <ul className="exp-duties">
                {exp.duties.map((d, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="duty-arrow">▹</span>
                    {d}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
