'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { JsonLd, physicianSchema } from '@/lib/schema';
import { P, F } from '@/lib/brand';
import { CONTACT, REVIEW_OFFER, contactCta } from '@/lib/site';
import { trackReviewClick } from '@/lib/track';
import {
  FadeIn, useIsMobile, Label, Btn, Pill, Tag, Award, SkillPill, GoldRule,
} from '@/components/ui';

// ---------------------------------------------------------------------------
// HOMEPAGE
//
// Ported from the Vite build with the visual design preserved. Three kinds of
// change, all forced by Emma leaving Lifespan Edge:
//   1. Affiliation copy rewritten  (marked // REWRITTEN)
//   2. The Lifespan Edge section removed entirely
//   3. Contact routed away from the former-employer mailbox
// Copy marked // EMMA-REVIEW is factually safe but should get her sign-off.
// ---------------------------------------------------------------------------

export default function Home() {
  const mobile = useIsMobile();
  const sectionPad = mobile ? '56px 20px' : 'clamp(64px, 10vw, 120px) 32px';
  const sectionPadSm = mobile ? '48px 20px' : 'clamp(56px, 8vw, 100px) 32px';

  const cta = contactCta();

  return (
    <div style={{ fontFamily: F.b, color: P.dark, background: P.cream, overflowX: 'hidden' }}>
      <JsonLd data={physicianSchema()} />
      <Nav transparentUntilScroll />

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        background: `linear-gradient(160deg, ${P.navy} 0%, ${P.navyMid} 40%, #1a3050 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 30%, rgba(196,162,101,0.07) 0%, transparent 55%)' }} />
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap', gap: mobile ? '32px' : '48px',
          padding: mobile ? '120px 20px 60px' : '140px 32px 80px',
          maxWidth: '1100px', margin: '0 auto', width: '100%',
          flexDirection: mobile ? 'column-reverse' : 'row',
        }}>
          <div style={{ flex: '1 1 420px', minWidth: mobile ? '100%' : '280px', position: 'relative', zIndex: 1, textAlign: mobile ? 'center' : 'left' }}>
            {!mobile && <div style={{ width: '1px', height: '60px', background: `linear-gradient(to bottom, transparent, ${P.gold})`, marginBottom: '24px' }} />}
            <p style={{ fontFamily: F.b, fontSize: mobile ? '11px' : '12px', letterSpacing: '4px', textTransform: 'uppercase', color: P.gold, marginBottom: '20px' }}>
              Triple Board-Certified Physician
            </p>
            <h1 style={{ fontFamily: F.d, fontSize: mobile ? '36px' : 'clamp(34px, 5.5vw, 56px)', fontWeight: 400, color: P.white, lineHeight: 1.15, margin: '0 0 20px' }}>
              See deeper.
              <br />
              <em style={{ color: P.goldLight }}>Live longer.</em>
            </h1>
            {/* REWRITTEN - was "...now advancing the future of Therapeutic Plasma Exchange at Lifespan Edge." */}
            {/* EMMA-REVIEW */}
            <p style={{ fontFamily: F.b, fontSize: mobile ? '14px' : '16px', color: 'rgba(255,255,255,0.55)', maxWidth: '460px', lineHeight: 1.7, marginBottom: '32px', ...(mobile && { margin: '0 auto 32px' }) }}>
              Diagnostic radiology meets longevity science. 25+ years of precision imaging, now in independent practice.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', ...(mobile && { justifyContent: 'center' }) }}>
              {REVIEW_OFFER.live ? (
                <Btn primary mobile={mobile} href="/start" onClick={() => trackReviewClick('home_hero')}>
                  Second Opinion Review
                </Btn>
              ) : (
                <Btn primary mobile={mobile} href="/for-clinics">For Clinics</Btn>
              )}
              <Btn mobile={mobile} href="/#about">Learn More</Btn>
            </div>
          </div>
          <div style={{ flex: mobile ? '0 0 auto' : '0 1 360px', width: mobile ? '220px' : 'auto', minWidth: mobile ? 'auto' : '260px', position: 'relative', zIndex: 1 }}>
            <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(196,162,101,0.12)', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/emma-hero.jpg" alt="Dr. Emma DiPonio, MD — Triple Board-Certified Physician" fetchPriority="high" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIAL BAR - "Medical Director" replaced, that title is gone */}
      <section style={{ background: P.navy, padding: mobile ? '20px 16px' : '24px 32px', display: 'flex', justifyContent: 'center', gap: mobile ? '20px' : 'clamp(24px, 5vw, 64px)', flexWrap: 'wrap' }}>
        {[
          { n: '25+', l: 'Years Experience' },
          { n: '3×', l: 'Board Certified' },
          { n: '1', l: 'U.S. Patent' },
          { n: 'MD', l: 'University of Michigan' }, // REWRITTEN
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center', minWidth: mobile ? '70px' : '110px' }}>
            <p style={{ fontFamily: F.d, fontSize: mobile ? '22px' : '26px', color: P.gold, margin: '0 0 2px' }}>{s.n}</p>
            <p style={{ fontFamily: F.b, fontSize: mobile ? '8px' : '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{s.l}</p>
          </div>
        ))}
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: sectionPad, background: P.cream }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'flex', gap: mobile ? '32px' : '56px', alignItems: 'center', flexWrap: 'wrap', flexDirection: mobile ? 'column' : 'row' }}>
          <FadeIn style={{ flex: mobile ? '0 0 auto' : '1 1 320px', width: mobile ? '200px' : 'auto', minWidth: mobile ? 'auto' : '240px' }}>
            <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(27,42,74,0.06)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/emma-headshot.jpg" alt="Dr. Emma DiPonio, MD headshot" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </FadeIn>
          <FadeIn delay={0.15} style={{ flex: '1 1 420px', minWidth: mobile ? '100%' : '280px' }}>
            <Label>About</Label>
            <h2 style={{ fontFamily: F.d, fontSize: mobile ? '26px' : 'clamp(26px, 4vw, 38px)', fontWeight: 400, color: P.navy, lineHeight: 1.25, margin: '0 0 20px' }}>
              A radiologist who doesn&apos;t just find disease — but helps you <em>prevent</em> it.
            </h2>
            <p style={{ fontSize: mobile ? '14px' : '15px', lineHeight: 1.8, color: P.mid, marginBottom: '14px' }}>
              I&apos;m Dr. Emma DiPonio — a board-certified diagnostic radiologist with 25+ years of experience and one of the very few physicians in the country who holds triple certification in Diagnostic Radiology, Venous &amp; Lymphatic Medicine, and Anti-Aging &amp; Precision Medicine.
            </p>
            <p style={{ fontSize: mobile ? '14px' : '15px', lineHeight: 1.8, color: P.mid, marginBottom: '14px' }}>
              Through advanced imaging and minimally invasive procedures, I help patients and physicians understand not just what&apos;s happening in the body today — but how you&apos;re aging, how your vascular system is performing, and where proactive intervention can change your trajectory.
            </p>
            {/* REWRITTEN - was the Lifespan Edge / Medical Director paragraph */}
            {/* EMMA-REVIEW */}
            <p style={{ fontSize: mobile ? '14px' : '15px', lineHeight: 1.8, color: P.mid, marginBottom: '24px' }}>
              I now practice independently, working remotely with patients seeking a second read on their imaging and with clinics that want radiology expertise built into how they order, protocol, and interpret scans.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['U of Michigan Med', 'A4M Certified', 'RPVI Certified', 'Patent Holder'].map((t, i) => (
                <Pill key={i}>{t}</Pill>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" style={{ padding: sectionPad, background: P.ivory }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <FadeIn>
            <Label center>Expertise</Label>
            <h2 style={{ fontFamily: F.d, fontSize: mobile ? '26px' : 'clamp(26px, 4vw, 36px)', fontWeight: 400, color: P.navy, textAlign: 'center', margin: '0 0 40px' }}>Three Certifications. One Vision.</h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { icon: '🩻', title: 'Diagnostic Radiology', desc: "CT, MRI, ultrasound, and vascular imaging — interpreting what's happening at the tissue and vessel level to guide smarter, personalized care." },
              { icon: '🫀', title: 'Venous & Lymphatic Medicine', desc: 'Minimally invasive vascular treatments with imaging guidance. RPVI certified for precision vascular interpretation. No major surgery, faster recovery.' },
              // REWRITTEN - was "...including TPE at Lifespan Edge."
              { icon: '🧬', title: 'Anti-Aging & Precision Medicine', desc: 'A4M certified. Integrating longevity science into imaging evaluation and proactive health strategies.' },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  style={{ background: P.white, borderRadius: '4px', padding: mobile ? '28px 22px' : '36px 28px', border: '1px solid rgba(27,42,74,0.05)', height: '100%', transition: 'transform 0.3s, box-shadow 0.3s' }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(27,42,74,0.07)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <span style={{ fontSize: '28px', display: 'block', marginBottom: '14px' }}>{c.icon}</span>
                  <h3 style={{ fontFamily: F.d, fontSize: mobile ? '18px' : '20px', fontWeight: 500, color: P.navy, marginBottom: '10px' }}>{c.title}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.75, color: P.mid }}>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WORK WITH ME - replaces the deleted Lifespan Edge section.
          Same slot, same rhythm, now pointing at her own two revenue paths. */}
      <section style={{ padding: sectionPadSm, background: P.cream }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <FadeIn>
            <Label center>Work With Me</Label>
            <h2 style={{ fontFamily: F.d, fontSize: mobile ? '26px' : 'clamp(26px, 4vw, 34px)', fontWeight: 400, color: P.navy, textAlign: 'center', margin: '0 0 36px' }}>Two ways to work together</h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              {
                eyebrow: 'For clinics',
                title: 'Imaging consulting',
                desc: 'Protocol review, radiologist-of-record relationships, and staff education for practices building imaging into longevity care.',
                href: '/for-clinics',
                cta: 'See clinic services',
                live: true,
              },
              {
                eyebrow: 'For patients',
                title: REVIEW_OFFER.name,
                desc: 'An independent second read of your imaging and report by a triple board-certified radiologist.',
                href: '/start',
                cta: REVIEW_OFFER.live ? 'See the review' : 'Opening soon',
                live: REVIEW_OFFER.live,
              },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: P.white, borderRadius: '4px', padding: mobile ? '28px 22px' : '36px 28px', border: '1px solid rgba(27,42,74,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: F.b, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: P.gold, background: 'rgba(196,162,101,0.1)', padding: '6px 14px', borderRadius: '2px', display: 'inline-block', alignSelf: 'flex-start' }}>{c.eyebrow}</span>
                  <h3 style={{ fontFamily: F.d, fontSize: mobile ? '20px' : '22px', fontWeight: 500, color: P.navy, margin: '14px 0 10px' }}>{c.title}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.75, color: P.mid, marginBottom: '20px', flex: 1 }}>{c.desc}</p>
                  {c.live ? (
                    <Link href={c.href} style={{ fontFamily: F.b, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: P.gold, textDecoration: 'none', borderBottom: `1px solid ${P.gold}`, paddingBottom: '4px', alignSelf: 'flex-start' }}>{c.cta} →</Link>
                  ) : (
                    <span style={{ fontFamily: F.b, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: P.light, alignSelf: 'flex-start' }}>{c.cta}</span>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* IN THE PRESS */}
      <section style={{ padding: sectionPadSm, background: P.ivory }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <FadeIn>
            <Label center>In the Press</Label>
            <h2 style={{ fontFamily: F.d, fontSize: mobile ? '24px' : 'clamp(24px, 3.5vw, 32px)', fontWeight: 400, color: P.navy, textAlign: 'center', margin: '0 0 32px' }}>Featured In</h2>
          </FadeIn>
          <FadeIn>
            <a href="https://globalwomanmagazine.com/are-women-rewriting-the-rules-of-longevity/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
              <div
                style={{ background: P.white, borderRadius: '4px', padding: mobile ? '28px 22px' : '40px 36px', border: '1px solid rgba(27,42,74,0.05)', display: 'flex', gap: mobile ? '20px' : '32px', alignItems: 'center', flexDirection: mobile ? 'column' : 'row', textAlign: mobile ? 'center' : 'left', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(27,42,74,0.07)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ flex: '0 0 auto', width: mobile ? '80px' : '100px', height: mobile ? '80px' : '100px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(196,162,101,0.1), rgba(196,162,101,0.05))', border: '1.5px solid rgba(196,162,101,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px', marginBottom: '2px' }}>📰</span>
                  <p style={{ fontFamily: F.b, fontSize: '7px', letterSpacing: '1.5px', textTransform: 'uppercase', color: P.gold, margin: 0 }}>Featured</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: F.b, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: P.gold, margin: '0 0 8px' }}>Global Woman Magazine</p>
                  <h3 style={{ fontFamily: F.d, fontSize: mobile ? '18px' : '22px', fontWeight: 500, fontStyle: 'italic', color: P.navy, margin: '0 0 10px', lineHeight: 1.35 }}>&ldquo;Are Women Rewriting the Rules of Longevity?&rdquo;</h3>
                  <p style={{ fontFamily: F.b, fontSize: '13px', color: P.mid, lineHeight: 1.6, margin: '0 0 12px' }}>Dr. DiPonio is featured in this Global Woman Magazine article exploring how women physicians and researchers are transforming the longevity and anti-aging space.</p>
                  <span style={{ fontFamily: F.b, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', color: P.gold, borderBottom: `1px solid ${P.gold}`, paddingBottom: '3px' }}>Read the Article →</span>
                </div>
              </div>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section style={{ padding: sectionPadSm, background: P.cream }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <FadeIn>
            <Label center>Portfolio</Label>
            <h2 style={{ fontFamily: F.d, fontSize: mobile ? '26px' : 'clamp(26px, 4vw, 34px)', fontWeight: 400, color: P.navy, textAlign: 'center', margin: '0 0 36px' }}>Beyond the Reading Room</h2>
          </FadeIn>

          <FadeIn>
            <div style={{ background: P.white, borderRadius: '4px', padding: mobile ? '24px 20px' : '32px 28px', marginBottom: '20px', border: '1px solid rgba(27,42,74,0.05)' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <Tag gold>Co-Founder &amp; Chief Medical Officer</Tag>
                <Tag>2019–2025</Tag>
              </div>
              <h3 style={{ fontFamily: F.d, fontSize: mobile ? '20px' : '22px', fontWeight: 500, color: P.navy, margin: '0 0 10px' }}>Abeytu Naturals</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: P.mid, marginBottom: '14px' }}>Co-founded a health supplement company specializing in natural, science-backed formulations for immune support and anti-aging. Developed and patented innovative products, including the award-winning CV Well immune support supplement — recognized industry-wide for its contribution to natural medicine.</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Award>🏆 CosmoProf Allé Award · Most Innovative Product</Award>
                <Award>📜 U.S. Patent No. 11,590,187</Award>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ background: P.white, borderRadius: '4px', padding: mobile ? '24px 20px' : '32px 28px', marginBottom: '20px', border: '1px solid rgba(27,42,74,0.05)' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <Tag gold>Founder &amp; Chief Medical Officer</Tag>
                <Tag>2011–2016</Tag>
              </div>
              <h3 style={{ fontFamily: F.d, fontSize: mobile ? '20px' : '22px', fontWeight: 500, color: P.navy, margin: '0 0 10px' }}>Iron Mountain Vein</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: P.mid, marginBottom: '14px' }}>Founded a specialized vein clinic dedicated to innovative, minimally invasive venous and lymphatic treatments. Led all clinical operations and patient care, bringing cutting-edge vascular interventions to the community.</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <SkillPill>Minimally Invasive Procedures</SkillPill>
                <SkillPill>Venous &amp; Lymphatic Care</SkillPill>
                <SkillPill>Imaging-Guided Treatments</SkillPill>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ background: P.white, borderRadius: '4px', padding: mobile ? '24px 20px' : '32px 28px', border: '1px solid rgba(27,42,74,0.05)' }}>
              <h3 style={{ fontFamily: F.d, fontSize: mobile ? '18px' : '20px', fontWeight: 500, color: P.navy, margin: '0 0 4px' }}>Radiology Practice</h3>
              {/* REWRITTEN - was "From the Midwest to Puerto Rico" */}
              <p style={{ fontSize: '12px', color: P.light, marginBottom: '18px' }}>Diagnostic precision across every setting.</p>
              {[
                // REWRITTEN - the Lifespan Edge row is gone; independent practice replaces it.
                { y: '2026–Current', r: 'Independent Practice', o: 'Second opinion imaging review · clinic consulting', l: 'Remote' },
                { y: '2019–Current', r: 'Emergency Radiologist', o: 'Remote Practice', l: 'Remote across United States' },
                { y: '2005–2019', r: 'Diagnostic & Interventional Radiologist', o: 'Multiple Institutions', l: 'United States' },
              ].map((item, i, arr) => (
                <div key={i} style={{ display: 'flex', gap: mobile ? '12px' : '20px', padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(27,42,74,0.04)' : 'none', flexDirection: mobile ? 'column' : 'row' }}>
                  <span style={{ fontFamily: F.b, fontSize: '12px', color: P.gold, minWidth: '110px', fontWeight: 600 }}>{item.y}</span>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: P.navy, margin: 0 }}>{item.r}</p>
                    <p style={{ fontSize: '12px', color: P.mid, margin: 0 }}>{item.o} · {item.l}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section style={{ padding: sectionPadSm, background: P.ivory }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <FadeIn>
            <Label center>Credentials</Label>
            <h2 style={{ fontFamily: F.d, fontSize: mobile ? '26px' : 'clamp(26px, 4vw, 34px)', fontWeight: 400, color: P.navy, textAlign: 'center', margin: '0 0 36px' }}>Education &amp; Certifications</h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { label: 'Education', items: [
                { t: 'Doctor of Medicine (M.D.)', s: 'University of Michigan Medical School', y: '1996–2000' },
                { t: 'Radiology Residency', s: 'Grand Rapids Medical Education Partners', y: '2000–2005' },
              ]},
              { label: 'Certifications', items: [
                { t: 'Diagnostic Radiology', s: 'The American Board of Radiology', y: '2006' },
                { t: 'Precision & Anti-Aging Medicine', s: 'American Academy of Anti-Aging Medicine (A4M)', y: '2025' },
                { t: 'RPVI — Vascular Interpretation', s: 'ARDMS', y: '2014' },
              ]},
              { label: 'Patent', items: [
                { t: 'Antimicrobial Compositions', s: 'U.S. Patent No. 11,590,187', y: 'Filed 2019' },
              ]},
            ].map((card, ci) => (
              <FadeIn key={ci} delay={ci * 0.08}>
                <div style={{ background: P.white, borderRadius: '4px', padding: mobile ? '22px 18px' : '26px 22px', border: '1px solid rgba(27,42,74,0.05)', height: '100%' }}>
                  <p style={{ fontFamily: F.b, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: P.gold, marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid rgba(27,42,74,0.04)' }}>{card.label}</p>
                  {card.items.map((item, i) => (
                    <div key={i} style={{ marginBottom: i < card.items.length - 1 ? '12px' : 0 }}>
                      <p style={{ fontFamily: F.d, fontSize: '15px', fontWeight: 500, color: P.navy, margin: '0 0 2px' }}>{item.t}</p>
                      <p style={{ fontSize: '12px', color: P.mid, margin: '0 0 1px' }}>{item.s}</p>
                      <p style={{ fontSize: '11px', color: P.light, margin: 0 }}>{item.y}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - no longer routes to the former-employer mailbox */}
      <section id="contact" style={{ padding: sectionPad, background: `linear-gradient(160deg, ${P.navy} 0%, ${P.navyMid} 100%)`, textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(196,162,101,0.05) 0%, transparent 50%)' }} />
        <FadeIn>
          <GoldRule center />
          <p style={{ fontFamily: F.b, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(196,162,101,0.8)', marginBottom: '10px', position: 'relative' }}>Let&apos;s Connect</p>
          <h2 style={{ fontFamily: F.d, fontSize: mobile ? '26px' : 'clamp(26px, 4vw, 36px)', fontWeight: 400, color: P.white, margin: '0 0 14px', position: 'relative' }}>Speaking, Partnerships &amp; Inquiries</h2>
          <p style={{ fontFamily: F.b, fontSize: mobile ? '14px' : '15px', color: 'rgba(255,255,255,0.5)', maxWidth: '460px', margin: '0 auto 28px', lineHeight: 1.7, position: 'relative' }}>
            Whether you&apos;re a patient, physician, or colleague in the longevity space — I&apos;d love to hear from you.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <Btn
              primary
              mobile={mobile}
              href={cta.href}
              {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {cta.label}
            </Btn>
            <Btn mobile={mobile} href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram</Btn>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
