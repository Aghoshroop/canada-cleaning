'use client';

const items = [
  'Toronto', 'Vancouver', 'Calgary', 'Montreal', 'Ottawa', 'Edmonton',
  'Insured & Bonded', '5-Star Rated', 'Background-Checked Staff',
  'Eco-Friendly Products', 'Same-Day Available',
  'Toronto', 'Vancouver', 'Calgary', 'Montreal', 'Ottawa', 'Edmonton',
  'Insured & Bonded', '5-Star Rated', 'Background-Checked Staff',
  'Eco-Friendly Products', 'Same-Day Available',
];

export default function CityTicker() {
  return (
    <div
      style={{
        background: 'var(--fg)',
        overflow: 'hidden',
        padding: '0.85rem 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
      aria-label="Service areas and features"
    >
      <div
        style={{
          display: 'flex',
          gap: '0',
          width: 'max-content',
          animation: 'ticker 40s linear infinite',
          willChange: 'transform',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(245,242,238,0.7)',
                padding: '0 2rem',
              }}
            >
              {item}
            </span>
            <span
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: 'var(--accent)',
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-inner { animation: none; }
        }
      `}</style>
    </div>
  );
}
