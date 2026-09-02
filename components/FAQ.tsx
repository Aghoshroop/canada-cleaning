'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const faqs = [
  {
    q: 'Do I need to provide cleaning supplies?',
    a: 'No — our professionals arrive fully equipped with premium, eco-friendly cleaning supplies and equipment. If you have specific products you prefer, just let us know and we\'ll use yours instead.',
  },
  {
    q: 'Are your cleaners insured and bonded?',
    a: 'Absolutely. Every team member is thoroughly vetted, background-checked, and fully insured and bonded. You can trust the people we send into your home.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'We understand that plans change. You can cancel or reschedule for free up to 24 hours before your scheduled appointment. No fees, no friction.',
  },
  {
    q: 'Do I need to be home during the cleaning?',
    a: "It's entirely up to you. Many clients provide a key or entry code so they can return to a spotless home after work. We keep your access information completely secure.",
  },
  {
    q: 'What about my pets?',
    a: "We love pets. Just let us know in advance so we can assign a pet-friendly cleaner and ensure they're comfortable during our visit. We use non-toxic, pet-safe products.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      id="faq"
      ref={ref}
      className="section-padding"
      style={{ background: 'var(--mist)' }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start">
          {/* Left — header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="md:sticky md:top-28"
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
              Common questions.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.9375rem',
                color: 'var(--muted)',
                lineHeight: 1.65,
                maxWidth: '320px',
              }}
            >
              Still have questions? Call us at{' '}
              <a href="tel:+18005550199" style={{ color: 'var(--accent)', fontWeight: 500 }}>
                (800) 555-0199
              </a>
              {' '}or email{' '}
              <a href="mailto:hello@canadacleaning.ca" style={{ color: 'var(--accent)', fontWeight: 500 }}>
                hello@canadacleaning.ca
              </a>
            </p>
          </motion.div>

          {/* Right — accordion */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {faqs.map((faq, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                style={{
                  borderBottom: '1px solid rgba(17,17,16,0.1)',
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '1.5rem 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                      fontWeight: 400,
                      color: open === i ? 'var(--fg)' : 'rgba(17,17,16,0.7)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                      transition: 'color 0.3s',
                    }}
                  >
                    {faq.q}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '1.1rem',
                      color: open === i ? 'var(--accent)' : 'var(--muted)',
                      transform: open === i ? 'rotate(45deg)' : 'none',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                      marginTop: '0.1rem',
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-dm-sans)',
                          fontSize: '0.9rem',
                          color: 'var(--muted)',
                          lineHeight: 1.7,
                          paddingBottom: '1.5rem',
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
