'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <footer
      ref={ref}
      style={{
        background: 'var(--ivory)',
        borderTop: '1px solid rgba(17,17,16,0.1)',
        paddingTop: '5rem',
      }}
    >
      {/* Big brand type */}
      <div
        style={{
          overflow: 'hidden',
          padding: '0 0 3rem',
          borderBottom: '1px solid rgba(17,17,16,0.1)',
        }}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="container"
        >
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(3.5rem, 10vw, 10rem)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              color: 'var(--fg)',
              lineHeight: 1.0,
            }}
            aria-label="Canada Cleaning"
          >
            Canada<br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Cleaning</span>
          </h2>
        </motion.div>
      </div>

      {/* Links grid */}
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: '3rem',
          padding: '3rem 2rem 4rem',
        }}
      >
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          style={{ gridColumn: 'span 1' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.875rem',
              color: 'var(--muted)',
              lineHeight: 1.65,
              maxWidth: '240px',
              marginBottom: '1.5rem',
            }}
          >
            Your home, immaculately clean — guaranteed. Serving Canada's major cities with care and precision.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { label: 'Facebook', short: 'FB' },
              { label: 'Instagram', short: 'IG' },
              { label: 'Twitter/X', short: 'X' },
            ].map((s) => (
              <a
                key={s.short}
                href="#"
                aria-label={s.label}
                style={{
                  width: '36px',
                  height: '36px',
                  border: '1px solid rgba(17,17,16,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: 'var(--muted)',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(17,17,16,0.15)';
                  e.currentTarget.style.color = 'var(--muted)';
                }}
              >
                {s.short}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--fg)',
              marginBottom: '1.25rem',
            }}
          >
            Services
          </h3>
          <nav aria-label="Services links">
            {['Residential Cleaning', 'Deep Cleaning', 'Move-In / Move-Out', 'Office & Commercial', 'Post-Construction', 'Recurring Plans'].map((s) => (
              <a
                key={s}
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.875rem',
                  color: 'var(--muted)',
                  marginBottom: '0.6rem',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--fg)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
              >
                {s}
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Cities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--fg)',
              marginBottom: '1.25rem',
            }}
          >
            Service Areas
          </h3>
          <nav aria-label="Service area links">
            {['Toronto, ON', 'Vancouver, BC', 'Calgary, AB', 'Montreal, QC', 'Ottawa, ON', 'Edmonton, AB'].map((c) => (
              <span
                key={c}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.875rem',
                  color: 'var(--muted)',
                  marginBottom: '0.6rem',
                }}
              >
                {c}
              </span>
            ))}
          </nav>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--fg)',
              marginBottom: '1.25rem',
            }}
          >
            Contact
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href="tel:+18005550199"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.5rem',
                fontWeight: 400,
                color: 'var(--fg)',
                letterSpacing: '-0.02em',
                transition: 'color 0.25s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg)'}
            >
              (800) 555-0199
            </a>
            <a
              href="mailto:hello@canadacleaning.ca"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.875rem',
                color: 'var(--muted)',
                transition: 'color 0.25s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--fg)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
            >
              hello@canadacleaning.ca
            </a>
            <div style={{ paddingTop: '0.5rem' }}>
              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  transition: 'gap 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.gap = '0.75rem'}
                onMouseLeave={(e) => e.currentTarget.style.gap = '0.4rem'}
              >
                Book a Clean →
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(17,17,16,0.08)',
          padding: '1.5rem 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.75rem',
              color: 'rgba(17,17,16,0.35)',
              letterSpacing: '0.04em',
            }}
          >
            © 2026 Canada Cleaning. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service'].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.75rem',
                  color: 'rgba(17,17,16,0.35)',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--fg)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(17,17,16,0.35)'}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
