import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Hook providing butter-smooth magnetic attraction to mouse coordinates.
 * Gives interactive triggers (buttons, badges, icons) a tactile, premium physical feel.
 */
export function useMagnetic({ 
  strength = 0.35, 
  springConfig = { damping: 15, stiffness: 150, mass: 0.1 } 
} = {}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    x: springX,
    y: springY,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}

export default useMagnetic;
