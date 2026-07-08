import React, { useEffect, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { Layout, Server, Database, Code, Wrench, Volume2 } from 'lucide-react';
import './Skills.css';

const skillsData = [
  {
    title: 'Frontend Development',
    desc: 'React.js, Framer Motion, HTML5, CSS3 — building responsive, animations-rich user interfaces.',
    icon: <Layout size={24} />,
    clr: '#3b82f6',
    w: '95%',
  },
  {
    title: 'Backend Development',
    desc: 'Node.js, Express.js, RESTful APIs — designing secure, scalable backend architectures.',
    icon: <Server size={24} />,
    clr: '#a855f7',
    w: '90%',
  },
  {
    title: 'Database Management',
    desc: 'MongoDB, MySQL — data modeling, schema integration, and efficient database querying.',
    icon: <Database size={24} />,
    clr: '#10b981',
    w: '85%',
  },
  {
    title: 'Programming Languages',
    desc: 'JavaScript, Java, C++ — strong foundation in Object-Oriented Programming and algorithms.',
    icon: <Code size={24} />,
    clr: '#ef4444',
    w: '92%',
  },
  {
    title: 'Tools & Platforms',
    desc: 'Git, GitHub, GitHub Actions, VS Code, Vite — modern dev tooling and CI/CD version control.',
    icon: <Wrench size={24} />,
    clr: '#f59e0b',
    w: '88%',
  },
  {
    title: 'Web Audio API & Motion',
    desc: 'Web Audio API, SVG animation, canvas rendering — interactive real-time audio visualization.',
    icon: <Volume2 size={24} />,
    clr: '#06b6d4',
    w: '80%',
  },
];

const Counter = ({ to }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, parseInt(to), {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        node.textContent = `${Math.floor(value)}%`;
      },
    });

    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref} className="skill-pct">0%</span>;
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const Skills = () => {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="s-header"
        >
          <span className="section-tag">Expertise</span>
          <h2 className="section-title">
            Tools & <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {skillsData.map((s, i) => (
            <motion.div
              key={s.title}
              className="skill-card glass-panel"
              variants={fadeUp}
              style={{ '--ic': s.clr }}
            >
              <div className="skill-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="skill-bar">
                <motion.div
                  className="skill-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: s.w }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: s.clr }}
                />
              </div>
              <Counter to={s.w} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
