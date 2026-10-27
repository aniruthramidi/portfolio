import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const duration = 1400; // ms
    let startTime = null;
    let rafId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Butter-smooth cubic progression curve
      const easedProgress = Math.min(1, 1 - Math.pow(1 - progress, 3));
      const currentCount = Math.floor(easedProgress * 100);

      setCount(currentCount);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(100);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 200);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            y: '-100%', 
            transition: { 
              duration: 0.85, 
              ease: [0.76, 0, 0.24, 1] 
            } 
          }}
          style={{ willChange: 'transform' }}
          className="fixed inset-0 z-[100] bg-paper text-ink flex flex-col justify-between p-6 md:p-12 font-sans select-none gpu-accelerated"
        >
          {/* Top Line */}
          <div className="flex justify-between items-center text-xs font-bold tracking-wider text-ink-soft">
            <span>ANIRUTH REDDY®</span>
            <span>2024 — 2026</span>
          </div>

          {/* Center Expanding Line */}
          <div className="relative w-full h-[1px] bg-ink/15 my-auto overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-ink will-change-transform"
              style={{ width: `${count}%` }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Bottom Counter */}
          <div className="flex justify-between items-end">
            <div className="text-sm font-medium text-ink-soft">
              <span>FULL-STACK &amp; UI SYSTEMS ARCHITECTURE</span>
            </div>
            <div className="font-mono text-3xl md:text-5xl font-bold tracking-tighter tabular-nums">
              {String(count).padStart(3, '0')}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
