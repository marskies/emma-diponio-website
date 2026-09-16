'use client';

import { useState } from 'react';
import Link from 'next/link';
import { P, F } from '@/lib/brand';

// Filter state lives in the client; the full list is server-rendered inside
// this component's children path, so every card is in the HTML before JS runs
// and a crawler sees all of them regardless of the active filter.
export default function WatchGrid({ articles, pillars }) {
  const [active, setActive] = useState('all');
  const shown = active === 'all' ? articles : articles.filter((a) => a.pillar === active);

  const chip = (isOn) => ({
    fontFamily: F.b, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase',
    padding: '9px 16px', borderRadius: '2px', cursor: 'pointer',
    background: isOn ? P.gold : 'transparent',
    color: isOn ? P.navy : P.mid,
    border: `1px solid ${isOn ? P.gold : 'rgba(27,42,74,0.12)'}`,
    fontWeight: isOn ? 600 : 400,
    transition: 'all 0.25s',
  });

  return (
    <>
      <div role="group" aria-label="Filter by series" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
        <button type="button" onClick={() => setActive('all')} style={chip(active === 'all')} aria-pressed={active === 'all'}>
          All
        </button>
        {pillars.map((p) => (
          <button key={p.slug} type="button" onClick={() => setActive(p.slug)} style={chip(active === p.slug)} aria-pressed={active === p.slug}>
            {p.name}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="body" style={{ color: P.light }}>
          Nothing published in this series yet.
        </p>
      ) : (
        <div className="grid-auto">
          {shown.map((a) => {
            const pillar = pillars.find((p) => p.slug === a.pillar);
            return (
              <Link key={a.slug} href={`/articles/${a.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{ background: P.white, border: '1px solid rgba(27,42,74,0.05)', borderRadius: '4px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ aspectRatio: '16 / 9', background: P.navy, position: 'relative' }}>
                    {a.youtubeId && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`https://i.ytimg.com/vi/${a.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <span style={{ fontFamily: F.b, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: P.gold }}>
                      {pillar ? pillar.name : a.pillar}
                    </span>
                    <h3 style={{ fontFamily: F.d, fontSize: '18px', fontWeight: 500, color: P.navy, lineHeight: 1.35, margin: 0 }}>{a.title}</h3>
                    <p style={{ fontFamily: F.b, fontSize: '13px', lineHeight: 1.6, color: P.mid, margin: 0 }}>{a.description}</p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
