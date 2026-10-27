import React from 'react';
import { motion } from 'framer-motion';

export default function Vision() {
  return (
    <section id="vision" aria-label="Vision" className="relative bg-paper text-ink py-24 overflow-hidden border-y border-ink/20">
      {/* Top Header */}
      <div className="px-6 md:px-12 flex justify-between items-start pb-8 border-b border-ink/20 text-xs font-mono tracking-widest text-ink-soft uppercase">
        <span>IDEOLOGY / VISION</span>
        <span>05 / 07</span>
      </div>

      {/* Kinetic Infinite Marquee */}
      <div className="py-12 bg-ink text-paper overflow-hidden select-none my-12">
        <div className="animate-marquee whitespace-nowrap flex gap-12 font-display text-5xl md:text-8xl font-extrabold tracking-tighter uppercase">
          <div className="flex items-center gap-12 shrink-0">
            <span>ANIRUTH REDDY — FULL-STACK CRAFT</span>
            <span>•</span>
            <span>BESPOKE DIGITAL SYSTEMS</span>
            <span>•</span>
            <span>HIGH-PERFORMANCE WEB ARCHITECTURE</span>
            <span>•</span>
          </div>
          <div className="flex items-center gap-12 shrink-0">
            <span>ANIRUTH REDDY — FULL-STACK CRAFT</span>
            <span>•</span>
            <span>BESPOKE DIGITAL SYSTEMS</span>
            <span>•</span>
            <span>HIGH-PERFORMANCE WEB ARCHITECTURE</span>
            <span>•</span>
          </div>
        </div>
      </div>

      {/* Editorial Content Block */}
      <div className="px-6 md:px-12 max-w-5xl mx-auto py-12">
        <motion.p
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="text-2xl md:text-4xl font-medium leading-tight text-ink tracking-tight"
        >
          Minimalism is not emptiness—it is the deliberate removal of the redundant so that clarity, velocity, and essential function can command the user's full focus.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="text-lg md:text-2xl font-normal text-ink-soft mt-8 leading-snug"
        >
          Every line of code, whether handling Web Audio frequency analysis, algorithmic risk management, or responsive UI components, must exist with intent and execute with uncompromising speed.
        </motion.p>
      </div>
    </section>
  );
}
