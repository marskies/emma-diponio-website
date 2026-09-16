'use client';

import { useState } from 'react';
import { P, F } from '@/lib/brand';
import { EMAIL, needsEmma } from '@/lib/site';
import { trackEmailSignup } from '@/lib/track';

// Beehiiv embed.
//
// FRAMING RULE, and it is a compliance rule not a copy preference: this is a
// newsletter signup for the video series. It is NOT a "waitlist for your
// imaging review." An address collected against a stated intent to obtain a
// medical service is a much harder argument to keep outside the PHI
// perimeter, and Beehiiv does not sign a BAA. Keep the list about content.
export default function EmailSignup({ source = 'unknown', onDark = false, compact = false }) {
  const [done, setDone] = useState(false);
  const configured = !needsEmma(EMAIL.embedUrl);

  const muted = onDark ? 'rgba(255,255,255,0.55)' : P.mid;
  const heading = onDark ? P.white : P.navy;

  // Not configured: render NOTHING to visitors. An unconfigured component must
  // never leak build instructions onto a public page. The warning goes to the
  // dev console and to `npm run build`, where it belongs.
  if (!configured) {
    if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
      console.warn('[EmailSignup] EMAIL.embedUrl is unset in src/lib/site.js - signup hidden.');
    }
    return null;
  }

  return (
    <div>
      {!compact && (
        <>
          <h3 style={{ fontFamily: F.d, fontSize: '20px', fontWeight: 500, color: heading, margin: '0 0 8px' }}>
            Get each new episode, explained in writing.
          </h3>
          <p className="small" style={{ color: muted, margin: '0 0 16px' }}>
            One email per video. No medical advice, no spam, unsubscribe anytime.
          </p>
        </>
      )}

      <iframe
        src={EMAIL.embedUrl}
        title="Newsletter signup"
        loading="lazy"
        onLoad={() => { if (done) return; }}
        style={{ width: '100%', height: compact ? '64px' : '90px', border: 0, background: 'transparent', borderRadius: '2px' }}
      />

      {/* Beehiiv's iframe cannot notify the parent page on submit, so the
          signup event fires on intent (focus/click into the frame) rather than
          on confirmed subscription. Reconcile real counts against Beehiiv's
          own dashboard, not Plausible. */}
      <div
        onMouseDown={() => { if (!done) { trackEmailSignup(source); setDone(true); } }}
        style={{ height: 0, overflow: 'hidden' }}
        aria-hidden="true"
      />
    </div>
  );
}
