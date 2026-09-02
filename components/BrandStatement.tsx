'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const words = [
  'Cleaning', "isn't", 'the', 'final', 'step.', 
  "It's", 'the', 'first', 'step', 'toward',
  'feeling', 'at', 'home.'
];

export default function BrandStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section
      style={{
        background: 'var(--fg)',
        padding: 'clamp(5rem,12vh,10rem) 0',
        overflow: 'hidden',
      }}
      aria-label="Brand statement"
    >
      <div className="container">
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.25em 0.35em',
            maxWidth: '900px',
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: 'blur(12px)', y: 20 }}
              animate={inView ? {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
              } : {}}
              transition={{
                delay: 0.04 * i,
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
              }}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: word.includes('.') || word.includes("'") && i > 5
                  ? 'rgba(245,242,238,0.95)'
                  : 'rgba(245,242,238,0.55)',
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 1, ease: [0.19, 1, 0.22, 1] }}
          style={{
            transformOrigin: 'left',
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <div style={{ width: '3rem', height: '1px', background: 'var(--accent)' }} />
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.75rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(245,242,238,0.4)',
            }}
          >
            Canada Cleaning — Est. in the belief that your space matters
          </span>
        </motion.div>
      </div>
    </section>
  );
}
