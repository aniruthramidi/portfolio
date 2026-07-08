import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Code2 } from 'lucide-react';
import Magnetic from './Magnetic';
import './About.css';

const About = () => {
  const values = [
    {
      icon: <Code2 size={18} />,
      title: 'User-Centered',
      desc: 'Every decision starts with real user needs and research.',
    },
    {
      icon: <Zap size={18} />,
      title: 'Systems Thinking',
      desc: 'Building scalable components and clean architectures, not one-off solutions.',
    },
    {
      icon: <Sparkles size={18} />,
      title: 'Pixel Perfect',
      desc: 'Obsessive attention to detail in every visual element and micro-interaction.',
    },
  ];

  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Visual avatar & badge */}
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-card-bg">
              <div className="avatar-shape">
                <div className="avatar-ring">
                  <div className="avatar-inner">
                    <svg
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      className="avatar-svg"
                    >
                      <circle
                        cx="50"
                        cy="38"
                        r="22"
                        fill="rgba(255,255,255,0.15)"
                        stroke="rgba(255,255,255,0.3)"
                        stroke-width="2"
                      />
                      <ellipse
                        cx="50"
                        cy="90"
                        rx="33"
                        ry="22"
                        fill="rgba(255,255,255,0.1)"
                        stroke="rgba(255,255,255,0.2)"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge card */}
            <div className="about-float-card">
              <div className="float-icon">✦</div>
              <div>
                <div className="float-title">Full Stack Intern</div>
                <div className="float-sub">Jun 2026 – Present</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio text & values */}
          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-tag">About Me</span>
            <h2 className="section-title">
              Designing With <span className="gradient-text">Purpose</span>
            </h2>

            <div className="about-bio">
              <p className="about-text">
                Hello! I'm <strong>Aniruth Reddy</strong> — a full-stack developer who loves building
                things that live on the internet. My journey started when I discovered how much
                impact a single web app could have, and I've been hooked ever since.
              </p>
              <p className="about-text">
                I'm currently a <strong>Full Stack Development Intern at 3Skill</strong>, where
                I build end-to-end features with React, Node.js, and MongoDB. When I'm not
                writing code, I'm running community ops at <strong>Strikers Esports</strong> and
                exploring new technologies.
              </p>
            </div>

            <div className="about-values">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  className="val-item glass-panel"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="val-icon">{v.icon}</div>
                  <div>
                    <div className="val-title">{v.title}</div>
                    <div className="val-desc">{v.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Magnetic>
              <a
                href="#contact"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll('#contact');
                }}
              >
                Let's Work Together
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
