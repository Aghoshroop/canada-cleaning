'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function AmbientBackground({
  color = 'rgba(15, 76, 58, 0.12)'
}: {
  color?: string;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Smooth spring physics for a luxurious, delayed follow effect
  const springConfig = { damping: 40, stiffness: 100, mass: 1 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    // Set initial position to center of the container
    if (containerRef.current) {
       const rect = containerRef.current.getBoundingClientRect();
       mouseX.set(rect.width / 2);
       mouseY.set(rect.height / 2);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Only track if the section is currently visible in the viewport
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Center the 800x800px orb on the cursor
  const x = useTransform(mouseX, (v) => v - 400);
  const y = useTransform(mouseY, (v) => v - 400);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '800px',
          height: '800px',
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          borderRadius: '50%',
          x,
          y,
          filter: 'blur(60px)',
          opacity: 0.8,
        }}
      />
    </div>
  );
}
