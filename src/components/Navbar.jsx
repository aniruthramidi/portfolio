import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Menu, Clock } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  const logoMag = useMagnetic({ strength: 0.2 });
  const menuMag = useMagnetic({ strength: 0.35 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      setTimeStr(now.toLocaleTimeString('en-US', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { num: '01', label: 'OVERVIEW', href: '#top' },
    { num: '02', label: 'ABOUT', href: '#about' },
    { num: '03', label: 'WORK', href: '#work' },
    { num: '04', label: 'CAPABILITIES', href: '#services' },
    { num: '05', label: 'PHILOSOPHY', href: '#meaning' },
    { num: '06', label: 'PRINCIPLES', href: '#ideas' },
    { num: '07', label: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (href) => {
    setIsOpen(false);
    if (window.__lenis) {
      window.__lenis.scrollTo(href === '#top' ? 0 : href, {
        offset: 0,
        duration: 1.2,
      });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-5 md:px-12 md:py-7 pointer-events-none">
        {/* Brand Wordmark Left with Butter-Smooth Magnetic Spring */}
        <motion.a 
          style={{ x: logoMag.x, y: logoMag.y }}
          onMouseMove={logoMag.onMouseMove}
          onMouseLeave={logoMag.onMouseLeave}
          href="#top" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('#top'); }}
          className="pointer-events-auto text-lg md:text-xl font-extrabold tracking-tighter text-ink mix-blend-difference hover:opacity-75 transition-opacity inline-block select-none font-display"
        >
          ANIRUTH®
        </motion.a>

        {/* Menu Trigger Button with Butter-Smooth Magnetic Spring */}
        <motion.button
          style={{ x: menuMag.x, y: menuMag.y }}
          onMouseMove={menuMag.onMouseMove}
          onMouseLeave={menuMag.onMouseLeave}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          whileTap={{ scale: 0.92 }}
          className="pointer-events-auto p-3 rounded-full bg-ink text-paper mix-blend-difference hover:scale-105 active:scale-95 transition-transform duration-200 shadow-md flex items-center justify-center cursor-pointer select-none"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </header>

      {/* Navigation Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-ink/65 backdrop-blur-md flex justify-end"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform' }}
              className="w-full max-w-2xl h-full bg-ink text-paper flex flex-col justify-between p-8 md:p-14 overflow-y-auto gpu-accelerated shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Top Header */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-between items-center pb-8 border-b border-paper/15 text-xs font-mono tracking-widest text-paper-soft"
              >
                <span>ANIRUTH REDDY®</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                  AVAILABLE FOR ROLES
                </span>
              </motion.div>

              {/* Navigation Links */}
              <motion.nav 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.15,
                    },
                  },
                }}
                className="my-10 flex flex-col gap-3"
              >
                {navLinks.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(item.href); }}
                    variants={{
                      hidden: { opacity: 0, x: 35 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                      },
                    }}
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="group flex items-baseline gap-6 py-2 border-b border-paper/10 text-3xl md:text-5xl font-extrabold tracking-tight hover:text-paper-soft transition-colors cursor-pointer select-none font-display"
                  >
                    <span className="font-mono text-xs md:text-sm font-normal text-paper-soft group-hover:text-paper transition-colors">
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                    <ArrowUpRight className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-out" size={28} />
                  </motion.a>
                ))}
              </motion.nav>

              {/* Drawer Footer Info */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pt-8 border-t border-paper/15 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-xs text-paper-soft"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-mono text-paper font-semibold">
                    <Clock size={14} />
                    <span>{timeStr || 'HYDERABAD / IST'}</span>
                  </div>
                  <p>Full-Stack Engineering &amp; UI Architecture</p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40">Direct Contact</span>
                  <a href="mailto:aniruth.ramidi@gmail.com" className="text-paper hover:underline font-mono text-sm">
                    aniruth.ramidi@gmail.com
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
