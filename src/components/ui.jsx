'use client';

import { useState, useEffect, useRef } from 'react';
import { P, F } from '@/lib/brand';

export function useOnScreen(ref, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return visible;
}

export function FadeIn({ children, delay = 0, style = {}, className }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Mount-guarded so the server and first client render agree. The original
// read window.innerWidth during render, which desyncs hydration in Next.
export function useIsMobile(breakpoint = 640) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < breakpoint);
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, [breakpoint]);
  return mobile;
}

export function Label({ children, center }) {
  return (
    <p style={{
      fontFamily: F.b, fontSize: '11px', letterSpacing: '3px',
      textTransform: 'uppercase', color: P.gold, marginBottom: '10px',
      textAlign: center ? 'center' : 'left', position: 'relative',
    }}>{children}</p>
  );
}

const btnBase = {
  fontFamily: F.b, letterSpacing: '2px', textTransform: 'uppercase',
  borderRadius: '2px', cursor: 'pointer', transition: 'all 0.3s',
  display: 'inline-block', textAlign: 'center', textDecoration: 'none',
};

export function Btn({ children, primary, onClick, href, mobile, onDark = true, ...rest }) {
  const style = {
    ...btnBase,
    fontSize: mobile ? '11px' : '12px',
    padding: mobile ? '14px 28px' : '15px 34px',
    fontWeight: primary ? 600 : 400,
    background: primary ? P.gold : 'transparent',
    color: primary ? P.navy : onDark ? 'rgba(255,255,255,0.75)' : P.mid,
    border: primary ? 'none' : `1px solid ${onDark ? 'rgba(255,255,255,0.2)' : 'rgba(27,42,74,0.15)'}`,
    width: mobile ? '100%' : 'auto',
  };
  if (href) return <a href={href} style={style} {...rest}>{children}</a>;
  return <button onClick={onClick} style={{ ...style, border: style.border || 'none' }} {...rest}>{children}</button>;
}

export function Pill({ children }) {
  return <span style={{ fontFamily: F.b, fontSize: '11px', padding: '7px 14px', background: 'rgba(27,42,74,0.03)', borderRadius: '2px', color: P.mid, border: '1px solid rgba(27,42,74,0.07)' }}>{children}</span>;
}

export function Tag({ children, gold }) {
  return <span style={{ fontFamily: F.b, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: gold ? P.gold : P.mid, background: gold ? 'rgba(196,162,101,0.1)' : 'rgba(27,42,74,0.04)', padding: '5px 12px', borderRadius: '2px' }}>{children}</span>;
}

export function Award({ children }) {
  return <span style={{ fontFamily: F.b, fontSize: '12px', padding: '7px 14px', background: 'rgba(196,162,101,0.07)', borderRadius: '2px', color: P.gold, border: '1px solid rgba(196,162,101,0.12)', display: 'inline-block' }}>{children}</span>;
}

export function SkillPill({ children }) {
  return <span style={{ fontFamily: F.b, fontSize: '11px', padding: '6px 14px', background: 'rgba(27,42,74,0.04)', borderRadius: '2px', color: P.mid, border: '1px solid rgba(27,42,74,0.06)', display: 'inline-block' }}>{children}</span>;
}

export function Card({ children, style = {}, hover = true }) {
  return (
    <div
      style={{ background: P.white, borderRadius: '4px', padding: '28px 24px', border: '1px solid rgba(27,42,74,0.05)', height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', ...style }}
      onMouseOver={hover ? (e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(27,42,74,0.07)'; } : undefined}
      onMouseOut={hover ? (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; } : undefined}
    >{children}</div>
  );
}

export function GoldRule({ center }) {
  return <div style={{ width: '1px', height: '50px', background: `linear-gradient(to bottom, transparent, ${P.gold})`, margin: center ? '0 auto 22px' : '0 0 24px' }} />;
}
