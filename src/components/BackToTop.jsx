import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const magnetic = useMagnetic({ strength: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          style={{ x: magnetic.x, y: magnetic.y }}
          onMouseMove={magnetic.onMouseMove}
          onMouseLeave={magnetic.onMouseLeave}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40"
        >
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Scroll back to top"
            className="group flex items-center gap-2 px-4 py-3 rounded-full bg-ink text-paper border border-paper/20 shadow-xl cursor-pointer select-none font-mono text-xs font-bold tracking-wider"
          >
            <span>TOP</span>
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
