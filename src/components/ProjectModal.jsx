import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { soundFx } from '../utils/audio';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        soundFx.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={() => { soundFx.playClick(); onClose(); }}>
        <motion.div
          className="modal-container glass-panel"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close"
            onClick={() => { soundFx.playClick(); onClose(); }}
            aria-label="Close modal"
            onMouseEnter={() => soundFx.playHover()}
          >
            <X size={20} />
          </button>

          {/* Modal Header Banner */}
          <div className="modal-banner" style={{ background: project.gradient }}>
            <div className="modal-banner-glow" style={{ background: project.accent }} />
            <h2 className="modal-title">{project.title}</h2>
          </div>

          <div className="modal-body">
            <div className="modal-tech-list">
              {project.tech.map((t) => (
                <span key={t} className="modal-tech-badge">
                  {t}
                </span>
              ))}
            </div>

            <h4 className="modal-section-heading">Overview</h4>
            <p className="modal-description">{project.description}</p>

            {project.highlights && (
              <>
                <h4 className="modal-section-heading">Key Features & Architecture</h4>
                <ul className="modal-highlights">
                  {project.highlights.map((h, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="modal-check" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="modal-actions">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
              >
                <FaGithub size={16} /> View Code on GitHub
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                >
                  <ExternalLink size={16} /> Open Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
