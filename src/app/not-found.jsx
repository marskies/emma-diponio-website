import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { P, F } from '@/lib/brand';

export default function NotFound() {
  return (
    <PageShell>
      <section className="section" style={{ background: P.cream, textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '520px' }}>
          <h1 className="h2" style={{ fontFamily: F.d, color: P.navy, margin: '0 0 12px' }}>Page not found</h1>
          <p className="body" style={{ color: P.mid, marginBottom: '24px' }}>
            That link does not lead anywhere. Try the video library or the clinic services page.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/watch" style={{ fontFamily: F.b, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: P.gold, textDecoration: 'none', borderBottom: `1px solid ${P.gold}`, paddingBottom: '4px' }}>Watch →</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
