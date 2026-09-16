import { P, F } from '@/lib/brand';
import { DISCLAIMERS } from '@/lib/site';

// Standing disclaimer for CONTENT pages: /watch, /articles/*, and any
// educational section.
//
// Deliberately NOT rendered on /start or the review flow. "Viewing this does
// not create a doctor-patient relationship" is true of a YouTube explainer and
// false of a paid clinical review. Use <ServiceScopeNote /> there instead.
export default function Disclaimer({ variant = 'content' }) {
  const text = variant === 'review' ? DISCLAIMERS.reviewScope : DISCLAIMERS.content;
  return (
    <aside
      role="note"
      aria-label={variant === 'review' ? 'Scope of service' : 'Educational content notice'}
      style={{
        background: 'rgba(27,42,74,0.03)',
        border: '1px solid rgba(27,42,74,0.07)',
        borderLeft: `2px solid ${P.gold}`,
        borderRadius: '2px',
        padding: '16px 18px',
        margin: '32px 0',
      }}
    >
      <p style={{
        fontFamily: F.b, fontSize: '11px', letterSpacing: '2px',
        textTransform: 'uppercase', color: P.gold, margin: '0 0 6px',
      }}>
        {variant === 'review' ? 'Scope of service' : 'Educational content'}
      </p>
      <p style={{ fontFamily: F.b, fontSize: '13px', lineHeight: 1.7, color: P.mid, margin: 0 }}>
        {text}
      </p>
    </aside>
  );
}

export function ServiceScopeNote() {
  return <Disclaimer variant="review" />;
}
