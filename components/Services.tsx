'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    id: 'residential',
    number: '01',
    name: 'Residential Cleaning',
    tagline: 'Your home, consistently spotless.',
    description:
      'Regular maintenance cleaning that keeps your home fresh and immaculate. Schedule weekly, bi-weekly, or monthly — and stop spending your weekends scrubbing.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    alt: 'Pristine residential living room after cleaning',
  },
  {
    id: 'deep',
    number: '02',
    name: 'Deep Cleaning',
    tagline: 'Top-to-bottom, every detail.',
    description:
      'A thorough intervention targeting neglected areas, built-up grime, and hard-to-reach places. Baseboards, cabinets, interior windows — nothing is missed.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200&auto=format&fit=crop',
    alt: 'Spotlessly clean kitchen after deep cleaning service',
  },
  {
    id: 'moveinout',
    number: '03',
    name: 'Move-In / Move-Out',
    tagline: 'A perfect start to your next chapter.',
    description:
      'Impress landlords and welcome new beginnings. Inside fridge, oven, all cabinets, spot-cleaned walls — everything sanitized and ready.',
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1200&auto=format&fit=crop',
    alt: 'Empty clean apartment ready for new tenant',
  },
  {
    id: 'commercial',
    number: '04',
    name: 'Office & Commercial',
    tagline: 'Spaces that reflect your standards.',
    description:
      'Professional cleaning for workspaces that boosts employee productivity and creates the right impression for visiting clients and partners.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    alt: 'Clean modern office space',
  },
  {
    id: 'postconstruction',
    number: '05',
    name: 'Post-Construction',
    tagline: 'Reveal the beauty of your renovation.',
    description:
      'Remove fine drywall dust, construction debris, and adhesive residue to reveal the true quality of your newly renovated space.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200&auto=format&fit=crop',
    alt: 'Clean newly renovated space post-construction',
  },
  {
    id: 'recurring',
    number: '06',
    name: 'Recurring Plans',
    tagline: 'Set it, forget it, love it.',
    description:
      'Subscribe to weekly or bi-weekly service and save 15%. Automated scheduling means you always come home to an immaculate space — without the mental load.',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1200&auto=format&fit=crop',
    alt: 'Consistently clean and organized home',
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      id="services"
      ref={ref}
      className="section-padding"
      style={{ background: 'var(--cream)', position: 'relative' }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vh, 5rem)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="accent-line" />
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--fg)',
                lineHeight: 1.0,
                maxWidth: '600px',
              }}
            >
              A service for every space.
            </h2>
          </motion.div>
        </div>

        {/* Desktop: side-by-side | Mobile: vertical stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Service list */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {services.map((svc, i) => (
              <motion.button
                key={svc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.25rem',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid rgba(17,17,16,0.08)',
                  textAlign: 'left',
                  transition: 'all 0.35s ease',
                  background: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                aria-selected={active === i}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: active === i ? 'var(--accent)' : 'var(--muted)',
                    paddingTop: '0.2rem',
                    minWidth: '2rem',
                    transition: 'color 0.3s',
                  }}
                >
                  {svc.number}
                </span>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: active === i ? 'clamp(1.5rem, 2.5vw, 2.2rem)' : 'clamp(1.2rem, 2vw, 1.8rem)',
                      fontWeight: 400,
                      color: active === i ? 'var(--fg)' : 'rgba(17,17,16,0.4)',
                      letterSpacing: '-0.01em',
                      transition: 'all 0.4s ease',
                      lineHeight: 1.1,
                    }}
                  >
                    {svc.name}
                  </h3>
                  <AnimatePresence>
                    {active === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '0.6rem' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                        style={{
                          fontFamily: 'var(--font-dm-sans)',
                          fontSize: '0.875rem',
                          color: 'var(--muted)',
                          lineHeight: 1.65,
                          overflow: 'hidden',
                        }}
                      >
                        {svc.description}
                        {' '}
                        <a
                          href="#cta"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          style={{
                            color: 'var(--accent)',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            marginTop: '0.5rem',
                          }}
                        >
                          Get a quote →
                        </a>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                {/* Active indicator */}
                <div
                  style={{
                    width: '2px',
                    alignSelf: 'stretch',
                    background: active === i ? 'var(--accent)' : 'transparent',
                    transition: 'background 0.3s',
                    marginLeft: 'auto',
                  }}
                />
              </motion.button>
            ))}
          </div>

          {/* Image showcase */}
          <div
            style={{
              position: 'sticky',
              top: '6rem',
              aspectRatio: '4/5',
              overflow: 'hidden',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                style={{ position: 'relative', width: '100%', height: '100%' }}
              >
                <Image
                  src={services[active].image}
                  alt={services[active].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
                {/* Number watermark */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    right: '1.5rem',
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '5rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.15)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                >
                  {services[active].number}
                </div>
                {/* Service label */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    left: '1.5rem',
                    background: 'rgba(17,17,16,0.7)',
                    backdropFilter: 'blur(6px)',
                    padding: '0.5rem 1rem',
                  }}
                >
                  <span className="label" style={{ color: 'rgba(245,242,238,0.8)' }}>
                    {services[active].tagline}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
