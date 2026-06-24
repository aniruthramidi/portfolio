import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Wrench, Server } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code size={24} className="skill-icon" />,
      skills: ["Java", "C++", "JavaScript", "HTML", "CSS"]
    },
    {
      title: "Frameworks & Libraries",
      icon: <Server size={24} className="skill-icon" />,
      skills: ["React.js", "Node.js", "Express.js"]
    },
    {
      title: "Databases",
      icon: <Database size={24} className="skill-icon" />,
      skills: ["MongoDB", "MySQL"]
    },
    {
      title: "Tools & Platforms",
      icon: <Wrench size={24} className="skill-icon" />,
      skills: ["Git", "GitHub", "GitHub Actions", "Web Audio API", "VS Code"]
    }
  ];

  return (
    <section id="skills" className="section container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          <span className="gradient-text">02.</span> Technical Skills
        </h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div 
              className="skill-card glass-panel"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="skill-card-header">
                {category.icon}
                <h3>{category.title}</h3>
              </div>
              <ul className="skill-list">
                {category.skills.map((skill, i) => (
                  <li key={i} className="skill-item">
                    <span className="skill-bullet">▹</span> {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
