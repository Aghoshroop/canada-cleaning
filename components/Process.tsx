'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    headline: 'Tell us what needs attention.',
    body: 'Book online in 60 seconds. Select your service, choose a date, share any specifics. No calls required.',
  },
  {
    number: '02',
    headline: 'We arrive prepared.',
    body: 'A vetted, fully-equipped professional arrives on time — every time. We bring everything needed.',
  },
  {
    number: '03',
    headline: 'We transform the space.',
    body: 'A thorough, methodical clean that goes beyond the surface. We care for your home as if it were our own.',
  },
  {
    number: '04',
    headline: 'You walk into the difference.',
    body: 'Come home to clarity. If anything falls short of perfect, let us know within 24 hours and we\'ll return — free.',
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      id="process"
      ref={ref}
      className="section-padding"
      style={{ background: 'var(--fg)', overflow: 'hidden' }}
    >
      <div className="container">
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
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--ivory)',
              lineHeight: 1.0,
            }}
          >
            Spotless in four steps.
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 * i,
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
              }}
              className={`
                flex flex-col 
                lg:border-r lg:border-white/10 
                lg:px-8
                ${i === 0 ? 'lg:pl-0' : ''}
                ${i === steps.length - 1 ? 'lg:border-r-0 lg:pr-0' : ''}
              `}
            >
              {/* Large number */}
              <div
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(4rem, 7vw, 7rem)',
                  fontWeight: 300,
                  color: 'rgba(245,242,238,0.12)',
                  lineHeight: 0.9,
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.04em',
                }}
                aria-hidden="true"
              >
                {step.number}
              </div>

              {/* Connector line */}
              <div
                style={{
                  width: '1.5rem',
                  height: '1px',
                  background: 'var(--accent)',
                  marginBottom: '1.25rem',
                }}
                aria-hidden="true"
              />

              <h3
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  fontWeight: 400,
                  color: 'rgba(245,242,238,0.95)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  marginBottom: '0.75rem',
                }}
              >
                {step.headline}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.875rem',
                  color: 'rgba(245,242,238,0.45)',
                  lineHeight: 1.7,
                }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
