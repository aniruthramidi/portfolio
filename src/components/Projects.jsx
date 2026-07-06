import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: "Decibel",
      description: "A sleek, full-stack music streaming web application. Engineered a real-time audio analysis feature using the Web Audio API, implementing complex audio processing pipelines for live visualization.",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Web Audio API"],
      github: "https://github.com/aniruthramidi/decibel",
      live: "https://decibel-zeta.vercel.app",
      image: "/projects/decibel.jpg"
    },
    {
      title: "Trading Bot",
      description: "A high-tech Binance Futures Trading Bot with a command-line interface. Built for automated crypto trading with robust market data analysis and risk management features.",
      techStack: ["Python", "Binance API", "Pandas", "NumPy"],
      github: "https://github.com/aniruthramidi/trading-bot",
      live: "#",
      image: "/projects/trading_bot.jpg"
    },
    {
      title: "Neon Breakout Game",
      description: "A retro-style neon arcade breakout game. Developed with responsive physics, collision detection, and glowing visual aesthetics for an engaging web-based gaming experience.",
      techStack: ["JavaScript", "HTML5 Canvas", "CSS3", "Game Physics"],
      github: "https://github.com/aniruthramidi/neon-breakout-game",
      live: "https://aniruthreddy.netlify.app",
      image: "/projects/neon_breakout.jpg"
    }
  ];

  return (
    <section id="projects" className="section container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          <span className="gradient-text">04.</span> Some Things I've Built
        </h2>
        
        <div className="projects-list">
          {projects.map((project, index) => (
            <motion.div 
              className="project-card glass-panel"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="project-image-container">
                <a href={project.live !== "#" ? project.live : project.github} target="_blank" rel="noopener noreferrer">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-image-overlay"></div>
                </a>
              </div>
              
              <div className="project-content">
                <p className="project-overline gradient-text">Featured Project</p>
                <h3 className="project-title">
                  <a href={project.live !== "#" ? project.live : project.github} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </h3>
                
                <div className="project-description">
                  <p>{project.description}</p>
                </div>
                
                <ul className="project-tech-list">
                  {project.techStack.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
                
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Link">
                    <FaGithub size={20} />
                  </a>
                  {project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="External Link">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="projects-more">
          <a 
            href="https://github.com/aniruthramidi" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
          >
            View more on GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
