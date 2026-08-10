import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Briefcase, Code2, Award } from 'lucide-react';
import { soundFx } from '../utils/audio';
import './ResumeModal.css';

const ResumeModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        soundFx.playClick();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="resume-backdrop" onClick={() => { soundFx.playClick(); onClose(); }}>
        <motion.div
          className="resume-modal glass-panel"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="resume-header">
            <div className="resume-actions">
              <button
                className="resume-btn-icon"
                onClick={handlePrint}
                title="Print Resume"
                onMouseEnter={() => soundFx.playHover()}
              >
                <Printer size={18} /> Print
              </button>
              <button
                className="resume-close-btn"
                onClick={() => { soundFx.playClick(); onClose(); }}
                aria-label="Close modal"
                onMouseEnter={() => soundFx.playHover()}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="resume-body printable-area">
            {/* Header info */}
            <div className="res-top">
              <div>
                <h1 className="res-name">ANIRUTH REDDY</h1>
                <p className="res-subtitle">Full-Stack Software Engineer & Web Developer</p>
              </div>
              <div className="res-contact-info">
                <span>Telangana, India</span>
                <span>aniruth.ramidi@gmail.com</span>
                <span>github.com/aniruthramidi</span>
              </div>
            </div>

            <hr className="res-divider" />

            {/* Experience */}
            <div className="res-section">
              <h3 className="res-sec-title">
                <Briefcase size={16} /> WORK EXPERIENCE
              </h3>
              <div className="res-item">
                <div className="res-item-head">
                  <span className="res-item-role">Full Stack Development Intern</span>
                  <span className="res-item-date">Jun 2026 – Present</span>
                </div>
                <div className="res-item-sub">3Skill • Remote</div>
                <ul className="res-bullet-list">
                  <li>Engineered responsive full-stack web applications utilizing React.js, Express.js, and Node.js.</li>
                  <li>Designed and integrated schema models in MongoDB for efficient query speeds and real-time streaming data.</li>
                  <li>Optimized frontend render performance and implemented component state management architectures.</li>
                </ul>
              </div>

              <div className="res-item">
                <div className="res-item-head">
                  <span className="res-item-role">Operations & Community Lead</span>
                  <span className="res-item-date">Extracurricular</span>
                </div>
                <div className="res-item-sub">Strikers Esports</div>
                <ul className="res-bullet-list">
                  <li>Orchestrated community operations and server governance models for competitive gaming platforms.</li>
                  <li>Managed tournament logistics, team rosters, and digital marketing strategies.</li>
                </ul>
              </div>
            </div>

            {/* Skills */}
            <div className="res-section">
              <h3 className="res-sec-title">
                <Code2 size={16} /> TECHNICAL SKILLS
              </h3>
              <div className="res-skills-grid">
                <div>
                  <strong>Languages:</strong> JavaScript (ES6+), C++, Java, Python, HTML5, CSS3
                </div>
                <div>
                  <strong>Frameworks & Libraries:</strong> React.js, Node.js, Express.js, Framer Motion, Web Audio API
                </div>
                <div>
                  <strong>Databases & Tools:</strong> MongoDB, MySQL, Git, GitHub Actions, Vite, REST APIs
                </div>
              </div>
            </div>

            {/* Selected Projects */}
            <div className="res-section">
              <h3 className="res-sec-title">
                <Award size={16} /> FEATURED PROJECTS
              </h3>
              <div className="res-item">
                <div className="res-item-head">
                  <span className="res-item-role">Decibel — Real-time Music Streaming App</span>
                </div>
                <p className="res-proj-desc">
                  Built a full-stack music player featuring Web Audio API frequency analysis, spectrum visualizers, and MongoDB backend.
                </p>
              </div>

              <div className="res-item">
                <div className="res-item-head">
                  <span className="res-item-role">Binance Futures Trading Bot CLI</span>
                </div>
                <p className="res-proj-desc">
                  Developed automated cryptocurrency algorithmic trading software in Python utilizing Pandas signal analysis and Binance APIs.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
