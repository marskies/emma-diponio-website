import PageShell, { PageHero } from '@/components/PageShell';
import EmailSignup from '@/components/EmailSignup';
import TrackedLink from '@/components/TrackedLink';
import { ServiceScopeNote } from '@/components/Disclaimer';
import { P, F } from '@/lib/brand';
import { REVIEW_OFFER, INTAKE, ANALYTICS, CONTACT, needsEmma } from '@/lib/site';

export const metadata = {
  title: REVIEW_OFFER.live ? 'Second Opinion Imaging Review' : 'Second Opinion Imaging Review — Opening Soon',
  description:
    'An independent second read of your imaging and report by a triple board-certified diagnostic radiologist.',
  alternates: { canonical: '/start' },
  robots: REVIEW_OFFER.live ? { index: true, follow: true } : { index: false, follow: true },
};

// ---------------------------------------------------------------------------
// /start - the conversion landing page for the paid review.
//
// GATED. `REVIEW_OFFER.live` stays false until all four are true:
//   1. Emma's BAA with the intake vendor is executed and in hand
//   2. Emma has supplied the licensure notice, verbatim
//   3. Price and turnaround are set
//   4. Checkout or booking-plus-invoice flow is live
//
// Until then this page is noindex and sells nothing. It does not collect an
// address against an intent to obtain care, and it does not embed the upload.
// ---------------------------------------------------------------------------

const label = { fontFamily: F.b, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: P.gold, marginBottom: '14px' };

export default function Start() {
  if (!REVIEW_OFFER.live) return <ComingSoon />;
  return <LiveOffer />;
}

function ComingSoon() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Opening soon"
        title="Second opinion imaging review."
        lede="An independent read of your imaging and report by a triple board-certified diagnostic radiologist. The intake is being set up on a HIPAA-covered platform before it opens."
      />
      <section className="section-sm" style={{ background: P.cream }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          <p style={label}>In the meantime</p>
          <EmailSignup source="start_comingsoon" />
          <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid rgba(27,42,74,0.07)' }}>
            <p className="body" style={{ color: P.mid, marginBottom: '16px' }}>
              If you are a clinic rather than a patient, the consulting path is open now.
            </p>
            <TrackedLink
              href="/for-clinics"
              event={ANALYTICS.events.clinicInquiry}
              props={{ source: 'start_comingsoon' }}
              style={{ fontFamily: F.b, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: P.gold, textDecoration: 'none', borderBottom: `1px solid ${P.gold}`, paddingBottom: '4px' }}
            >
              Imaging consulting for clinics →
            </TrackedLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function LiveOffer() {
  const ctaHref = needsEmma(REVIEW_OFFER.checkoutUrl) ? '#how' : REVIEW_OFFER.checkoutUrl;
  const cta = {
    fontFamily: F.b, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
    color: P.navy, background: P.gold, padding: '15px 34px', borderRadius: '2px',
    textDecoration: 'none', fontWeight: 600, display: 'inline-block',
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Second opinion imaging review"
        title="A second read on your imaging, from an independent radiologist."
        lede="You send your report and images. I review them and return a written second opinion in plain language, with the questions your own physician should be asked next."
      >
        <div className="cta-row" style={{ marginBottom: '20px' }}>
          <TrackedLink href={ctaHref} event={ANALYTICS.events.reviewClick} props={{ source: 'start_hero' }} style={cta} external={!needsEmma(REVIEW_OFFER.checkoutUrl)}>
            {needsEmma(REVIEW_OFFER.price) ? 'Request a review' : `Start a review — ${REVIEW_OFFER.price}`}
          </TrackedLink>
        </div>
        <div style={{ maxWidth: '420px' }}>
          <EmailSignup source="start_hero" onDark compact />
        </div>
      </PageHero>

      {/* LICENSURE - Emma's verbatim copy. Placed high so enquiries self-qualify
          before anyone pays or uploads anything. */}
      <section style={{ background: P.ivory, padding: '24px 0', borderBottom: '1px solid rgba(27,42,74,0.06)' }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          <p style={{ ...label, marginBottom: '8px' }}>Where I can accept patients</p>
          {needsEmma(REVIEW_OFFER.licensureNotice) ? (
            <p className="small" style={{ color: '#9A3412', margin: 0 }}>
              Licensure notice not yet supplied. This page must not go live without it.
            </p>
          ) : (
            <p className="body" style={{ color: P.mid, margin: 0 }}>{REVIEW_OFFER.licensureNotice}</p>
          )}
          {REVIEW_OFFER.licensedStates.length > 0 && (
            <p className="small" style={{ color: P.mid, marginTop: '10px' }}>
              Currently licensed in: {REVIEW_OFFER.licensedStates.join(', ')}
            </p>
          )}
        </div>
      </section>

      <section id="how" className="section-sm" style={{ background: P.cream }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          <p style={label}>How it works</p>
          <ol style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', display: 'grid', gap: '20px' }}>
            {[
              ['Confirm you are in a state where I can practice', 'The licensure notice above governs. If your state is not listed, I cannot take the case.'],
              ['Send your report and images securely', `Upload happens on a HIPAA-covered platform${INTAKE.baaExecuted ? '' : ' (setup in progress)'}, never by email and never through this website.`],
              ['I review and write it up', `Written second opinion returned in ${needsEmma(REVIEW_OFFER.turnaround) ? 'a stated turnaround' : REVIEW_OFFER.turnaround}.`],
              ['You take it back to your physician', 'The report is written so your own doctor can act on it.'],
            ].map(([t, d], i) => (
              <li key={t} style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontFamily: F.d, fontSize: '22px', color: 'rgba(196,162,101,0.5)', minWidth: '32px' }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p style={{ fontFamily: F.d, fontSize: '17px', fontWeight: 500, color: P.navy, margin: '0 0 4px' }}>{t}</p>
                  <p className="small" style={{ color: P.mid, margin: 0 }}>{d}</p>
                </div>
              </li>
            ))}
          </ol>

          {REVIEW_OFFER.whatsIncluded.length > 0 && (
            <div className="split" style={{ alignItems: 'flex-start', marginBottom: '32px' }}>
              <div>
                <p style={label}>What is included</p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '8px' }}>
                  {REVIEW_OFFER.whatsIncluded.map((x) => (
                    <li key={x} className="small" style={{ color: P.mid, display: 'flex', gap: '10px' }}>
                      <span aria-hidden="true" style={{ color: P.gold }}>—</span>{x}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p style={label}>What is not</p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '8px' }}>
                  {REVIEW_OFFER.whatsNotIncluded.map((x) => (
                    <li key={x} className="small" style={{ color: P.mid, display: 'flex', gap: '10px' }}>
                      <span aria-hidden="true" style={{ color: P.light }}>—</span>{x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <ServiceScopeNote />

          <div className="cta-row">
            <TrackedLink href={ctaHref} event={ANALYTICS.events.reviewClick} props={{ source: 'start_body' }} style={cta} external={!needsEmma(REVIEW_OFFER.checkoutUrl)}>
              {needsEmma(REVIEW_OFFER.price) ? 'Request a review' : `Start a review — ${REVIEW_OFFER.price}`}
            </TrackedLink>
          </div>

          <p className="small" style={{ color: P.light, marginTop: '20px' }}>
            Questions before you book?{' '}
            {needsEmma(CONTACT.email) ? 'Contact details coming soon.' : <a href={`mailto:${CONTACT.email}`} style={{ color: P.gold }}>Email me</a>}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
