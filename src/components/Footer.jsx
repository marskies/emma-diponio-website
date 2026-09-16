import Link from 'next/link';
import { P, F } from '@/lib/brand';
import { CONTACT, REVIEW_OFFER, needsEmma } from '@/lib/site';

// Lifespan Edge has been removed from this footer. Do not re-add it.
// Location line is intentionally absent: she practices remotely now, and a
// city line implies a physical practice she no longer has.
export default function Footer() {
  const external = [
    { name: 'LinkedIn', url: CONTACT.linkedin },
    { name: 'Instagram', url: CONTACT.instagram },
    { name: 'Abeytu Naturals', url: 'https://www.abeytunaturals.com' },
    ...(needsEmma(CONTACT.youtube) ? [] : [{ name: 'YouTube', url: CONTACT.youtube }]),
  ];

  const internal = [
    { name: 'Watch', href: '/watch' },
    { name: 'For Clinics', href: '/for-clinics' },
    ...(REVIEW_OFFER.live ? [{ name: 'Imaging Review', href: '/start' }] : []),
  ];

  const linkStyle = {
    fontFamily: F.b, fontSize: '10px', letterSpacing: '1px',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', textDecoration: 'none',
  };

  return (
    <footer style={{ background: P.navyDeep, padding: '32px 0', textAlign: 'center', borderTop: '1px solid rgba(196,162,101,0.08)' }}>
      <div className="wrap">
        <p style={{ fontFamily: F.d, fontSize: '16px', color: 'rgba(255,255,255,0.5)', margin: '0 0 14px' }}>
          Dr. Emma DiPonio, MD
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
          {internal.map((l) => <Link key={l.href} href={l.href} style={linkStyle}>{l.name}</Link>)}
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
          {external.map((l) => (
            <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>{l.name}</a>
          ))}
        </div>

        <div style={{ width: '32px', height: '1px', background: 'rgba(196,162,101,0.15)', margin: '0 auto 10px' }} />
        <p style={{ fontFamily: F.b, fontSize: '10px', color: 'rgba(255,255,255,0.12)', letterSpacing: '1px', margin: 0 }}>
          &copy; {new Date().getFullYear()} Dr. Emma DiPonio, MD
        </p>
        <p style={{ fontFamily: F.b, fontSize: '10px', color: 'rgba(255,255,255,0.12)', letterSpacing: '1px', margin: '6px 0 0' }}>
          Website created by{' '}
          <a href="https://skymar.studio" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none', borderBottom: '1px solid rgba(196,162,101,0.2)' }}>
            Sky &amp; Mar Studio LLC
          </a>
        </p>
      </div>
    </footer>
  );
}
