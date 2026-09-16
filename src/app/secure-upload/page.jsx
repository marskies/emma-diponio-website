import PageShell from '@/components/PageShell';
import { P, F } from '@/lib/brand';
import { INTAKE, REVIEW_OFFER, needsEmma } from '@/lib/site';

export const metadata = {
  title: 'Secure Upload',
  description: 'Secure upload for imaging reports and studies.',
  robots: { index: false, follow: false, nocache: true },
};

// ---------------------------------------------------------------------------
// SECURE UPLOAD
//
// PHI BOUNDARY. Everything on this page is deliberate:
//
//  - The form is an iframe to the vendor's own domain. The browser posts
//    directly to them. PHI never touches a route on this site, so Vercel does
//    not enter the PHI perimeter and does not need its own BAA.
//  - No analytics script loads here (see components/Analytics.jsx).
//  - noindex, nofollow, nocache.
//  - No query parameters are read or echoed. Nothing patient-related may ever
//    appear in a URL.
//
// Do NOT replace the iframe with a custom React form that POSTs to an API
// route. That single change pulls this site, its host, and its developer into
// the compliance perimeter.
// ---------------------------------------------------------------------------

export default function SecureUpload() {
  const ready = INTAKE.baaExecuted && !needsEmma(INTAKE.secureUploadUrl) && REVIEW_OFFER.live;

  return (
    <PageShell>
      <section className="section-sm" style={{ background: P.cream }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          <h1 className="h2" style={{ fontFamily: F.d, color: P.navy, margin: '0 0 12px' }}>
            Secure upload
          </h1>

          {!ready ? (
            <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: '4px', padding: '20px' }}>
              <p style={{ fontFamily: F.b, fontSize: '14px', lineHeight: 1.7, color: '#78350F', margin: 0 }}>
                Secure upload is not open yet. It goes live only once the Business
                Associate Agreement with the intake provider is executed. Please do
                not send imaging or reports by email in the meantime.
              </p>
            </div>
          ) : (
            <>
              <p className="body" style={{ color: P.mid, marginBottom: '24px' }}>
                This form is hosted on a HIPAA-covered platform. Your files go directly
                to it and are not stored on this website.
              </p>
              <iframe
                src={INTAKE.secureUploadUrl}
                title="Secure upload form"
                style={{ width: '100%', minHeight: '900px', border: 0, borderRadius: '4px', background: P.white }}
                allow="camera; microphone; autoplay; encrypted-media; fullscreen; geolocation"
              />
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}
