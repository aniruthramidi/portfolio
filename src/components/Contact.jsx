import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const encode = (data) => {
        return Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&");
      };

      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encode({ "form-name": "contact", ...formData }),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to send message.');
    }
  };

  return (
    <section id="contact" className="section container">
      <motion.div
        className="contact-container glass-panel"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="contact-overline gradient-text">05. What's Next?</p>
        <h2 className="contact-title">Get In Touch</h2>
        
        <p className="contact-description">
          I'm currently looking for new opportunities and my inbox is always open. 
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="contact-content-wrapper">
          <div className="contact-info">
            <a href="mailto:aniruthreddy1@gmail.com" className="contact-link">
              <Mail size={24} />
              <span>aniruthreddy1@gmail.com</span>
            </a>
            <a href="tel:+917672000328" className="contact-link">
              <Phone size={24} />
              <span>+91 7672000328</span>
            </a>
            <a href="https://github.com/aniruthramidi" target="_blank" rel="noopener noreferrer" className="contact-link">
              <FaGithub size={24} />
              <span>github.com/aniruthramidi</span>
            </a>
          </div>

          <form className="contact-form" name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="contact" />
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary contact-btn">
              Send Message
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </div>
      </motion.div>
      
      <footer className="footer">
        <p>Designed & Built by Aniruth Reddy</p>
      </footer>
    </section>
  );
};

export default Contact;
