import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import SkipToContent from './components/SkipToContent';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Studio from './components/Studio';
import Work from './components/Work';
import Services from './components/Services';
import Meaning from './components/Meaning';
import Vision from './components/Vision';
import Ideas from './components/Ideas';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';
import './index.css';

export default function App() {
  useEffect(() => {
    // Initialize Lenis with calibrated butter-smooth inertia physics
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    // Expose lenis instance globally for smooth programmatic navigation
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <div className="relative bg-paper text-ink selection:bg-ink selection:text-paper font-sans">
      {/* Accessibility Skip Link */}
      <SkipToContent />

      {/* Interactive Kinetic Preloader Screen */}
      <Preloader />

      {/* Fixed Navbar & Menu Drawer */}
      <Navbar />

      {/* Main Page Sections */}
      <main id="main-content" tabIndex={-1} className="relative z-10 outline-none">
        <Hero />
        <Studio />
        <Work />
        <Services />
        <Meaning />
        <Vision />
        <Ideas />
        <Contact />
      </main>

      {/* Butter-Smooth Scroll To Top */}
      <BackToTop />
    </div>
  );
}
