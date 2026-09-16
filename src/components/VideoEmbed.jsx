'use client';

import { useState } from 'react';
import { P, F } from '@/lib/brand';

// Facade embed. Ships a thumbnail and a real anchor; the iframe is only
// injected after a click.
//
// Why it matters here: a YouTube iframe pulls roughly half a megabyte of
// script before it does anything. On an article page that iframe becomes the
// LCP element and the score collapses. This keeps LCP on an image.
//
// Also: with no JS, this degrades to a plain link to the video rather than an
// empty box, and youtube-nocookie means no tracking cookie until a real click.
export default function VideoEmbed({ youtubeId, title, poster }) {
  const [active, setActive] = useState(false);

  if (!youtubeId) return null;

  const thumb = poster || `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

  const frame = {
    position: 'relative',
    aspectRatio: '16 / 9',
    width: '100%',
    background: P.navy,
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid rgba(196,162,101,0.12)',
  };

  if (active) {
    return (
      <div style={frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
    );
  }

  return (
    <a
      href={watchUrl}
      onClick={(e) => { e.preventDefault(); setActive(true); }}
      aria-label={`Play video: ${title}`}
      style={{ ...frame, display: 'block', textDecoration: 'none', cursor: 'pointer' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
      />
      <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(27,42,74,0.35), rgba(27,42,74,0.55))' }} />
      <span style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '64px', height: '64px', borderRadius: '50%',
        background: 'rgba(196,162,101,0.18)', border: `2px solid ${P.gold}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span aria-hidden="true" style={{ fontSize: '22px', marginLeft: '4px', color: P.gold }}>▶</span>
      </span>
      <span style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 16px',
        fontFamily: F.b, fontSize: '12px', color: 'rgba(255,255,255,0.75)',
        background: 'linear-gradient(to top, rgba(20,30,51,0.85), transparent)',
      }}>{title}</span>
    </a>
  );
}
