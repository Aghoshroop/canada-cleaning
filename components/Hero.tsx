'use client';
import { useRef, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const BEFORE_IMG = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1400&auto=format&fit=crop';
const AFTER_IMG  = 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1400&auto=format&fit=crop';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wipeX, setWipeX] = useState(50); // 0–100 %
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Desktop: cursor-driven wipe
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setWipeX(Math.max(5, Math.min(95, pct)));
  }, [isMobile]);

  // Mobile: scroll-driven wipe
  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      const scrollPct = (window.scrollY / (window.innerHeight * 0.8)) * 100;
      setWipeX(Math.max(5, Math.min(95, scrollPct)));
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Touch drag for wipe panel on mobile
  const handleTouchStart = () => { isDragging.current = true; };
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setWipeX(Math.max(5, Math.min(95, pct)));
  }, []);
  const handleTouchEnd = () => { isDragging.current = false; };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.12,
        duration: 0.9,
        ease: [0.19, 1, 0.22, 1] as const,
      },
    }),
  };

  const parallaxY = isMobile ? 0 : scrollY * 0.15;

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: 'var(--ivory)',
        display: 'grid',
        gridTemplateColumns: '1fr',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '55% 45%',
          minHeight: '100vh',
          alignItems: 'stretch',
        }}
      >
        {/* LEFT — Text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isMobile
              ? '7rem 1.5rem 4rem'
              : 'clamp(5rem,10vh,8rem) clamp(2rem,5vw,6rem)',
            paddingLeft: isMobile ? '1.5rem' : 'clamp(2rem,7vw,8rem)',
          }}
        >
          {/* Eyebrow */}
          <motion.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ display: 'inline-block', width: '1.5rem', height: '1px', background: 'var(--accent)' }} />
              Canada's Premium Cleaning Service
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.75rem, 12vw, 7rem)',
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: 'var(--fg)',
              marginTop: '1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            Clean<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>changes</em><br />
            everything.
          </motion.h1>

          {/* Sub */}
          <motion.p
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
              color: 'var(--muted)',
              maxWidth: '380px',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
            }}
          >
            Vetted, insured professionals who care for your space as deeply as you do. 
            Serving Toronto, Vancouver, Calgary and beyond.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}
          >
            <a
              href="#cta"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hero-primary-cta"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '1rem 2.5rem',
                background: 'var(--fg)',
                color: 'var(--bg)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background 0.3s, color 0.3s, transform 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--fg)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              Get a Free Quote
              <span style={{ transition: 'transform 0.3s' }}>→</span>
            </a>
            <a
              href="tel:+18005550199"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                padding: '1rem 2rem',
                border: '1px solid rgba(17,17,16,0.2)',
                color: 'var(--fg)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'border-color 0.3s, color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--fg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(17,17,16,0.2)';
              }}
            >
              (800) 555-0199
            </a>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(17,17,16,0.1)',
            }}
          >
            {[
              { value: '4.9★', label: 'from 1,240 reviews' },
              { value: 'Insured', label: '& bonded' },
              { value: 'Eco', label: 'friendly products' },
            ].map((item) => (
              <div key={item.value} style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                <span style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: 'var(--fg)',
                }}>
                  {item.value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Wipe Interaction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            overflow: 'hidden',
            cursor: isMobile ? 'default' : 'none',
            minHeight: isMobile ? '50vh' : 'auto',
            userSelect: 'none',
          }}
          aria-label="Before and after cleaning comparison - move cursor to reveal"
          role="img"
        >
          {/* AFTER image (base) */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translateY(${parallaxY}px) scale(1.08)`,
                transformOrigin: 'center top',
              }}
            >
              <Image
                src={AFTER_IMG}
                alt="Spotlessly clean kitchen after Canada Cleaning service"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
              />
              {/* Clean overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(245,242,238,0.08) 0%, transparent 40%)',
              }} />
            </div>
          </div>

          {/* BEFORE image (masked) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `inset(0 ${100 - wipeX}% 0 0)`,
              transition: isDragging.current ? 'none' : 'clip-path 0.05s',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translateY(${parallaxY}px) scale(1.08)`,
                transformOrigin: 'center top',
              }}
            >
              <Image
                src={BEFORE_IMG}
                alt="Kitchen before professional cleaning"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  filter: 'saturate(0.6) brightness(0.85)',
                }}
                priority
              />
              {/* Haze overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(180,170,160,0.25)',
              }} />
            </div>
          </div>

          {/* Wipe divider line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${wipeX}%`,
              width: '2px',
              background: 'rgba(255,255,255,0.9)',
              transform: 'translateX(-50%)',
              zIndex: 10,
              transition: 'left 0.05s',
              boxShadow: '0 0 20px rgba(0,0,0,0.2)',
            }}
          >
            {/* Handle dot */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '36px',
              height: '36px',
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              color: 'var(--fg)',
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              whiteSpace: 'nowrap',
              gap: '2px',
            }}>
              ↔
            </div>
          </div>

          {/* Labels */}
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '1.25rem',
            zIndex: 11,
            opacity: wipeX < 20 ? 0 : 1,
            transition: 'opacity 0.3s',
          }}>
            <span className="label" style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.4)', padding: '0.3rem 0.6rem' }}>
              Before
            </span>
          </div>
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            right: '1.25rem',
            zIndex: 11,
            opacity: wipeX > 80 ? 0 : 1,
            transition: 'opacity 0.3s',
          }}>
            <span className="label" style={{ color: 'rgba(255,255,255,0.9)', background: 'rgba(15,76,58,0.7)', padding: '0.3rem 0.6rem' }}>
              After
            </span>
          </div>

          {/* Instruction hint */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 11,
              }}
            >
              <span style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.8)',
                background: 'rgba(0,0,0,0.35)',
                padding: '0.4rem 0.9rem',
                backdropFilter: 'blur(4px)',
              }}>
                Move cursor to reveal
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: isMobile ? 0.6 : 1,
        }}
        aria-hidden="true"
      >
        <span className="label" style={{ color: 'var(--muted)' }}>Scroll</span>
        <div style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </motion.div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
      `}</style>
    </section>
  );
}
