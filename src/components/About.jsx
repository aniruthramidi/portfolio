import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          <span className="gradient-text">01.</span> About Me
        </h2>
        
        <div className="about-content">
          <div className="about-text glass-panel">
            <p>
              Hello! My name is Aniruth and I enjoy creating things that live on the internet. 
              My interest in web development started when I realized the power of building 
              interactive experiences that anyone in the world can access.
            </p>
            <p>
              Fast-forward to today, and I've had the privilege of studying Computer Science at 
              Veltech Dr. RR & Dr. SR University. I'm currently focused on building accessible, 
              inclusive products and digital experiences. My main focus these days is building 
              scalable full-stack applications with React and Node.js.
            </p>
            <p>
              I also have experience managing large-scale digital communities and coordinating 
              competitive events, which taught me a lot about leadership, governance, and teamwork.
            </p>
          </div>
          
          <div className="about-image-container">
            <div className="about-image-wrapper">
              <div className="about-image-overlay"></div>
              {/* Using a placeholder for now. Replace with actual profile picture */}
              <img 
                src="https://via.placeholder.com/400x400/171717/3b82f6?text=AR" 
                alt="Aniruth Reddy" 
                className="about-image"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
