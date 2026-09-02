'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const BEFORE = 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1400&auto=format&fit=crop';
const AFTER  = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop';

export default function Transformation() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Reveal the clean image by expanding its clip-path top-to-bottom
  const clipPathBottom = useTransform(
    scrollYProgress,
    [0.1, 0.7],
    ['0%', '100%']
  );
  const clipPath = useTransform(
    clipPathBottom,
    (v) => `inset(0 0 ${100 - parseFloat(v)}% 0)`
  );

  const beforeOpacity = useTransform(scrollYProgress, [0.0, 0.5], [1, 0.5]);
  const labelOpacity  = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);
  const afterLabelOp  = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{
        background: 'var(--mist)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Before and after transformation showcase"
    >
      <div className="container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          style={{ marginBottom: 'clamp(3rem, 5vh, 4rem)' }}
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
            The difference is visible.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.9375rem',
              color: 'var(--muted)',
              marginTop: '1rem',
              maxWidth: '440px',
              lineHeight: 1.65,
            }}
          >
            Scroll to witness the transformation. Our work speaks for itself — 
            before the intervention, and after.
          </p>
        </motion.div>

        {/* Transformation visual */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            maxHeight: '70vh',
            overflow: 'hidden',
          }}
        >
          {/* Before */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: beforeOpacity,
            }}
          >
            <Image
              src={BEFORE}
              alt="Living room before Canada Cleaning service"
              fill
              sizes="(max-width: 640px) 100vw, 90vw"
              style={{
                objectFit: 'cover',
                filter: 'saturate(0.65) brightness(0.88)',
              }}
            />
            {/* Grime overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(120,100,80,0.18)',
            }} />
            <motion.div
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                opacity: labelOpacity,
              }}
            >
              <span className="label" style={{
                background: 'rgba(17,17,16,0.6)',
                color: 'rgba(245,242,238,0.7)',
                padding: '0.4rem 0.8rem',
                backdropFilter: 'blur(6px)',
              }}>
                Before
              </span>
            </motion.div>
          </motion.div>

          {/* After — scroll-revealed from top */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath,
            }}
          >
            <Image
              src={AFTER}
              alt="Living room after Canada Cleaning service — pristine and bright"
              fill
              sizes="(max-width: 640px) 100vw, 90vw"
              style={{ objectFit: 'cover' }}
            />
            {/* Clean light overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(245,242,238,0.08) 0%, transparent 30%)',
            }} />
            <motion.div
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                opacity: afterLabelOp,
              }}
            >
              <span className="label" style={{
                background: 'rgba(192,57,43,0.8)',
                color: 'white',
                padding: '0.4rem 0.8rem',
              }}>
                After
              </span>
            </motion.div>
          </motion.div>

          {/* Horizontal scan line */}
          <motion.div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
              top: useTransform(clipPathBottom, (v) => `calc(${v} - 1px)`),
              zIndex: 10,
              boxShadow: '0 0 20px rgba(255,255,255,0.4)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* Bottom quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <div style={{ width: '2.5rem', height: '1px', background: 'var(--accent)', flexShrink: 0 }} />
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--fg)',
              letterSpacing: '-0.01em',
            }}
          >
            "The detail was incredible. It felt like moving into a brand new home."
          </p>
          <cite
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              fontStyle: 'normal',
              whiteSpace: 'nowrap',
            }}
          >
            — Sarah M., Toronto
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
}
