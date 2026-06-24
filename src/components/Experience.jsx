import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);

  const experiences = [
    {
      company: "3Skill",
      role: "Full Stack Development Intern",
      period: "Jun 2026 – Present",
      duties: [
        "Developed and maintained full-stack web application features using React.js for the frontend and Node.js/Express.js for backend services.",
        "Designed and integrated MongoDB schemas to support efficient data storage and retrieval for application features.",
        "Collaborated in a remote team environment to build scalable, end-to-end web solutions following agile development practices.",
        "Applied algorithmic problem-solving to optimize backend logic and improve application performance."
      ]
    },
    {
      company: "Strikers Esports",
      role: "Operations & Community Lead",
      period: "Extracurricular",
      duties: [
        "Led operations and community engagement for an esports organization.",
        "Drafted governance frameworks and established server guidelines for large-scale digital communities.",
        "Managed team lineups and coordinated schedules for competitive esports events."
      ]
    }
  ];

  return (
    <section id="experience" className="section container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          <span className="gradient-text">03.</span> Where I've Worked
        </h2>
        
        <div className="experience-container glass-panel">
          <div className="tab-list">
            {experiences.map((exp, index) => (
              <button
                key={index}
                className={`tab-button ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {exp.company}
              </button>
            ))}
            <div 
              className="tab-highlight" 
              style={{ transform: `translateY(${activeTab * 50}px)` }}
            ></div>
          </div>
          
          <div className="tab-panels">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`tab-panel ${activeTab === index ? 'active' : ''}`}
              >
                <h3>
                  <span>{exp.role}</span>
                  <span className="company-name">
                    &nbsp;@&nbsp;{exp.company}
                  </span>
                </h3>
                <p className="experience-period">{exp.period}</p>
                
                <ul className="duty-list">
                  {exp.duties.map((duty, i) => (
                    <li key={i} className="duty-item">
                      <span className="duty-bullet">▹</span>
                      <p>{duty}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
