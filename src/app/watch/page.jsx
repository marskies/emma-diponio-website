import PageShell, { PageHero } from '@/components/PageShell';
import Disclaimer from '@/components/Disclaimer';
import WatchGrid from './WatchGrid';
import { P, F } from '@/lib/brand';
import { PILLARS } from '@/lib/site';
import { getAllArticles } from '@/lib/articles';

export const metadata = {
  title: 'Watch',
  description:
    'Radiology explained for people who want to understand their own imaging. Four series: The Verdict, Decoded, What Your Scan Knows, and Case Files.',
  alternates: { canonical: '/watch' },
  openGraph: {
    title: 'Watch | Dr. Emma DiPonio, MD',
    description: 'Radiology explained, in four series, by a triple board-certified diagnostic radiologist.',
    url: '/watch',
    type: 'website',
  },
};

export default function Watch() {
  const articles = getAllArticles();

  return (
    <PageShell>
      <PageHero
        eyebrow="Video library"
        title="Radiology, explained."
        lede="Four running series on what imaging can tell you, what it cannot, and where the evidence actually sits. Every episode has a written version."
      />

      <section className="section-sm" style={{ background: P.cream }}>
        <div className="wrap">
          <div className="grid-auto" style={{ marginBottom: '48px' }}>
            {PILLARS.map((p) => (
              <div key={p.slug} style={{ borderLeft: `2px solid ${P.gold}`, paddingLeft: '16px' }}>
                <h2 style={{ fontFamily: F.d, fontSize: '17px', fontWeight: 500, color: P.navy, margin: '0 0 6px' }}>{p.name}</h2>
                <p className="small" style={{ color: P.mid, margin: 0 }}>{p.blurb}</p>
              </div>
            ))}
          </div>

          <WatchGrid articles={articles} pillars={PILLARS} />

          <Disclaimer />
        </div>
      </section>
    </PageShell>
  );
}
