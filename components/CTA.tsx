'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import AmbientBackground from './AmbientBackground';

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="cta"
      ref={ref}
      style={{
        background: 'var(--fg)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(5rem, 12vh, 9rem)',
        paddingBottom: 'clamp(5rem, 12vh, 9rem)',
      }}
    >
      <AmbientBackground color="rgba(15, 76, 58, 0.2)" />
      {/* Background text decoration */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-5rem',
          right: '-2rem',
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(12rem, 22vw, 24rem)',
          fontWeight: 700,
          color: 'rgba(245,242,238,0.03)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Clean.
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="accent-line" />
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: 'rgba(245,242,238,0.95)',
                lineHeight: 1.0,
                marginBottom: '1.5rem',
              }}
            >
              Ready for a space<br />
              that feels<br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>different?</em>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.9375rem',
                color: 'rgba(245,242,238,0.45)',
                lineHeight: 1.7,
                maxWidth: '380px',
                marginBottom: '2.5rem',
              }}
            >
              Book your first clean today. No credit card required.
              Response within one business hour.
            </p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {[
                { v: '4.9★', l: '1,240 reviews' },
                { v: 'Free', l: 'estimate' },
                { v: '<1hr', l: 'response time' },
              ].map((s) => (
                <div key={s.v} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '1.4rem',
                      fontWeight: 500,
                      color: 'rgba(245,242,238,0.8)',
                    }}
                  >
                    {s.v}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(245,242,238,0.3)',
                    }}
                  >
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            {submitted ? (
              <div
                style={{
                  border: '1px solid rgba(245,242,238,0.1)',
                  padding: 'clamp(2rem, 4vw, 3.5rem)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: 'rgba(245,242,238,0.9)',
                    marginBottom: '1rem',
                  }}
                >
                  We'll be in touch.
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(245,242,238,0.45)',
                    lineHeight: 1.6,
                  }}
                >
                  Your quote request has been received. Expect a response within one business hour.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  border: '1px solid rgba(245,242,238,0.1)',
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                <input
                  type="hidden"
                  name="access_key"
                  value="YOUR_ACCESS_KEY_HERE"
                />
                <input
                  type="hidden"
                  name="subject"
                  value="New Quote Request — Canada Cleaning"
                />
                <input
                  type="checkbox"
                  name="botcheck"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />

                <div>
                  <label
                    htmlFor="cta-name"
                    className="label"
                    style={{ color: 'rgba(245,242,238,0.4)', display: 'block', marginBottom: '0.5rem' }}
                  >
                    Name
                  </label>
                  <input
                    id="cta-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      background: 'rgba(245,242,238,0.06)',
                      border: '1px solid rgba(245,242,238,0.12)',
                      color: 'rgba(245,242,238,0.9)',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(245,242,238,0.4)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(245,242,238,0.12)'}
                  />
                </div>

                <div>
                  <label
                    htmlFor="cta-phone"
                    className="label"
                    style={{ color: 'rgba(245,242,238,0.4)', display: 'block', marginBottom: '0.5rem' }}
                  >
                    Phone
                  </label>
                  <input
                    id="cta-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      background: 'rgba(245,242,238,0.06)',
                      border: '1px solid rgba(245,242,238,0.12)',
                      color: 'rgba(245,242,238,0.9)',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(245,242,238,0.4)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(245,242,238,0.12)'}
                  />
                </div>

                <div>
                  <label
                    htmlFor="cta-service"
                    className="label"
                    style={{ color: 'rgba(245,242,238,0.4)', display: 'block', marginBottom: '0.5rem' }}
                  >
                    Service Needed
                  </label>
                  <select
                    id="cta-service"
                    name="service"
                    required
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      background: 'rgba(245,242,238,0.06)',
                      border: '1px solid rgba(245,242,238,0.12)',
                      color: 'rgba(245,242,238,0.7)',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  >
                    <option value="" style={{ background: '#111110' }}>Select a service</option>
                    <option value="standard" style={{ background: '#111110' }}>Standard Cleaning</option>
                    <option value="deep" style={{ background: '#111110' }}>Deep Cleaning</option>
                    <option value="move" style={{ background: '#111110' }}>Move-In / Move-Out</option>
                    <option value="commercial" style={{ background: '#111110' }}>Office & Commercial</option>
                    <option value="postconstruction" style={{ background: '#111110' }}>Post-Construction</option>
                    <option value="recurring" style={{ background: '#111110' }}>Recurring Plan</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="cta-postal"
                    className="label"
                    style={{ color: 'rgba(245,242,238,0.4)', display: 'block', marginBottom: '0.5rem' }}
                  >
                    Postal Code
                  </label>
                  <input
                    id="cta-postal"
                    name="postal_code"
                    type="text"
                    required
                    placeholder="A1A 1A1"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      background: 'rgba(245,242,238,0.06)',
                      border: '1px solid rgba(245,242,238,0.12)',
                      color: 'rgba(245,242,238,0.9)',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(245,242,238,0.4)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(245,242,238,0.12)'}
                  />
                </div>

                {error && (
                  <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', color: 'var(--accent)' }}>
                    Something went wrong. Please call us at (800) 555-0199.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    padding: '1.125rem 2rem',
                    background: 'var(--accent)',
                    color: 'white',
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = '#0c3f30';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--accent)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  {loading ? 'Sending…' : 'Get a Free Quote'}
                  {!loading && <span>→</span>}
                </button>

                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.75rem',
                    color: 'rgba(245,242,238,0.3)',
                    textAlign: 'center',
                    letterSpacing: '0.02em',
                  }}
                >
                  No credit card required · Response within 1 hour
                </p>
              </form>
            )}
          </motion.div>
        </div>

        {/* WhatsApp link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '3rem', textAlign: 'center' }}
        >
          <a
            href="https://wa.me/18005550199?text=Hi!%20I'd%20like%20to%20get%20a%20quote%20for%20cleaning%20my%20home."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.8rem',
              color: 'rgba(245,242,238,0.3)',
              letterSpacing: '0.04em',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(245,242,238,0.7)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,242,238,0.3)'}
          >
            Or message us on WhatsApp →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
