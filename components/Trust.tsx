'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const credentials = [
  {
    number: '100%',
    label: 'Satisfaction Guarantee',
    description: 'Not completely happy? We return and re-clean within 24 hours — free of charge. No exceptions.',
  },
  {
    number: '✓',
    label: 'Insured & Bonded',
    description: 'Total financial protection for you and your property. Every visit, every time.',
  },
  {
    number: '✓',
    label: 'Background-Checked',
    description: 'Every team member passes rigorous interviews and criminal background checks before entering your home.',
  },
  {
    number: '✓',
    label: 'Eco-Friendly Products',
    description: 'Non-toxic, pet-safe, family-safe cleaning solutions. Better for your home, better for the planet.',
  },
];

export default function Trust() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ background: 'var(--ivory)' }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'start',
          }}
        >
          {/* Left — headline */}
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
                marginBottom: '1.5rem',
              }}
            >
              The Canada Cleaning standard.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.9375rem',
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: '360px',
                marginBottom: '2rem',
              }}
            >
              Inviting someone into your home requires absolute trust. We don't just clean — we care for your space as if it were our own.
            </p>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {[
                'Arrive on-time, every single time',
                'Transparent pricing, zero hidden fees',
                'Same team assigned to recurring clients',
                'Detailed post-clean report available',
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.875rem',
                    color: 'var(--muted)',
                  }}
                >
                  <span style={{
                    width: '1rem',
                    height: '1px',
                    background: 'var(--accent)',
                    flexShrink: 0,
                  }} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — credential grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1px',
              background: 'rgba(17,17,16,0.1)',
            }}
          >
            {credentials.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                style={{
                  background: 'var(--cream)',
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: c.number === '✓' ? '1.75rem' : 'clamp(1.75rem, 3vw, 2.5rem)',
                    fontWeight: 500,
                    color: 'var(--accent)',
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {c.number}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--fg)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {c.label}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.8rem',
                    color: 'var(--muted)',
                    lineHeight: 1.6,
                  }}
                >
                  {c.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
