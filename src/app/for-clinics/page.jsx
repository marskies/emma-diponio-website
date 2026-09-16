import PageShell, { PageHero } from '@/components/PageShell';
import TrackedLink from '@/components/TrackedLink';
import { P, F } from '@/lib/brand';
import { ANALYTICS, INTAKE, contactCta, needsEmma } from '@/lib/site';

export const metadata = {
  title: 'Imaging Consulting for Clinics',
  description:
    'Independent radiology support for longevity, concierge, and wellness practices: imaging protocol review, radiologist-of-record relationships, and clinical staff education.',
  alternates: { canonical: '/for-clinics' },
  openGraph: {
    title: 'Imaging Consulting for Clinics | Dr. Emma DiPonio, MD',
    description:
      'Protocol review, radiologist-of-record relationships, and staff education from a triple board-certified diagnostic radiologist.',
    url: '/for-clinics',
    type: 'website',
  },
};

// ---------------------------------------------------------------------------
// FOR CLINICS
//
// B2B page. No PHI, no licensure gate, no BAA dependency, which is why it can
// ship ahead of the patient-facing review.
//
// Deliberately different from the patient path: operator language (throughput,
// defensibility, ordering discipline), a consultation CTA rather than a
// purchase, and no clinical reassurance copy.
// ---------------------------------------------------------------------------

const SERVICES = [
  {
    n: '01',
    title: 'Imaging protocol review',
    lede: 'The scans you order, matched to the questions you are actually asking.',
    points: [
      'Audit of current imaging menu against what each study can and cannot resolve',
      'Sequence and acquisition parameters specified for your imaging partner',
      'Contrast, timing, and coverage decisions documented so results are repeatable',
      'A written protocol set your team can hand to any imaging center',
    ],
  },
  {
    n: '02',
    title: 'Radiologist-of-record relationships',
    lede: 'A named radiologist attached to your imaging pathway, not a rotating queue.',
    points: [
      'Consistent interpretation across your patient panel over time',
      'Structured reporting built around longevity and preventive endpoints',
      'Direct clinician-to-radiologist channel for questions on a read',
      'Defined scope of engagement, set in writing before any patient work begins',
    ],
  },
  {
    n: '03',
    title: 'Clinical staff education',
    lede: 'Your team stops guessing at what the imaging means.',
    points: [
      'Live sessions on reading and explaining common longevity imaging findings',
      'Ordering guidance so staff select the right study the first time',
      'Patient-communication scripts for incidental and indeterminate findings',
      'Recorded modules for onboarding new clinical staff',
    ],
  },
];

const FITS = [
  'Longevity and healthspan clinics adding imaging to their panel',
  'Concierge and executive-health practices ordering whole-body or cardiac imaging',
  'Wellness groups whose imaging vendor supplies scans but not interpretation strategy',
  'Practices whose imaging is clinically inconsistent between patients',
];

const linkCta = {
  fontFamily: F.b, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
  color: P.navy, background: P.gold, padding: '15px 34px', borderRadius: '2px',
  textDecoration: 'none', fontWeight: 600, display: 'inline-block',
};

export default function ForClinics() {
  // Until the inquiry form exists, this must still land somewhere real.
  const cta = needsEmma(INTAKE.inquiryFormUrl)
    ? contactCta({ context: 'clinic' })
    : { href: INTAKE.inquiryFormUrl, label: 'Start a conversation', external: false };

  return (
    <PageShell>
      <PageHero
        eyebrow="For clinics and practices"
        title="Radiology expertise, built into how your clinic uses imaging."
        lede="Most longevity practices buy scans. Far fewer have a radiologist shaping what gets ordered, how it is acquired, and what the report is meant to answer. That gap is where imaging budgets go to waste."
      >
        <TrackedLink
          href={cta.href}
          external={cta.external}
          event={ANALYTICS.events.clinicInquiry}
          props={{ source: 'clinics_hero' }}
          style={linkCta}
        >
          {cta.label}
        </TrackedLink>
      </PageHero>

      {/* THE PROBLEM */}
      <section className="section-sm" style={{ background: P.cream }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          <p style={{ fontFamily: F.b, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: P.gold, marginBottom: '14px' }}>The gap</p>
          <h2 className="h2" style={{ fontFamily: F.d, color: P.navy, margin: '0 0 20px' }}>
            An imaging vendor sells you a scan. They do not tell you whether it answered the question.
          </h2>
          <p className="body" style={{ color: P.mid, marginBottom: '14px' }}>
            A whole-body MRI ordered without a protocol produces a report full of incidental findings and no clear next step. A coronary calcium score read in isolation gets treated as a verdict rather than one input. Staff field patient questions they were never equipped to answer, and the clinic absorbs the follow-up cost.
          </p>
          <p className="body" style={{ color: P.mid }}>
            I work on the other side of that: 25+ years of diagnostic radiology, triple board certification, and a working understanding of what longevity practices are actually trying to measure.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-sm" style={{ background: P.ivory }}>
        <div className="wrap">
          <p style={{ fontFamily: F.b, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: P.gold, marginBottom: '14px', textAlign: 'center' }}>Engagements</p>
          <h2 className="h2" style={{ fontFamily: F.d, color: P.navy, textAlign: 'center', margin: '0 0 40px' }}>Three ways clinics work with me</h2>

          <div style={{ display: 'grid', gap: '20px' }}>
            {SERVICES.map((s) => (
              <div key={s.n} style={{ background: P.white, borderRadius: '4px', border: '1px solid rgba(27,42,74,0.05)', padding: 'clamp(24px, 4vw, 36px)' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: F.d, fontSize: '28px', color: 'rgba(196,162,101,0.45)', lineHeight: 1, minWidth: '44px' }}>{s.n}</span>
                  <div style={{ flex: '1 1 280px' }}>
                    <h3 className="h3" style={{ fontFamily: F.d, color: P.navy, margin: '0 0 8px' }}>{s.title}</h3>
                    <p className="small" style={{ color: P.gold, margin: '0 0 18px' }}>{s.lede}</p>
                    <ul style={{ listStyle: 'none', display: 'grid', gap: '10px', padding: 0, margin: 0 }}>
                      {s.points.map((pt) => (
                        <li key={pt} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <span aria-hidden="true" style={{ color: P.gold, lineHeight: 1.7, flexShrink: 0 }}>—</span>
                          <span className="small" style={{ color: P.mid }}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIT */}
      <section className="section-sm" style={{ background: P.cream }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          <p style={{ fontFamily: F.b, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: P.gold, marginBottom: '14px' }}>Fit</p>
          <h2 className="h2" style={{ fontFamily: F.d, color: P.navy, margin: '0 0 24px' }}>Who this is for</h2>
          <ul style={{ listStyle: 'none', display: 'grid', gap: '12px', padding: 0, margin: '0 0 28px' }}>
            {FITS.map((f) => (
              <li key={f} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', borderBottom: '1px solid rgba(27,42,74,0.05)', paddingBottom: '12px' }}>
                <span aria-hidden="true" style={{ color: P.gold, flexShrink: 0 }}>—</span>
                <span className="body" style={{ color: P.mid, fontSize: '15px' }}>{f}</span>
              </li>
            ))}
          </ul>
          <p className="small" style={{ color: P.light }}>
            Engagements are scoped individually. Scope, deliverables, and fees are agreed in writing before work begins.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ background: `linear-gradient(160deg, ${P.navy} 0%, ${P.navyMid} 100%)`, textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: '620px' }}>
          <h2 className="h2" style={{ fontFamily: F.d, color: P.white, margin: '0 0 16px' }}>
            Tell me what your clinic is imaging for.
          </h2>
          <p className="body" style={{ color: 'rgba(255,255,255,0.55)', margin: '0 0 28px' }}>
            Send a short note on your current imaging setup and what you want it to answer. If there is a fit, we will book a call.
          </p>
          <TrackedLink
            href={cta.href}
            external={cta.external}
            event={ANALYTICS.events.clinicInquiry}
            props={{ source: 'clinics_footer' }}
            style={linkCta}
          >
            {cta.label}
          </TrackedLink>
          <p className="small" style={{ color: 'rgba(255,255,255,0.3)', marginTop: '20px' }}>
            This page is for clinics and practices. Patients seeking a second opinion on their own imaging should use the patient path.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
