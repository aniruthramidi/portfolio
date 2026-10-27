import React from 'react';
import { motion } from 'framer-motion';

export default function Studio() {
  return (
    <section id="about" aria-label="About and Manifesto" className="relative bg-ink text-paper py-28 px-6 md:px-12 grid-lines-dark overflow-hidden">
      {/* Section Header */}
      <div className="flex justify-between items-start pb-8 border-b border-paper/15 text-xs font-mono tracking-widest text-paper-soft uppercase">
        <span>ABOUT / PROFILE</span>
        <span>02 / 07</span>
      </div>

      <div className="max-w-7xl mx-auto py-16 md:py-24">
        {/* Title with Butter-Smooth Reveal */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-16 overflow-hidden">
          <motion.h2 
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform' }}
            className="section-wordmark font-display font-bold text-paper gpu-accelerated"
          >
            Profile
          </motion.h2>
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-2xl md:text-5xl font-extralight text-paper-soft mt-2 md:mt-0"
          >
            ©-2026
          </motion.span>
        </div>

        {/* Expanding Accent Line */}
        <div className="w-full h-[1px] bg-paper/10 mb-16 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'width' }}
            className="h-full bg-paper/30"
          />
        </div>

        {/* Quotation & Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Quote Mark Icon Left with Kinetic Spring Hover */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.15, rotate: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="lg:col-span-2 text-paper-soft hover:text-paper transition-colors cursor-pointer select-none gpu-accelerated"
          >
            <svg viewBox="0 0 500 384" className="w-16 h-16 md:w-24 md:h-24 fill-current">
              <path d="M2.94434 384L2.10192 275.233C1.85966 243.954 7.47265 211.385 18.9409 177.526C30.7618 143.31 46.8633 111.015 67.2452 80.6424C87.9799 49.9115 111.24 23.9598 137.025 2.7874L227.048 60.2093C206.322 92.0066 188.983 125.2 175.032 159.788C161.434 194.018 154.972 231.748 155.647 272.977L156.498 382.811L2.94434 384ZM273.262 381.906L272.42 273.139C272.178 241.86 277.791 209.291 289.259 175.433C301.08 141.216 317.181 108.921 337.563 78.5487C358.298 47.8178 381.558 21.8662 407.343 0.693746L497.366 58.1157C476.64 89.9129 459.301 123.106 445.35 157.694C431.752 191.925 425.29 229.654 425.965 270.884L426.816 380.717L273.262 381.906Z" />
            </svg>
          </motion.div>

          {/* Core Manifesto Text */}
          <div className="lg:col-span-10 flex flex-col gap-10">
            <motion.p 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="text-2xl sm:text-3xl md:text-5xl font-medium leading-tight text-paper tracking-tight"
            >
              In software engineering, the real craft isn't adding unnecessary layers—it's distilling complex systems until only speed, clarity, and intuitive interaction remain.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="text-xl sm:text-2xl md:text-4xl font-normal leading-snug text-paper-soft tracking-tight"
            >
              —eliminating friction between users and applications. Currently interning at <strong className="text-paper">3Skill</strong> building end-to-end features with React and Node.js, and leading digital community ops at <strong className="text-paper">Strikers</strong>.
            </motion.p>

            {/* Quick Experience & Value Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-paper/15 font-mono text-xs">
              <div>
                <span className="text-paper font-bold block mb-1">CURRENT ROLE</span>
                <p className="text-paper-soft">Full Stack Intern @ 3Skill</p>
                <p className="text-paper-soft text-[11px] mt-0.5">Jun 2026 – Present</p>
              </div>
              <div>
                <span className="text-paper font-bold block mb-1">CORE STACK</span>
                <p className="text-paper-soft">React, Node.js, Express, MongoDB</p>
                <p className="text-paper-soft text-[11px] mt-0.5">Python, Web Audio API, Canvas</p>
              </div>
              <div>
                <span className="text-paper font-bold block mb-1">SPECIALIZATION</span>
                <p className="text-paper-soft">High-Performance Web Systems</p>
                <p className="text-paper-soft text-[11px] mt-0.5">Butter-Smooth Motion &amp; Ergonomics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
