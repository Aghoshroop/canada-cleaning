'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const testimonials = [
  {
    quote:
      'Canada Cleaning completely transformed my house. The attention to detail was incredible. I\'ve signed up for their bi-weekly service and couldn\'t be happier.',
    name: 'Sarah M.',
    location: 'Toronto, ON',
    rating: 5,
  },
  {
    quote:
      'Punctual, professional, and thorough. I had them do a deep clean before hosting an event and the place was literally sparkling. This is what premium service looks like.',
    name: 'David L.',
    location: 'Vancouver, BC',
    rating: 5,
  },
  {
    quote:
      'Best cleaning service I\'ve ever used. The staff is friendly, they use great products, and the online booking is effortless. It saves me so much time every week.',
    name: 'Emily R.',
    location: 'Calgary, AB',
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const handleNext = () => setActive((p) => (p + 1) % testimonials.length);
  const handlePrev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ background: 'var(--fg)', overflow: 'hidden', position: 'relative' }}
    >
      {/* Giant quote mark decoration */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-2rem',
          left: '5%',
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(12rem, 20vw, 22rem)',
          fontWeight: 300,
          color: 'rgba(245,242,238,0.04)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        "
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 'clamp(3rem, 6vh, 5rem)' }}
        >
          <div className="accent-line" />
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 400,
              color: 'rgba(245,242,238,0.9)',
              letterSpacing: '-0.02em',
            }}
          >
            Loved by Canadian homes.
          </h2>
        </motion.div>

        {/* Quote */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            maxWidth: '820px',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
            >
              {/* Stars */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.2rem',
                  marginBottom: '2rem',
                }}
                aria-label={`${testimonials[active].rating} out of 5 stars`}
              >
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <span key={i} style={{ color: 'var(--accent)', fontSize: '0.9rem' }} aria-hidden="true">★</span>
                ))}
              </div>

              {/* Quote text */}
              <blockquote>
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
                    fontWeight: 400,
                    color: 'rgba(245,242,238,0.9)',
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                    fontStyle: 'italic',
                    marginBottom: '2.5rem',
                  }}
                >
                  "{testimonials[active].quote}"
                </p>

                {/* Attribution */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      color: 'white',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {testimonials[active].name[0]}
                  </div>
                  <div>
                    <cite
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'rgba(245,242,238,0.9)',
                        fontStyle: 'normal',
                        display: 'block',
                      }}
                    >
                      {testimonials[active].name}
                    </cite>
                    <span
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: '0.75rem',
                        color: 'rgba(245,242,238,0.4)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {testimonials[active].location}
                    </span>
                  </div>
                </div>
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '4rem',
          }}
        >
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            style={{
              width: '44px',
              height: '44px',
              border: '1px solid rgba(245,242,238,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(245,242,238,0.6)',
              fontSize: '1.1rem',
              transition: 'all 0.3s',
              cursor: 'pointer',
              background: 'none',
              borderRadius: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(245,242,238,0.2)';
              e.currentTarget.style.color = 'rgba(245,242,238,0.6)';
            }}
          >
            ←
          </button>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '0.5rem' }} role="tablist" aria-label="Testimonials">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={active === i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                style={{
                  width: active === i ? '2rem' : '0.5rem',
                  height: '2px',
                  background: active === i ? 'var(--accent)' : 'rgba(245,242,238,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.4s cubic-bezier(0.19,1,0.22,1)',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            style={{
              width: '44px',
              height: '44px',
              border: '1px solid rgba(245,242,238,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(245,242,238,0.6)',
              fontSize: '1.1rem',
              transition: 'all 0.3s',
              cursor: 'pointer',
              background: 'none',
              borderRadius: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(245,242,238,0.2)';
              e.currentTarget.style.color = 'rgba(245,242,238,0.6)';
            }}
          >
            →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
