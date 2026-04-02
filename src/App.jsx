import { useState, useEffect, useRef } from "react";

function useOnScreen(ref, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return visible;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef();
  const visible = useOnScreen(ref);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

const P = {
  navy: "#1B2A4A", cream: "#FAF6F1", ivory: "#F5F0E8",
  gold: "#C4A265", goldLight: "#D4B87A",
  dark: "#2A2520", mid: "#5A5249", light: "#9A9089", white: "#FFFFFF",
};
const F = { d: "'Playfair Display', Georgia, serif", b: "'DM Sans', 'Helvetica Neue', sans-serif" };

function useIsMobile(breakpoint = 640) {
  const [mobile, setMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < breakpoint : false);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [breakpoint]);
  return mobile;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const mobile = useIsMobile();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const px = mobile ? "20px" : "32px";
  const sectionPad = mobile ? "56px 20px" : "clamp(64px, 10vw, 120px) 32px";
  const sectionPadSm = mobile ? "48px 20px" : "clamp(56px, 8vw, 100px) 32px";

  return (
    <div style={{ fontFamily: F.b, color: P.dark, background: P.cream, overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(250,246,241,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(27,42,74,0.06)" : "none",
        transition: "all 0.4s ease",
        padding: scrolled ? `12px ${px}` : `20px ${px}`,
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span style={{ fontFamily: F.d, fontSize: mobile ? "17px" : "20px", fontWeight: 700, color: scrolled ? P.navy : P.white, transition: "color 0.4s" }}>
              Dr. Emma DiPonio
            </span>
            <span style={{ fontFamily: F.b, fontSize: "11px", letterSpacing: "2px", color: scrolled ? P.gold : "rgba(255,255,255,0.6)", marginLeft: "6px", transition: "color 0.4s" }}>MD</span>
          </div>
          <div style={{ display: "flex", gap: mobile ? "16px" : "28px", alignItems: "center" }}>
            {["About", "Expertise", "Contact"].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} style={{
                background: "none", border: "none", cursor: "pointer", padding: 0,
                fontFamily: F.b, fontSize: mobile ? "10px" : "12px", letterSpacing: "1.5px", textTransform: "uppercase",
                color: scrolled ? P.mid : "rgba(255,255,255,0.8)", transition: "color 0.3s",
              }}
                onMouseOver={(e) => e.target.style.color = P.gold}
                onMouseOut={(e) => e.target.style.color = scrolled ? P.mid : "rgba(255,255,255,0.8)"}
              >{item}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        background: `linear-gradient(160deg, ${P.navy} 0%, #243656 40%, #1a3050 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 30%, rgba(196,162,101,0.07) 0%, transparent 55%)" }} />
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          flexWrap: "wrap", gap: mobile ? "32px" : "48px",
          padding: mobile ? "120px 20px 60px" : "140px 32px 80px",
          maxWidth: "1100px", margin: "0 auto", width: "100%",
          flexDirection: mobile ? "column-reverse" : "row",
        }}>
          <div style={{ flex: "1 1 420px", minWidth: mobile ? "100%" : "280px", position: "relative", zIndex: 1, textAlign: mobile ? "center" : "left" }}>
            {!mobile && <div style={{ width: "1px", height: "60px", background: `linear-gradient(to bottom, transparent, ${P.gold})`, marginBottom: "24px" }} />}
            <p style={{ fontFamily: F.b, fontSize: mobile ? "11px" : "12px", letterSpacing: "4px", textTransform: "uppercase", color: P.gold, marginBottom: "20px" }}>
              Triple Board-Certified Physician
            </p>
            <h1 style={{ fontFamily: F.d, fontSize: mobile ? "36px" : "clamp(34px, 5.5vw, 56px)", fontWeight: 400, color: P.white, lineHeight: 1.15, margin: "0 0 20px" }}>
              See deeper.
              <br />
              <em style={{ color: P.goldLight }}>Live longer.</em>
            </h1>
            <p style={{ fontFamily: F.b, fontSize: mobile ? "14px" : "16px", color: "rgba(255,255,255,0.55)", maxWidth: "460px", lineHeight: 1.7, marginBottom: "32px", ...(mobile && { margin: "0 auto 32px" }) }}>
              Diagnostic radiology meets longevity science. 25+ years of precision imaging, now advancing the future of Therapeutic Plasma Exchange at Lifespan Edge.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", ...(mobile && { justifyContent: "center" }) }}>
              <Btn onClick={() => scrollTo("contact")} primary mobile={mobile}>Get in Touch</Btn>
              <Btn onClick={() => scrollTo("about")} mobile={mobile}>Learn More</Btn>
            </div>
          </div>
          {/* PHOTO: pro-pic-1.jpg (full body) */}
          <div style={{ flex: mobile ? "0 0 auto" : "0 1 360px", width: mobile ? "220px" : "auto", minWidth: mobile ? "auto" : "260px", position: "relative", zIndex: 1 }}>
            <div style={{
              borderRadius: "4px", overflow: "hidden",
              border: "1px solid rgba(196,162,101,0.12)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
            }}>
              <img
                src="/emma-hero.jpg"
                alt="Dr. Emma DiPonio, MD — Triple Board-Certified Physician"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIAL BAR */}
      <section style={{
        background: P.navy, padding: mobile ? "20px 16px" : "24px 32px",
        display: "flex", justifyContent: "center", gap: mobile ? "20px" : "clamp(24px, 5vw, 64px)", flexWrap: "wrap",
      }}>
        {[
          { n: "25+", l: "Years Experience" },
          { n: "3×", l: "Board Certified" },
          { n: "1", l: "U.S. Patent" },
          { n: "MD", l: "Medical Director" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center", minWidth: mobile ? "70px" : "110px" }}>
            <p style={{ fontFamily: F.d, fontSize: mobile ? "22px" : "26px", color: P.gold, margin: "0 0 2px" }}>{s.n}</p>
            <p style={{ fontFamily: F.b, fontSize: mobile ? "8px" : "10px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: 0 }}>{s.l}</p>
          </div>
        ))}
      </section>

      {/* ABOUT — pro-pic-2.jpg headshot */}
      <section id="about" style={{ padding: sectionPad, background: P.cream }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto", display: "flex", gap: mobile ? "32px" : "56px", alignItems: "center", flexWrap: "wrap", flexDirection: mobile ? "column" : "row" }}>
          <FadeIn style={{ flex: mobile ? "0 0 auto" : "1 1 320px", width: mobile ? "200px" : "auto", minWidth: mobile ? "auto" : "240px" }}>
            <div style={{
              borderRadius: "4px", overflow: "hidden",
              border: "1px solid rgba(27,42,74,0.06)",
            }}>
              <img
                src="/emma-headshot.jpg"
                alt="Dr. Emma DiPonio headshot"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.15} style={{ flex: "1 1 420px", minWidth: mobile ? "100%" : "280px" }}>
            <Label>About</Label>
            <h2 style={{ fontFamily: F.d, fontSize: mobile ? "26px" : "clamp(26px, 4vw, 38px)", fontWeight: 400, color: P.navy, lineHeight: 1.25, margin: "0 0 20px" }}>
              A radiologist who doesn't just find disease — but helps you <em>prevent</em> it.
            </h2>
            <p style={{ fontSize: mobile ? "14px" : "15px", lineHeight: 1.8, color: P.mid, marginBottom: "14px" }}>
              I'm Dr. Emma DiPonio — a board-certified diagnostic radiologist with 25+ years of experience and one of the very few physicians in the country who holds triple certification in Diagnostic Radiology, Venous & Lymphatic Medicine, and Anti-Aging & Precision Medicine.
            </p>
            <p style={{ fontSize: mobile ? "14px" : "15px", lineHeight: 1.8, color: P.mid, marginBottom: "14px" }}>
              Through advanced imaging and minimally invasive procedures, I help patients and physicians understand not just what's happening in the body today — but how you're aging, how your vascular system is performing, and where proactive intervention can change your trajectory.
            </p>
            <p style={{ fontSize: mobile ? "14px" : "15px", lineHeight: 1.8, color: P.mid, marginBottom: "24px" }}>
              As Medical Director of the Dorado, Puerto Rico location of <strong>Lifespan Edge</strong>, I'm now at the frontier of longevity science — leading clinical efforts in Therapeutic Plasma Exchange (TPE) to help people live longer, healthier, more vibrant lives.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["U of Michigan Med", "A4M Certified", "RPVI Certified", "Patent Holder"].map((t, i) => (
                <Pill key={i}>{t}</Pill>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" style={{ padding: sectionPad, background: P.ivory }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <FadeIn>
            <Label center>Expertise</Label>
            <h2 style={{ fontFamily: F.d, fontSize: mobile ? "26px" : "clamp(26px, 4vw, 36px)", fontWeight: 400, color: P.navy, textAlign: "center", margin: "0 0 40px" }}>Three Certifications. One Vision.</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {[
              { icon: "🩻", title: "Diagnostic Radiology", desc: "CT, MRI, ultrasound, and vascular imaging — interpreting what's happening at the tissue and vessel level to guide smarter, personalized care." },
              { icon: "🫀", title: "Venous & Lymphatic Medicine", desc: "Minimally invasive vascular treatments with imaging guidance. RPVI certified for precision vascular interpretation. No major surgery, faster recovery." },
              { icon: "🧬", title: "Anti-Aging & Precision Medicine", desc: "A4M certified. Integrating longevity science into imaging evaluation and proactive health strategies — including TPE at Lifespan Edge." },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: P.white, borderRadius: "4px", padding: mobile ? "28px 22px" : "36px 28px", border: "1px solid rgba(27,42,74,0.05)", height: "100%", transition: "transform 0.3s, box-shadow 0.3s" }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 36px rgba(27,42,74,0.07)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <span style={{ fontSize: "28px", display: "block", marginBottom: "14px" }}>{c.icon}</span>
                  <h3 style={{ fontFamily: F.d, fontSize: mobile ? "18px" : "20px", fontWeight: 500, color: P.navy, marginBottom: "10px" }}>{c.title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.75, color: P.mid }}>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESPAN EDGE */}
      <section style={{ padding: sectionPadSm, background: P.cream }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto", display: "flex", gap: mobile ? "28px" : "48px", alignItems: "center", flexWrap: "wrap", flexDirection: mobile ? "column" : "row" }}>
          <FadeIn style={{ flex: "1 1 420px", minWidth: mobile ? "100%" : "280px" }}>
            <span style={{ fontFamily: F.b, fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: P.gold, background: "rgba(196,162,101,0.1)", padding: "6px 14px", borderRadius: "2px", display: "inline-block" }}>Medical Director · Dorado, PR Location</span>
            <h2 style={{ fontFamily: F.d, fontSize: mobile ? "26px" : "clamp(26px, 4vw, 34px)", fontWeight: 400, color: P.navy, margin: "14px 0 14px" }}>Lifespan Edge</h2>
            <p style={{ fontSize: mobile ? "14px" : "15px", lineHeight: 1.8, color: P.mid, marginBottom: "14px" }}>
              Lifespan Edge is a longevity clinic at the frontier of science, offering personalized, data-driven treatments like Therapeutic Plasma Exchange (TPE) to help people live longer, healthier, and more vibrant lives.
            </p>
            <p style={{ fontSize: mobile ? "14px" : "15px", lineHeight: 1.8, color: P.mid, marginBottom: "22px" }}>
              TPE filters inflammatory proteins, damaged molecules, and waste from your bloodstream — helping your body reset at the cellular level. As Medical Director of the Dorado, Puerto Rico location, I lead clinical strategy at the intersection of precision imaging and longevity medicine.
            </p>
            <a href="https://lifespan-edge.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.b, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: P.gold, textDecoration: "none", borderBottom: `1px solid ${P.gold}`, paddingBottom: "4px" }}>Visit Lifespan Edge →</a>
          </FadeIn>
          <FadeIn delay={0.1} style={{ flex: "1 1 360px", minWidth: mobile ? "100%" : "280px" }}>
            <a href="https://youtu.be/LEd5lWptqWg" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
              <div style={{ aspectRatio: "16/9", background: `linear-gradient(135deg, ${P.navy}, #243656)`, borderRadius: "4px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid rgba(196,162,101,0.1)", cursor: "pointer", transition: "border-color 0.3s, transform 0.3s" }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(196,162,101,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(196,162,101,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ width: mobile ? "52px" : "64px", height: mobile ? "52px" : "64px", borderRadius: "50%", background: "rgba(196,162,101,0.12)", border: `2px solid ${P.gold}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: mobile ? "20px" : "24px", marginLeft: "3px", color: P.gold }}>▶</span>
                </div>
                <p style={{ fontFamily: F.b, fontSize: "13px", color: "rgba(255,255,255,0.7)", margin: "0 0 4px" }}>Watch the Documentary</p>
                <p style={{ fontFamily: F.b, fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Lifespan Edge · YouTube</p>
              </div>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* IN THE PRESS */}
      <section style={{ padding: sectionPadSm, background: P.ivory }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <FadeIn>
            <Label center>In the Press</Label>
            <h2 style={{ fontFamily: F.d, fontSize: mobile ? "24px" : "clamp(24px, 3.5vw, 32px)", fontWeight: 400, color: P.navy, textAlign: "center", margin: "0 0 32px" }}>Featured In</h2>
          </FadeIn>
          <FadeIn>
            <a href="https://globalwomanmagazine.com/are-women-rewriting-the-rules-of-longevity/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
              <div style={{ background: P.white, borderRadius: "4px", padding: mobile ? "28px 22px" : "40px 36px", border: "1px solid rgba(27,42,74,0.05)", display: "flex", gap: mobile ? "20px" : "32px", alignItems: "center", flexDirection: mobile ? "column" : "row", textAlign: mobile ? "center" : "left", transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer" }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(27,42,74,0.07)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ flex: "0 0 auto", width: mobile ? "80px" : "100px", height: mobile ? "80px" : "100px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(196,162,101,0.1), rgba(196,162,101,0.05))", border: "1.5px solid rgba(196,162,101,0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "24px", marginBottom: "2px" }}>📰</span>
                  <p style={{ fontFamily: F.b, fontSize: "7px", letterSpacing: "1.5px", textTransform: "uppercase", color: P.gold, margin: 0 }}>Featured</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: F.b, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: P.gold, margin: "0 0 8px" }}>Global Woman Magazine</p>
                  <h3 style={{ fontFamily: F.d, fontSize: mobile ? "18px" : "22px", fontWeight: 500, fontStyle: "italic", color: P.navy, margin: "0 0 10px", lineHeight: 1.35 }}>"Are Women Rewriting the Rules of Longevity?"</h3>
                  <p style={{ fontFamily: F.b, fontSize: "13px", color: P.mid, lineHeight: 1.6, margin: "0 0 12px" }}>Dr. DiPonio is featured in this Global Woman Magazine article exploring how women physicians and researchers are transforming the longevity and anti-aging space.</p>
                  <span style={{ fontFamily: F.b, fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: P.gold, borderBottom: `1px solid ${P.gold}`, paddingBottom: "3px" }}>Read the Article →</span>
                </div>
              </div>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section style={{ padding: sectionPadSm, background: P.cream }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <FadeIn>
            <Label center>Portfolio</Label>
            <h2 style={{ fontFamily: F.d, fontSize: mobile ? "26px" : "clamp(26px, 4vw, 34px)", fontWeight: 400, color: P.navy, textAlign: "center", margin: "0 0 36px" }}>Beyond the Reading Room</h2>
          </FadeIn>

          {/* Abeytu Naturals */}
          <FadeIn>
            <div style={{ background: P.white, borderRadius: "4px", padding: mobile ? "24px 20px" : "32px 28px", marginBottom: "20px", border: "1px solid rgba(27,42,74,0.05)" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                <Tag gold>Co-Founder & Chief Medical Officer</Tag>
                <Tag>2019–2025</Tag>
              </div>
              <h3 style={{ fontFamily: F.d, fontSize: mobile ? "20px" : "22px", fontWeight: 500, color: P.navy, margin: "0 0 10px" }}>Abeytu Naturals</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.75, color: P.mid, marginBottom: "14px" }}>Co-founded a health supplement company specializing in natural, science-backed formulations for immune support and anti-aging. Developed and patented innovative products, including the award-winning CV Well immune support supplement — recognized industry-wide for its contribution to natural medicine.</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <Award>🏆 CosmoProf Allé Award · Most Innovative Product</Award>
                <Award>📜 U.S. Patent No. 11,590,187</Award>
              </div>
            </div>
          </FadeIn>

          {/* Iron Mountain Vein */}
          <FadeIn delay={0.1}>
            <div style={{ background: P.white, borderRadius: "4px", padding: mobile ? "24px 20px" : "32px 28px", marginBottom: "20px", border: "1px solid rgba(27,42,74,0.05)" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                <Tag gold>Founder & Chief Medical Officer</Tag>
                <Tag>2011–2016</Tag>
              </div>
              <h3 style={{ fontFamily: F.d, fontSize: mobile ? "20px" : "22px", fontWeight: 500, color: P.navy, margin: "0 0 10px" }}>Iron Mountain Vein</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.75, color: P.mid, marginBottom: "14px" }}>Founded a specialized vein clinic dedicated to innovative, minimally invasive venous and lymphatic treatments. Led all clinical operations and patient care, bringing cutting-edge vascular interventions to the community.</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <SkillPill>Minimally Invasive Procedures</SkillPill>
                <SkillPill>Venous & Lymphatic Care</SkillPill>
                <SkillPill>Imaging-Guided Treatments</SkillPill>
              </div>
            </div>
          </FadeIn>

          {/* Radiology Practice Locations */}
          <FadeIn delay={0.2}>
            <div style={{ background: P.white, borderRadius: "4px", padding: mobile ? "24px 20px" : "32px 28px", border: "1px solid rgba(27,42,74,0.05)" }}>
              <h3 style={{ fontFamily: F.d, fontSize: mobile ? "18px" : "20px", fontWeight: 500, color: P.navy, margin: "0 0 4px" }}>Radiology Practice Locations</h3>
              <p style={{ fontSize: "12px", color: P.light, marginBottom: "18px" }}>From the Midwest to Puerto Rico — diagnostic precision across every setting.</p>
              {[
                { y: "2025–Current", r: "Medical Director, Dorado Location", o: "Lifespan Edge", l: "Dorado, Puerto Rico" },
                { y: "2019–Current", r: "Emergency Radiologist", o: "Remote Practice", l: "Remote across United States" },
                { y: "2005–2019", r: "Diagnostic & Interventional Radiologist", o: "Multiple Institutions", l: "United States" },
              ].map((item, i, arr) => (
                <div key={i} style={{ display: "flex", gap: mobile ? "12px" : "20px", padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(27,42,74,0.04)" : "none", flexDirection: mobile ? "column" : "row" }}>
                  <span style={{ fontFamily: F.b, fontSize: "12px", color: P.gold, minWidth: "110px", fontWeight: 600 }}>{item.y}</span>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: P.navy, margin: 0 }}>{item.r}</p>
                    <p style={{ fontSize: "12px", color: P.mid, margin: 0 }}>{item.o} · {item.l}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section style={{ padding: sectionPadSm, background: P.ivory }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <FadeIn>
            <Label center>Credentials</Label>
            <h2 style={{ fontFamily: F.d, fontSize: mobile ? "26px" : "clamp(26px, 4vw, 34px)", fontWeight: 400, color: P.navy, textAlign: "center", margin: "0 0 36px" }}>Education & Certifications</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {[
              { label: "Education", items: [
                { t: "Doctor of Medicine (M.D.)", s: "University of Michigan Medical School", y: "1996–2000" },
                { t: "Radiology Residency", s: "Grand Rapids Medical Education Partners", y: "2000–2005" },
              ]},
              { label: "Certifications", items: [
                { t: "Diagnostic Radiology", s: "The American Board of Radiology", y: "2006" },
                { t: "Precision & Anti-Aging Medicine", s: "American Academy of Anti-Aging Medicine (A4M)", y: "2025" },
                { t: "RPVI — Vascular Interpretation", s: "ARDMS", y: "2014" },
              ]},
              { label: "Patent", items: [
                { t: "Antimicrobial Compositions", s: "U.S. Patent No. 11,590,187", y: "Filed 2019" },
              ]},
            ].map((card, ci) => (
              <FadeIn key={ci} delay={ci * 0.08}>
                <div style={{ background: P.white, borderRadius: "4px", padding: mobile ? "22px 18px" : "26px 22px", border: "1px solid rgba(27,42,74,0.05)", height: "100%" }}>
                  <p style={{ fontFamily: F.b, fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: P.gold, marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid rgba(27,42,74,0.04)" }}>{card.label}</p>
                  {card.items.map((item, i) => (
                    <div key={i} style={{ marginBottom: i < card.items.length - 1 ? "12px" : 0 }}>
                      <p style={{ fontFamily: F.d, fontSize: "15px", fontWeight: 500, color: P.navy, margin: "0 0 2px" }}>{item.t}</p>
                      <p style={{ fontSize: "12px", color: P.mid, margin: "0 0 1px" }}>{item.s}</p>
                      <p style={{ fontSize: "11px", color: P.light, margin: 0 }}>{item.y}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: sectionPad, background: `linear-gradient(160deg, ${P.navy} 0%, #243656 100%)`, textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, rgba(196,162,101,0.05) 0%, transparent 50%)" }} />
        <FadeIn>
          <div style={{ width: "1px", height: "50px", background: `linear-gradient(to bottom, transparent, ${P.gold})`, margin: "0 auto 22px", position: "relative" }} />
          <p style={{ fontFamily: F.b, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(196,162,101,0.8)", marginBottom: "10px", position: "relative" }}>Let's Connect</p>
          <h2 style={{ fontFamily: F.d, fontSize: mobile ? "26px" : "clamp(26px, 4vw, 36px)", fontWeight: 400, color: P.white, margin: "0 0 14px", position: "relative" }}>Speaking, Partnerships & Inquiries</h2>
          <p style={{ fontFamily: F.b, fontSize: mobile ? "14px" : "15px", color: "rgba(255,255,255,0.5)", maxWidth: "460px", margin: "0 auto 28px", lineHeight: 1.7, position: "relative" }}>Whether you're a patient, physician, or colleague in the longevity space — I'd love to hear from you.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <Btn primary mobile={mobile} onClick={() => window.location.href = "mailto:emmad@lifespan-edge.com"}>Email Dr. DiPonio</Btn>
            <Btn mobile={mobile} onClick={() => window.open("https://www.linkedin.com/in/dr-emma-diponio-md-24b5778a/", "_blank")}>LinkedIn</Btn>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#141E33", padding: mobile ? "28px 20px" : "32px 32px", textAlign: "center", borderTop: "1px solid rgba(196,162,101,0.08)" }}>
        <p style={{ fontFamily: F.d, fontSize: "16px", color: "rgba(255,255,255,0.5)", margin: "0 0 6px" }}>Dr. Emma DiPonio, MD</p>
        <p style={{ fontFamily: F.b, fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "1.5px", margin: "0 0 12px" }}>Dorado, Puerto Rico</p>
        <div style={{ display: "flex", gap: mobile ? "14px" : "18px", justifyContent: "center", marginBottom: "14px", flexWrap: "wrap" }}>
          {[
            { name: "LinkedIn", url: "https://www.linkedin.com/in/dr-emma-diponio-md-24b5778a/" },
            { name: "Instagram", url: "https://www.instagram.com/emmadiponio.md/" },
            { name: "Lifespan Edge", url: "https://lifespan-edge.com/" },
            { name: "Abeytu Naturals", url: "https://www.abeytunaturals.com" },
          ].map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.b, fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.3s" }}
              onMouseOver={(e) => e.target.style.color = P.gold}
              onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.25)"}
            >{link.name}</a>
          ))}
        </div>
        <div style={{ width: "32px", height: "1px", background: "rgba(196,162,101,0.15)", margin: "0 auto 10px" }} />
        <p style={{ fontFamily: F.b, fontSize: "10px", color: "rgba(255,255,255,0.12)", letterSpacing: "1px" }}>© 2026 Dr. Emma DiPonio, MD</p>
      </footer>
    </div>
  );
}

function Label({ children, center }) {
  return <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#C4A265", marginBottom: "10px", textAlign: center ? "center" : "left", position: "relative" }}>{children}</p>;
}
function Btn({ children, primary, onClick, mobile }) {
  return <button onClick={onClick} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? "11px" : "12px", letterSpacing: "2px", textTransform: "uppercase", padding: mobile ? "14px 28px" : "15px 34px", borderRadius: "2px", cursor: "pointer", fontWeight: primary ? 600 : 400, background: primary ? "#C4A265" : "transparent", color: primary ? "#1B2A4A" : "rgba(255,255,255,0.75)", border: primary ? "none" : "1px solid rgba(255,255,255,0.2)", transition: "all 0.3s", width: mobile ? "100%" : "auto" }}>{children}</button>;
}
function Pill({ children }) {
  return <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", padding: "7px 14px", background: "rgba(27,42,74,0.03)", borderRadius: "2px", color: "#5A5249", border: "1px solid rgba(27,42,74,0.07)" }}>{children}</span>;
}
function Tag({ children, gold }) {
  return <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: gold ? "#C4A265" : "#5A5249", background: gold ? "rgba(196,162,101,0.1)" : "rgba(27,42,74,0.04)", padding: "5px 12px", borderRadius: "2px" }}>{children}</span>;
}
function Award({ children }) {
  return <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", padding: "7px 14px", background: "rgba(196,162,101,0.07)", borderRadius: "2px", color: "#C4A265", border: "1px solid rgba(196,162,101,0.12)", display: "inline-block" }}>{children}</span>;
}
function SkillPill({ children }) {
  return <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", padding: "6px 14px", background: "rgba(27,42,74,0.04)", borderRadius: "2px", color: "#5A5249", border: "1px solid rgba(27,42,74,0.06)", display: "inline-block" }}>{children}</span>;
}
