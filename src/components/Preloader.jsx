import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800; // 1.8 seconds preloader
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(Math.floor((step / steps) * 100), 100);
      setProgress(currentProgress);

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 200); // Smooth exit delay
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="preloader-overlay"
      exit={{
        opacity: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
      }}
    >
      {/* Sliding curtain panels */}
      <motion.div
        className="preloader-panel-top"
        exit={{ y: '-100%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="preloader-panel-bottom"
        exit={{ y: '100%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="preloader-content"
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="preloader-logo"
        >
          AR<span className="logo-dot">.</span>
        </motion.div>

        <div className="preloader-progress-wrap">
          <div className="preloader-progress-bar">
            <motion.div
              className="preloader-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="preloader-percentage">{progress}%</span>
        </div>

        <motion.div
          className="preloader-subtext"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Loading digital experience...
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
