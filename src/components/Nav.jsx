'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { P, F } from '@/lib/brand';
import { REVIEW_OFFER } from '@/lib/site';

// `transparentUntilScroll` is for the homepage, which sits over a dark hero.
// Inner pages get the solid treatment from the first paint.
export default function Nav({ transparentUntilScroll = false }) {
  const [scrolled, setScrolled] = useState(!transparentUntilScroll);

  useEffect(() => {
    if (!transparentUntilScroll) return;
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [transparentUntilScroll]);

  const links = [
    { label: 'About', href: '/#about', secondary: true },
    { label: 'Watch', href: '/watch' },
    { label: 'For Clinics', href: '/for-clinics' },
    ...(REVIEW_OFFER.live ? [{ label: 'Imaging Review', href: '/start' }] : []),
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(250,246,241,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(27,42,74,0.06)' : 'none',
      transition: 'all 0.4s ease',
      padding: scrolled ? '12px 0' : '20px 0',
    }}>
      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ fontFamily: F.d, fontSize: 'clamp(13px, 3vw, 20px)', fontWeight: 700, color: scrolled ? P.navy : P.white, transition: 'color 0.4s' }}>
            Dr. Emma DiPonio
          </span>
          <span style={{ fontFamily: F.b, fontSize: '11px', letterSpacing: '2px', color: scrolled ? P.gold : 'rgba(255,255,255,0.6)', marginLeft: '6px', transition: 'color 0.4s' }}>MD</span>
        </Link>
        <div style={{ display: 'flex', gap: 'clamp(8px, 1.9vw, 26px)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.secondary ? 'nav-secondary' : undefined}
              style={{
                fontFamily: F.b, fontSize: 'clamp(8.5px, 1.7vw, 12px)', letterSpacing: '1.5px',
                textTransform: 'uppercase', textDecoration: 'none',
                color: scrolled ? P.mid : 'rgba(255,255,255,0.8)', transition: 'color 0.3s',
                whiteSpace: 'nowrap',
              }}
            >{item.label}</Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
