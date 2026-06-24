import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="hero-greeting">Hi, my name is</h2>
          <h1 className="hero-name">Aniruth Reddy.</h1>
          <h1 className="hero-title gradient-text">I build things for the web.</h1>
          
          <p className="hero-description">
            I'm a Full-Stack Web Development student with a passion for building 
            scalable, production-quality web applications using React, Node.js, and MongoDB.
          </p>
          
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">Check out my work</a>
            <a href="#contact" className="btn btn-secondary">Get in touch</a>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
      >
        <a href="#about">
          <ChevronDown size={32} />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
