import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaTwitter, FaDribbble } from 'react-icons/fa';
import './Contact.css';

const socials = [
  {
    label: 'GitHub',
    href: import.meta.env.VITE_GITHUB_URL || '#',
    icon: <FaGithub size={20} />,
  },
  {
    label: 'LinkedIn',
    href: import.meta.env.VITE_LINKEDIN_URL || '#',
    icon: <FaLinkedinIn size={20} />,
  },
  {
    label: 'Twitter',
    href: import.meta.env.VITE_TWITTER_URL || '#',
    icon: <FaTwitter size={20} />,
  },
  {
    label: 'Dribbble',
    href: import.meta.env.VITE_DRIBBBLE_URL || '#',
    icon: <FaDribbble size={20} />,
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', project: '', message: '' });
      setTimeout(() => {
        setStatus('idle');
      }, 3500);
    }, 1600);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="s-header"
        >
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">
            Ready to Build <span className="gradient-text">Something Amazing?</span>
          </h2>
        </motion.div>

        <motion.div
          className="contact-wrap glass-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left */}
          <div className="contact-left">
            <span className="section-tag">Get In Touch</span>
            <h3 className="contact-heading">Ready to Build<br /><span className="gradient-text">Something Amazing?</span></h3>
            <p className="contact-desc">
              Whether you have a project in mind or just want to say hi, my inbox is always open. Let's create something extraordinary together.
            </p>
            <div className="contact-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="soc"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="fgroup">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Smith"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="fgroup">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="fgroup">
              <label htmlFor="project">Project Type</label>
              <div className="select-wrapper">
                <select
                  id="project"
                  name="project"
                  value={form.project}
                  onChange={handleChange}
                >
                  <option value="">Select project type</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Design System">Design System</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Branding">Branding</option>
                  <option value="Consulting">Consulting</option>
                </select>
              </div>
            </div>
            <div className="fgroup">
              <label htmlFor="message">Tell Me About Your Project</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Describe your project, goals, and timeline..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <motion.button
              type="submit"
              className={`btn-send${status === 'sent' ? ' sent' : ''}`}
              disabled={status === 'sending' || status === 'sent'}
              whileHover={status === 'idle' ? { y: -2 } : {}}
              whileTap={status === 'idle' ? { scale: 0.97 } : {}}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {status === 'idle' && (
                <>
                  <span>Send Message</span>
                  <Send size={16} />
                </>
              )}
              {status === 'sending' && <span>Sending...</span>}
              {status === 'sent' && <span>✓ Message Sent!</span>}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="container footer-inner">
          <div className="footer-logo">
            AR<span className="logo-dot">.</span>
          </div>
          <p className="footer-text">Designed & Built with ♥ & Coffee</p>
          <p className="footer-copy">
            © {new Date().getFullYear()} Aniruth Reddy. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
