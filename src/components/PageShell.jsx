import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { P, F } from '@/lib/brand';

// Shell for inner pages. Solid nav from first paint, since these pages do not
// open on a dark hero.
export default function PageShell({ children }) {
  return (
    <div style={{ fontFamily: F.b, color: P.dark, background: P.cream, minHeight: '100vh' }}>
      <Nav />
      <main style={{ paddingTop: '72px' }}>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({ eyebrow, title, lede, children }) {
  return (
    <section style={{
      background: `linear-gradient(160deg, ${P.navy} 0%, ${P.navyMid} 100%)`,
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(56px, 9vw, 96px) 0',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 30%, rgba(196,162,101,0.07) 0%, transparent 55%)' }} />
      <div className="wrap" style={{ position: 'relative', maxWidth: '780px' }}>
        {eyebrow && (
          <p style={{ fontFamily: F.b, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: P.gold, marginBottom: '16px' }}>{eyebrow}</p>
        )}
        <h1 className="h1" style={{ fontFamily: F.d, color: P.white, margin: '0 0 18px' }}>{title}</h1>
        {lede && (
          <p className="body" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '560px', margin: '0 0 28px' }}>{lede}</p>
        )}
        {children}
      </div>
    </section>
  );
}
