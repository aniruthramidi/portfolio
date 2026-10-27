import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Ideas() {
  const [activeTab, setActiveTab] = useState(0);

  const quotes = [
    {
      id: '01',
      title: 'systems over patchwork',
      quote: 'Great software starts with unified architecture, not a patchwork of quick hacks.'
    },
    {
      id: '02',
      title: 'performance is a feature',
      quote: 'Fluid 60 FPS transitions, zero unnecessary re-renders, and instant response turn an app into a second skin.'
    },
    {
      id: '03',
      title: 'precision meets intent',
      quote: 'When engineering precision meets aesthetic intent, the friction between human and machine completely disappears.'
    },
    {
      id: '04',
      title: 'build for real impact',
      quote: 'True technical excellence is measured by how effectively your code solves real user problems and unlocks human capability.'
    }
  ];

  return (
    <section id="ideas" aria-label="Ideas" className="relative bg-ink text-paper py-28 px-6 md:px-12 grid-lines-dark">
      {/* Top Header */}
      <div className="flex justify-between items-start pb-8 border-b border-paper/15 text-xs font-mono tracking-widest text-paper-soft uppercase">
        <span>IDEAS &amp; PRINCIPLES</span>
        <span className="tabular-nums font-bold text-paper">0{activeTab + 1} / 04</span>
      </div>

      <div className="max-w-6xl mx-auto py-16">
        {/* Tab Selection with Butter-Smooth Gliding Spring Indicator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 border-b border-paper/15 pb-6">
          {quotes.map((item, index) => {
            const isActive = activeTab === index;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`relative text-left p-3.5 rounded-lg font-mono text-xs md:text-sm transition-colors cursor-pointer select-none ${
                  isActive ? 'text-ink font-bold' : 'text-paper-soft hover:text-paper'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePrincipleTabPill"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute inset-0 bg-paper rounded-lg -z-10 shadow-md gpu-accelerated"
                  />
                )}
                <span className="relative z-10">{item.id}. </span>
                <span className="relative z-10 capitalize">{item.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Display Quote with Butter-Smooth Crossfade */}
        <div className="min-h-[220px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity, filter' }}
              className="flex flex-col gap-6"
            >
              <span className="font-mono text-xs text-paper-soft tracking-widest uppercase">
                ENGINEERING PRINCIPLE // {quotes[activeTab].id}
              </span>
              <p className="text-3xl md:text-6xl font-medium leading-tight text-paper font-display tracking-tight">
                "{quotes[activeTab].quote}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
