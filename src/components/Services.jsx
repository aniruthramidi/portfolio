import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';

export default function Services() {
  const [activeImage, setActiveImage] = useState(null);

  // High-framerate zero-rerender spring physics for cursor follower
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 220, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX + 24);
      mouseY.set(e.clientY - 95);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="services" aria-label="Capabilities" className="relative bg-paper text-ink py-24 px-6 md:px-12 grid-lines">
      {/* Section Header */}
      <div className="flex justify-between items-start pb-8 border-b border-ink/20 text-xs font-mono tracking-widest text-ink-soft uppercase">
        <span>CORE CAPABILITIES</span>
        <span>04 / 07</span>
      </div>

      {/* Main Title */}
      <div className="py-12">
        <h2 className="section-wordmark font-display font-extrabold text-ink">
          CAPABILITIES
        </h2>
        <div className="flex items-center gap-4 text-base md:text-xl font-medium text-ink-soft mt-2">
          <span>we architect systems</span>
          <span className="w-12 h-[1px] bg-ink/30" />
          <span>we build for raw speed.</span>
        </div>
      </div>

      {/* Services List */}
      <div className="border-t border-ink/30 my-8">
        {services.map((item, idx) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ x: 8 }}
            style={{ willChange: 'transform' }}
            onMouseEnter={() => setActiveImage(item.image)}
            onMouseLeave={() => setActiveImage(null)}
            className="group relative border-b border-ink/20 py-8 md:py-12 px-2 md:px-4 flex flex-col md:flex-row md:items-center justify-between transition-colors duration-400 hover:bg-ink/5 cursor-pointer gpu-accelerated select-none"
          >
            <div className="flex items-baseline gap-6 md:gap-12">
              <span className="font-mono text-sm md:text-xl font-semibold text-ink-soft group-hover:text-ink transition-colors duration-300">
                {item.num}
              </span>
              <h3 className="text-3xl md:text-6xl font-extrabold font-display tracking-tight text-ink group-hover:translate-x-1 transition-transform duration-300">
                {item.title}
              </h3>
            </div>

            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <p className="text-sm md:text-xl font-medium text-ink-soft max-w-md group-hover:text-ink transition-colors duration-300">
                {item.desc}
              </p>
              <div className="hidden md:flex p-2 rounded-full border border-ink/0 group-hover:border-ink/20 transition-all duration-300 shrink-0">
                <ArrowUpRight 
                  size={22} 
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out" 
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Image Cursor Follower */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="fixed top-0 left-0 pointer-events-none z-30 hidden md:block w-72 h-48 rounded-lg overflow-hidden border border-paper shadow-2xl gpu-accelerated"
            style={{
              x: smoothX,
              y: smoothY,
              willChange: 'transform',
            }}
          >
            <img
              src={activeImage}
              alt="Service Preview"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
