'use client';
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

type BillingCycle = 'onetime' | 'recurring';

const plans = [
  {
    name: 'Standard Clean',
    tagline: 'Perfect for regular upkeep.',
    onetime: 150,
    recurring: 127,
    features: [
      'Dusting all surfaces',
      'Vacuuming & mopping floors',
      'Bathroom sanitization',
      'Kitchen countertops & sink',
    ],
    highlighted: false,
    cta: 'Book Standard',
  },
  {
    name: 'Deep Clean',
    tagline: 'Thorough top-to-bottom detail.',
    onetime: 250,
    recurring: 212,
    features: [
      'Everything in Standard',
      'Baseboards & doors',
      'Inside cabinets (empty)',
      'Interior window glass',
      'Heavy grime removal',
    ],
    highlighted: true,
    cta: 'Book Deep Clean',
    badge: 'Most Popular',
  },
  {
    name: 'Move-In / Out',
    tagline: 'Ready for the next chapter.',
    onetime: 350,
    recurring: 350,
    features: [
      'Everything in Deep Clean',
      'Inside fridge & oven',
      'Inside all cabinets',
      'Spot clean walls',
    ],
    highlighted: false,
    cta: 'Book Move Clean',
    note: 'One-time service',
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<BillingCycle>('recurring');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      id="pricing"
      ref={ref}
      className="section-padding"
      style={{ background: 'var(--ivory)' }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            marginBottom: 'clamp(3rem, 6vh, 5rem)',
          }}
        >
          <div>
            <div className="accent-line" />
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--fg)',
                lineHeight: 1.0,
              }}
            >
              Transparent pricing.
            </h2>
          </div>

          {/* Billing toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(17,17,16,0.06)',
              padding: '0.25rem',
            }}
            role="group"
            aria-label="Billing cycle"
          >
            {(['onetime', 'recurring'] as BillingCycle[]).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBilling(cycle)}
                aria-pressed={billing === cycle}
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '0.6rem 1.25rem',
                  background: billing === cycle ? 'var(--fg)' : 'transparent',
                  color: billing === cycle ? 'var(--ivory)' : 'var(--muted)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {cycle === 'onetime' ? 'One-Time' : 'Recurring — Save 15%'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1px',
            background: 'rgba(17,17,16,0.1)',
          }}
        >
          {plans.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              style={{
                background: plan.highlighted ? 'var(--fg)' : 'var(--cream)',
                padding: 'clamp(2rem, 4vw, 3rem)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'var(--accent)',
                    color: 'white',
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '0.35rem 0.7rem',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 400,
                  color: plan.highlighted ? 'rgba(245,242,238,0.9)' : 'var(--fg)',
                  letterSpacing: '-0.01em',
                  marginBottom: '0.25rem',
                }}
              >
                {plan.name}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.8125rem',
                  color: plan.highlighted ? 'rgba(245,242,238,0.45)' : 'var(--muted)',
                  marginBottom: '2rem',
                }}
              >
                {plan.tagline}
              </p>

              {/* Price */}
              <div style={{ marginBottom: '2rem' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={billing}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: '1.25rem',
                        color: plan.highlighted ? 'var(--accent)' : 'var(--muted)',
                      }}
                    >
                      CAD $
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                        fontWeight: 500,
                        color: plan.highlighted ? 'rgba(245,242,238,0.95)' : 'var(--fg)',
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {billing === 'onetime' ? plan.onetime : plan.recurring}
                    </span>
                  </motion.div>
                </AnimatePresence>
                {plan.note && billing === 'onetime' && (
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.7rem',
                      color: plan.highlighted ? 'rgba(245,242,238,0.35)' : 'var(--muted)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {plan.note}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  marginBottom: '2.5rem',
                  flex: 1,
                }}
              >
                {plan.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.875rem',
                      color: plan.highlighted ? 'rgba(245,242,238,0.65)' : 'var(--muted)',
                    }}
                  >
                    <span
                      style={{
                        width: '1rem',
                        height: '1px',
                        background: plan.highlighted ? 'var(--accent)' : 'rgba(17,17,16,0.3)',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '1rem',
                  border: plan.highlighted
                    ? '1px solid rgba(245,242,238,0.2)'
                    : '1px solid rgba(17,17,16,0.2)',
                  color: plan.highlighted ? 'rgba(245,242,238,0.9)' : 'var(--fg)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = plan.highlighted
                    ? 'rgba(245,242,238,0.1)' : 'var(--fg)';
                  e.currentTarget.style.color = plan.highlighted
                    ? 'white' : 'var(--ivory)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = plan.highlighted
                    ? 'rgba(245,242,238,0.9)' : 'var(--fg)';
                }}
              >
                {plan.cta}
              </a>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.8rem',
            color: 'var(--muted)',
            marginTop: '1.5rem',
            textAlign: 'center',
          }}
        >
          All prices in CAD. Custom quotes available for larger properties and commercial spaces.{' '}
          <a href="tel:+18005550199" style={{ color: 'var(--accent)' }}>Call (800) 555-0199</a>
        </motion.p>
      </div>
    </section>
  );
}
