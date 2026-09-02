'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@/lib/useLenis';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  useLenis();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <div
          className="transition-all duration-500"
          style={{
            background: scrolled
              ? 'rgba(245, 242, 238, 0.92)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled
              ? '1px solid rgba(17,17,16,0.08)'
              : '1px solid transparent',
          }}
        >
          <div className="container">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex flex-col leading-none group"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: 'var(--fg)',
                    transition: 'opacity 0.3s',
                  }}
                  className="group-hover:opacity-70"
                >
                  Canada Cleaning
                </span>
                <span
                  style={{
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 600,
                    marginTop: '1px',
                  }}
                >
                  Premium Cleaning Service
                </span>
              </a>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative"
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      color: 'var(--fg)',
                      opacity: hoveredLink && hoveredLink !== link.href ? 0.4 : 1,
                      transition: 'opacity 0.25s',
                    }}
                  >
                    {link.label}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: 0,
                        width: hoveredLink === link.href ? '100%' : '0%',
                        height: '1px',
                        background: 'var(--accent)',
                        transition: 'width 0.3s cubic-bezier(0.19,1,0.22,1)',
                      }}
                    />
                  </a>
                ))}
              </nav>

              {/* CTA */}
              <div className="flex items-center gap-3">
                <a
                  href="tel:+18005550199"
                  className="hidden md:flex items-center gap-1.5"
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.8rem',
                    color: 'var(--muted)',
                    transition: 'color 0.25s',
                  }}
                  aria-label="Call us"
                >
                  (800) 555-0199
                </a>
                <a
                  href="#cta"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#cta');
                  }}
                  className="nav-cta-btn"
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '0.6rem 1.4rem',
                    border: '1px solid var(--fg)',
                    color: 'var(--fg)',
                    background: 'transparent',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.3s cubic-bezier(0.19,1,0.22,1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'var(--fg)';
                    el.style.color = 'var(--bg)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'transparent';
                    el.style.color = 'var(--fg)';
                  }}
                >
                  Get a Quote
                  <span>→</span>
                </a>

                {/* Hamburger */}
                <button
                  className="md:hidden flex flex-col gap-1.5 p-3 -mr-2"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileOpen}
                >
                  <span
                    style={{
                      display: 'block',
                      width: '22px',
                      height: '1.5px',
                      background: 'var(--fg)',
                      transition: 'transform 0.3s, opacity 0.3s',
                      transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                    }}
                  />
                  <span
                    style={{
                      display: 'block',
                      width: '22px',
                      height: '1.5px',
                      background: 'var(--fg)',
                      transition: 'opacity 0.3s',
                      opacity: mobileOpen ? 0 : 1,
                    }}
                  />
                  <span
                    style={{
                      display: 'block',
                      width: '22px',
                      height: '1.5px',
                      background: 'var(--fg)',
                      transition: 'transform 0.3s, opacity 0.3s',
                      transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'var(--bg)' }}
          >
            <motion.nav
              className="flex flex-col justify-center items-start h-full container"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              aria-label="Mobile navigation"
            >
              <div className="accent-line" />
              <div className="flex flex-col gap-4 mb-12">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.07, ease: [0.19, 1, 0.22, 1] }}
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                      color: 'var(--fg)',
                      lineHeight: 1.1,
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex flex-col gap-2"
              >
                <a
                  href="tel:+18005550199"
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.9rem',
                    color: 'var(--muted)',
                  }}
                >
                  (800) 555-0199
                </a>
                <a
                  href="#cta"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#cta');
                  }}
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.9rem',
                    color: 'var(--accent)',
                    fontWeight: 600,
                  }}
                >
                  Get a Quote →
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
