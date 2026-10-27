import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Check } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-md flex justify-end overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 280 }}
          style={{ willChange: 'transform' }}
          className="w-full max-w-3xl min-h-full bg-paper text-ink p-8 md:p-14 flex flex-col justify-between overflow-y-auto gpu-accelerated shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div>
            <div className="flex justify-between items-center pb-6 border-b border-ink/15 text-xs font-mono text-ink-soft">
              <span>PROJECT CASE STUDY</span>
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                aria-label="Close project modal"
                className="p-2.5 rounded-full bg-ink text-paper transition-colors cursor-pointer select-none"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Project Title & Category */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 mb-6"
            >
              <span className="font-mono text-sm font-semibold text-ink-soft">{project.code} — {project.year}</span>
              <h2 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight text-ink mt-2">
                {project.title}
              </h2>
              <p className="text-base md:text-lg font-medium text-ink-soft mt-3">
                {project.category}
              </p>
            </motion.div>

            {/* Project Mockup Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.22, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden border border-ink/15 shadow-md my-8 group"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out gpu-accelerated"
              />
            </motion.div>

            {/* Project Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 py-6 border-y border-ink/15"
            >
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-ink-soft">Overview &amp; Architecture</h3>
              <p className="text-base md:text-xl font-medium leading-relaxed text-ink">
                {project.description}
              </p>
            </motion.div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-8 border-b border-ink/15 text-xs font-mono">
              <div>
                <span className="text-ink-soft block mb-1">DOMAIN</span>
                <span className="font-bold text-ink text-sm">{project.client}</span>
              </div>
              <div>
                <span className="text-ink-soft block mb-1">ROLE</span>
                <span className="font-bold text-ink text-sm">{project.role}</span>
              </div>
              <div>
                <span className="text-ink-soft block mb-1">YEAR</span>
                <span className="font-bold text-ink text-sm">{project.year}</span>
              </div>
            </div>

            {/* Key Deliverables */}
            <div className="py-8">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-ink-soft mb-4">Key Deliverables</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium">
                {project.deliverables?.map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05, duration: 0.4 }}
                    className="flex items-center gap-2 text-ink"
                  >
                    <Check size={16} className="text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-8 border-t border-ink/15 flex flex-wrap justify-between items-center gap-4">
            <span className="font-mono text-xs text-ink-soft">ANIRUTH REDDY®</span>
            <div className="flex items-center gap-3">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-3 rounded-full border border-ink/30 text-ink font-mono text-xs font-bold flex items-center gap-2 hover:bg-ink/5 transition-colors cursor-pointer select-none"
                >
                  <FaGithub size={15} />
                  <span>VIEW CODE</span>
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full bg-ink text-paper font-mono text-xs font-bold flex items-center gap-2 hover:bg-ink/80 transition-colors cursor-pointer select-none"
                >
                  <span>LIVE DEMO</span>
                  <ArrowUpRight size={16} />
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
