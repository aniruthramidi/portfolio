import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

function TiltCard({ children, className = '' }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 220 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 220 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const letters = ['A', 'N', 'I', 'R', 'U', 'T', 'H'];

  return (
    <section id="top" aria-label="Hero Overview" className="relative min-h-screen bg-paper text-ink flex flex-col justify-between pt-28 md:pt-32 pb-12 px-6 md:px-12 grid-lines overflow-hidden">
      {/* Top Banner Tagline */}
      <div className="flex justify-between items-start pt-4 border-t border-ink/20 text-xs font-semibold tracking-wider text-ink-soft uppercase font-mono">
        <span>FULL-STACK DEVELOPER &amp; UI ARCHITECT</span>
        <span className="hidden sm:inline">STD / 24—26</span>
      </div>

      {/* Massive Typographic Hero Wordmark */}
      <div className="my-auto py-8">
        <div className="overflow-hidden flex items-baseline">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.04,
                  delayChildren: 0.25,
                },
              },
            }}
            className="hero-wordmark font-display font-extrabold flex select-none"
          >
            {letters.map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { y: '115%', opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
                  },
                }}
                whileHover={{ 
                  y: -14,
                  transition: { type: 'spring', stiffness: 450, damping: 15 }
                }}
                style={{ willChange: 'transform' }}
                className="inline-block cursor-default gpu-accelerated"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ 
              rotate: 360, 
              scale: 1.25,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
            }}
            transition={{ delay: 0.75, type: 'spring', damping: 18, stiffness: 180 }}
            className="text-2xl sm:text-5xl md:text-7xl font-extralight ml-2 align-top text-ink inline-block cursor-pointer select-none gpu-accelerated"
          >
            ®
          </motion.span>
        </div>

        {/* Editorial Content Grid & Atmospheric Accent Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-8">
          {/* Main Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="md:col-span-7"
          >
            <p className="text-lg md:text-2xl font-medium leading-tight text-ink-soft max-w-2xl">
              I build high-impact web applications, real-time audio graphs, and bespoke digital platforms—bridging rigorous full-stack engineering with butter-smooth interactive design.
            </p>
          </motion.div>

          {/* User's Gradient Editorial Accent Card with 3D Tilt */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 flex flex-col md:items-end"
          >
            <TiltCard className="w-full max-w-xs cursor-pointer">
              <div className="relative group overflow-hidden rounded-lg border border-ink/15 p-2 bg-paper/60 backdrop-blur-sm shadow-sm hover:shadow-lg transition-shadow duration-500">
                <div className="relative h-28 w-full overflow-hidden rounded">
                  <img 
                    src="/gradient-accent.jpg" 
                    alt="Aniruth Gradient Mesh" 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-ink/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
                </div>
                <div className="flex justify-between items-center mt-2 px-1 text-[11px] font-mono text-ink-soft">
                  <span>ENGINEERING LABS</span>
                  <span className="font-bold text-ink">©2026</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="flex justify-between items-center pt-6 border-t border-ink/20 text-xs font-mono">
        <div className="flex items-center gap-4 text-ink-soft">
          <span className="font-bold text-ink">01 / 07</span>
          <span className="hidden sm:inline">FULL-STACK &amp; UI SYSTEMS</span>
        </div>
        
        <a 
          href="#about" 
          onClick={(e) => {
            e.preventDefault();
            if (window.__lenis) {
              window.__lenis.scrollTo('#about', { duration: 1.2 });
            } else {
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 font-semibold hover:opacity-75 transition-opacity cursor-pointer group"
        >
          <span>EXPLORE PROFILE &amp; WORK</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: [0.45, 0, 0.55, 1] }}
          >
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
