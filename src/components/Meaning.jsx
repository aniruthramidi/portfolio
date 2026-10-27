import React from 'react';
import { motion } from 'framer-motion';

export default function Meaning() {
  return (
    <section id="meaning" aria-label="The Philosophy" className="relative min-h-screen bg-paper text-ink overflow-hidden py-24 flex flex-col justify-between px-6 md:px-12 grid-lines">
      {/* Top Header */}
      <div className="flex justify-between items-start pb-8 border-b border-ink/20 text-xs font-mono tracking-widest text-ink-soft uppercase">
        <span>THE PHILOSOPHY</span>
        <span>05 / 07</span>
      </div>

      {/* Main Image Frame Container with Butter-Smooth Ambient Motion */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: 'transform' }}
        className="relative my-auto w-full max-w-6xl mx-auto h-[65vh] rounded-2xl overflow-hidden border border-ink/20 shadow-2xl group gpu-accelerated select-none"
      >
        <img
          src="/gradient-accent.jpg"
          alt="Philosophy Aesthetic Mesh"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] gpu-accelerated"
        />
        <div className="absolute inset-0 bg-ink/45 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-35" />

        {/* Overlay Giant Heading */}
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between text-paper">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="text-4xl sm:text-7xl md:text-9xl font-extrabold font-display tracking-tight"
          >
            THE PHILOSOPHY
          </motion.h2>

          {/* Floating Editorial Quotes with Staggered Entrance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs md:text-sm text-paper-soft border-t border-paper/20 pt-6">
            {[
              { num: '01 / CRAFT', text: 'code as an intentional craft' },
              { num: '02 / SYSTEMS', text: 'modular architecture with reasoning' },
              { num: '03 / INTERACTION', text: 'delight in every micro-motion' }
            ].map((col, i) => (
              <motion.div
                key={col.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="transition-colors hover:text-paper cursor-default"
              >
                <span className="text-paper font-bold block mb-1">{col.num}</span>
                <p>{col.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-ink/20 flex justify-between items-center text-xs font-mono text-ink-soft">
        <span>ANIRUTH REDDY® PHILOSOPHY</span>
        <span>©2026</span>
      </div>
    </section>
  );
}
