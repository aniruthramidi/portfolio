import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const cy = (e.clientY - rect.top - rect.height / 2) / rect.height;

      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${cx * 30}px, ${cy * 20}px)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${cx * -25}px, ${cy * 15}px)`;
      }
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translate(${cx * 20}px, ${cy * -25}px)`;
      }
    };

    const handleMouseLeave = () => {
      if (orb1Ref.current) orb1Ref.current.style.transform = '';
      if (orb2Ref.current) orb2Ref.current.style.transform = '';
      if (orb3Ref.current) orb3Ref.current.style.transform = '';
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      {/* Ambient blobs */}
      <div className="hero-bg" aria-hidden="true">
        <div ref={orb1Ref} className="blob blob-1" />
        <div ref={orb2Ref} className="blob blob-2" />
        <div ref={orb3Ref} className="blob blob-3" />
        <div className="grid-mesh" />
      </div>

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for full-time roles
          </div>

          <p className="hero-greeting">Hi, my name is</p>
          <h1 className="hero-name">Aniruth Reddy.</h1>
          <h2 className="hero-tagline">
            I craft <span className="gradient-text">engaging user interfaces.</span>
          </h2>

          <p className="hero-desc">
            Full-stack developer specialising in React & Node.js — building fast,
            accessible, and beautiful web experiences. Currently interning at{' '}
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                handleScroll('#experience');
              }}
              className="inline-link"
            >
              3Skill
            </a>
            .
          </p>

          <div className="hero-ctas">
            <motion.button
              className="btn-primary"
              onClick={() => handleScroll('#projects')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              View my work <ArrowRight size={16} />
            </motion.button>
            <motion.a
              href={import.meta.env.VITE_GITHUB_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <FaGithub size={16} /> GitHub
            </motion.a>
          </div>

          {/* Quick stats */}
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-val">4+</span>
              <span className="stat-label">Projects shipped</span>
            </div>
            <div className="stat-sep" />
            <div className="stat">
              <span className="stat-val">2+</span>
              <span className="stat-label">Tech stacks</span>
            </div>
            <div className="stat-sep" />
            <div className="stat">
              <span className="stat-val">∞</span>
              <span className="stat-label">Curiosity</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll">
        <div className="scroll-track" />
        <span>scroll</span>
      </div>
    </section>
  );
};

export default Hero;
