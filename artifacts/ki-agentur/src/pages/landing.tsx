import { useState, useEffect, useRef } from "react";
import { useConsent } from "@/context/ConsentContext";

const ACCENT = "#c1ff72";

// Large L-shaped corner brackets spanning a significant portion of the section
function SectionCorners() {
  const corner = (top: boolean, left: boolean) => (
    <div
      style={{
        position: "absolute",
        ...(top ? { top: 0 } : { bottom: 0 }),
        ...(left ? { left: 0 } : { right: 0 }),
        pointerEvents: "none",
      }}
    >
      {/* Horizontal arm */}
      <div style={{
        position: "absolute",
        ...(top ? { top: 0 } : { bottom: 0 }),
        ...(left ? { left: 0 } : { right: 0 }),
        width: "38vw",
        height: 2,
        background: left
          ? `linear-gradient(to right, ${ACCENT} 0%, rgba(193,255,114,0.3) 60%, transparent 100%)`
          : `linear-gradient(to left, ${ACCENT} 0%, rgba(193,255,114,0.3) 60%, transparent 100%)`,
        opacity: 0.7,
      }} />
      {/* Vertical arm */}
      <div style={{
        position: "absolute",
        ...(top ? { top: 0 } : { bottom: 0 }),
        ...(left ? { left: 0 } : { right: 0 }),
        width: 2,
        height: 180,
        background: top
          ? `linear-gradient(to bottom, ${ACCENT} 0%, rgba(193,255,114,0.3) 60%, transparent 100%)`
          : `linear-gradient(to top, ${ACCENT} 0%, rgba(193,255,114,0.3) 60%, transparent 100%)`,
        opacity: 0.7,
      }} />
    </div>
  );

  return (
    <>
      {corner(true, true)}
      {corner(true, false)}
      {corner(false, true)}
      {corner(false, false)}
    </>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(10,10,10,0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="w-full px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-0">
          <img src="/logo.png" alt="Logo" className="h-9 w-9 object-contain" />
          <span className="font-semibold text-white text-base tracking-wide -ml-1.5">
            RevenueFlow Systems
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Prozess", href: "#prozess" },
            { label: "Leistungen", href: "#leistungen" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-base text-white/60 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://www.instagram.com/revenueflow.systems/?hl=de"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-colors"
            style={{ color: "rgba(255,255,255,0.45)" }}
            onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="#kontakt"
            className="text-base font-semibold px-5 py-2.5 rounded-lg transition-all"
            style={{
              background: ACCENT,
              color: "#0a0a0a",
            }}
          >
            Kostenlos beraten lassen
          </a>
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 12h18M3 6h18M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "rgba(10,10,10,0.98)" }}
        >
          {[
            { label: "Prozess", href: "#prozess" },
            { label: "Leistungen", href: "#leistungen" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-base text-white/70 hover:text-white transition-colors py-2 border-b border-white/5"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="text-base font-semibold px-4 py-3 rounded-lg text-center mt-2"
            style={{ background: ACCENT, color: "#0a0a0a" }}
            onClick={() => setMenuOpen(false)}
          >
            Kostenlos beraten lassen
          </a>
        </div>
      )}
    </header>
  );
}

const GRID = 60;

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const appliedRef = useRef(0);
  const [snapPad, setSnapPad] = useState(0);

  useEffect(() => {
    function snap() {
      const el = sectionRef.current;
      if (!el) return;
      // Subtract padding we already applied to get the natural height
      const naturalH = el.offsetHeight - appliedRef.current;
      const rem = naturalH % GRID;
      const needed = rem === 0 ? 0 : GRID - rem;
      if (needed !== appliedRef.current) {
        appliedRef.current = needed;
        setSnapPad(needed);
      }
    }
    snap();
    window.addEventListener("resize", snap);
    return () => window.removeEventListener("resize", snap);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center px-5 md:px-16 pt-20 md:pt-24"
      style={snapPad > 0 ? { paddingBottom: snapPad } : undefined}
    >

      {/* Top-left corner */}
      <div style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "38vw", height: 2, background: `linear-gradient(to right, ${ACCENT} 0%, rgba(193,255,114,0.3) 60%, transparent 100%)`, opacity: 0.7 }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: 180, background: `linear-gradient(to bottom, ${ACCENT} 0%, rgba(193,255,114,0.3) 60%, transparent 100%)`, opacity: 0.7 }} />
      </div>
      {/* Top-right corner */}
      <div style={{ position: "absolute", top: 0, right: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "38vw", height: 2, background: `linear-gradient(to left, ${ACCENT} 0%, rgba(193,255,114,0.3) 60%, transparent 100%)`, opacity: 0.7 }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 2, height: 180, background: `linear-gradient(to bottom, ${ACCENT} 0%, rgba(193,255,114,0.3) 60%, transparent 100%)`, opacity: 0.7 }} />
      </div>
      {/* Bottom-left corner — at section bottom (hero/process boundary) */}
      <div style={{ position: "absolute", bottom: 0, left: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "38vw", height: 2, background: `linear-gradient(to right, ${ACCENT} 0%, rgba(193,255,114,0.3) 60%, transparent 100%)`, opacity: 0.7 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 2, height: 180, background: `linear-gradient(to top, ${ACCENT} 0%, rgba(193,255,114,0.3) 60%, transparent 100%)`, opacity: 0.7 }} />
      </div>
      {/* Bottom-right corner — at section bottom (hero/process boundary) */}
      <div style={{ position: "absolute", bottom: 0, right: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "38vw", height: 2, background: `linear-gradient(to left, ${ACCENT} 0%, rgba(193,255,114,0.3) 60%, transparent 100%)`, opacity: 0.7 }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 2, height: 180, background: `linear-gradient(to top, ${ACCENT} 0%, rgba(193,255,114,0.3) 60%, transparent 100%)`, opacity: 0.7 }} />
      </div>

      {/* Glow orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(193,255,114,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-6xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-5 sm:mb-8 border"
          style={{
            color: ACCENT,
            borderColor: "rgba(193,255,114,0.3)",
            background: "rgba(193,255,114,0.05)",
          }}
        >
          <span className="w-2 h-2 rounded-full inline-block flex-shrink-0" style={{ background: ACCENT }} />
          <span>Kostenlose Erstberatung — 15 Min., keine Verpflichtung</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 sm:mb-6 leading-[1.05] tracking-tight">
          Nie wieder verpasste
          <br />
          <span style={{ color: ACCENT }}>Kundenanfragen.</span>
        </h1>

        <p className="text-sm sm:text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2">
          Ich automatisiere deine Anrufe und Nachrichten, damit jede Anfrage sofort
          beantwortet und in einen Termin verwandelt wird.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-5 rounded-xl font-semibold text-base sm:text-lg transition-all hover:opacity-90 active:scale-95"
            style={{ background: ACCENT, color: "#0a0a0a" }}
          >
            Jetzt 15 Min. Erstgespräch buchen
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#prozess"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-5 rounded-xl font-semibold text-base sm:text-lg transition-all hover:opacity-90 active:scale-95"
            style={{ background: "#ffffff", color: "#0a0a0a" }}
          >
            Prozess ansehen
          </a>
        </div>

        <div
          className="inline-flex items-center gap-2 sm:gap-3 mt-5 sm:mt-8 px-4 sm:px-6 py-3 sm:py-4 rounded-xl whitespace-nowrap"
          style={{
            background: "rgba(193,255,114,0.07)",
            border: "1px solid rgba(193,255,114,0.25)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" className="sm:w-[22px] sm:h-[22px] flex-shrink-0">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm sm:text-base font-semibold" style={{ color: ACCENT }}>
            100% DSGVO-konform
          </span>
          <span className="hidden sm:inline text-sm sm:text-base text-white/40">— Deine Daten sind bei uns sicher</span>
        </div>

        <div className="mt-6 sm:mt-10 grid grid-cols-3 gap-4 sm:flex sm:items-center sm:justify-center sm:gap-14">
          {[
            { number: "100%", label: "Individuelle Lösungen" },
            { number: "15 Min.", label: "Erstberatung" },
            { number: "∞", label: "Skalierbarkeit" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-6xl font-bold" style={{ color: ACCENT }}>
                {stat.number}
              </div>
              <div className="text-xs sm:text-lg text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

const steps = [
  {
    number: "01",
    title: "Kostenlose Erstberatung",
    duration: "15 Minuten",
    description: "Wir schauen gemeinsam, wo in deinem Business KI den größten Hebel hat.",
    highlight: "Kein Verkaufsgespräch. Nur ehrliche Analyse.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 10h8M8 14h5M5 3h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Strategie & Konzept",
    duration: "1–2 Tage",
    description: "Du bekommst einen konkreten Umsetzungsplan mit Meilensteinen und erwartetem ROI.",
    highlight: "Transparent, verständlich, umsetzbar.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "KI-Implementierung",
    duration: "1–4 Wochen",
    description: "Ich baue und integriere KI-Agenten direkt in deine bestehenden Tools und Workflows.",
    highlight: "Keine Unterbrechung deines laufenden Business.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Testing & Optimierung",
    duration: "Laufend",
    description: "Wir testen alle Systeme und ich begleite dich, bis alles reibungslos läuft.",
    highlight: "Vollständiger Support bis zum Go-live.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Laufender Support",
    duration: "Dauerhaft",
    description: "Solange du die KI in deinem Unternehmen nutzt, bin ich für dich da — bei Fragen, Anpassungen oder Erweiterungen.",
    highlight: "Kein Vertrag ohne Ende. Support so lange du ihn brauchst.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function ProcessSection() {
  const [activeSteps, setActiveSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSteps((prev) => new Set([...prev, i]));
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="prozess" className="relative py-24 md:py-40 px-5 md:px-8 lg:px-16 overflow-hidden">
      <SectionCorners />
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <div
            className="inline-block text-sm font-medium px-4 py-1.5 rounded-full mb-5"
            style={{
              color: ACCENT,
              background: "rgba(193,255,114,0.08)",
              border: "1px solid rgba(193,255,114,0.2)",
            }}
          >
            Der Prozess
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
            Von der Idee zur{" "}
            <span style={{ color: ACCENT }}>fertigen Lösung</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
            Ein klarer, strukturierter Weg — damit du immer weißt, wo wir stehen.
          </p>
        </div>

        <div className="relative">
          {/* Vertical rail line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px md:left-10"
            style={{ background: "rgba(193,255,114,0.12)" }}
          />

          <div className="flex flex-col gap-16 md:gap-20">
            {steps.map((step, i) => {
              const active = activeSteps.has(i);
              return (
                <div
                  key={step.number}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  className="flex gap-8 md:gap-12 relative"
                  style={{
                    opacity: active ? 1 : 0.25,
                    transform: active ? "translateX(0)" : "translateX(-12px)",
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                  }}
                >
                  {/* Node */}
                  <div className="flex flex-col items-center shrink-0" style={{ zIndex: 1 }}>
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative"
                      style={{
                        background: active ? "rgba(193,255,114,0.12)" : "hsl(0 0% 7%)",
                        border: `2px solid ${active ? ACCENT : "rgba(193,255,114,0.2)"}`,
                        boxShadow: active ? "0 0 40px rgba(193,255,114,0.2)" : "none",
                        transition: "all 0.5s ease",
                      }}
                    >
                      <div style={{ color: active ? ACCENT : "rgba(193,255,114,0.3)", transition: "color 0.4s" }}>
                        {step.icon}
                      </div>
                      <div
                        className="absolute -top-2 -right-1 font-bold rounded px-2 py-0.5"
                        style={{
                          background: active ? ACCENT : "rgba(193,255,114,0.2)",
                          color: active ? "#0a0a0a" : "rgba(193,255,114,0.6)",
                          fontSize: "11px",
                          transition: "all 0.4s ease",
                        }}
                      >
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2 pt-3 md:pt-4">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3
                        className="text-xl md:text-2xl font-semibold"
                        style={{ color: active ? "white" : "rgba(255,255,255,0.4)", transition: "color 0.4s" }}
                      >
                        {step.title}
                      </h3>
                      <span
                        className="text-sm font-medium px-3 py-0.5 rounded-full"
                        style={{
                          color: active ? "rgba(193,255,114,0.9)" : "rgba(193,255,114,0.3)",
                          background: "rgba(193,255,114,0.07)",
                          border: "1px solid rgba(193,255,114,0.12)",
                          transition: "color 0.4s",
                        }}
                      >
                        {step.duration}
                      </span>
                    </div>
                    <p
                      className="text-base leading-relaxed mb-3"
                      style={{ color: active ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.2)", transition: "color 0.4s" }}
                    >
                      {step.description}
                    </p>
                    <p
                      className="text-base font-medium"
                      style={{
                        color: ACCENT,
                        opacity: active ? 0.85 : 0,
                        transition: "opacity 0.5s ease",
                      }}
                    >
                      → {step.highlight}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Automatische Terminannahme",
    description:
      "Jede Anfrage wird sofort beantwortet und direkt in einen Termin umgewandelt – ohne dass du selbst reagieren musst.",
    tags: ["24/7", "Terminbuchung", "Automatisch"],
    icon: "🤖",
  },
  {
    title: "Telefon- & WhatsApp-Agent",
    description:
      "Ein KI-Assistent nimmt Anrufe und Nachrichten entgegen, beantwortet Fragen und bucht Termine automatisch.",
    tags: ["Telefon", "WhatsApp", "KI-Agent"],
    icon: "⚡",
  },
  {
    title: "Weniger No-Shows",
    description:
      "Automatische Bestätigungen und Erinnerungen sorgen dafür, dass Termine zuverlässig eingehalten werden.",
    tags: ["Erinnerungen", "SMS", "E-Mail"],
    icon: "🎯",
  },
  {
    title: "Entlastung im Alltag",
    description:
      "Kein ständiges Telefonieren oder Antworten mehr – du kannst dich wieder auf deine Arbeit konzentrieren.",
    tags: ["Zeitersparnis", "Fokus", "Effizienz"],
    icon: "💬",
  },
  {
    title: "Mehr Kunden ohne Mehraufwand",
    description:
      "Du verlierst keine Anfragen mehr und gewinnst mehr zahlende Kunden – ohne mehr Zeit zu investieren.",
    tags: ["Wachstum", "Leads", "Conversion"],
    icon: "📊",
  },
  {
    title: "Ein System für alles",
    description:
      "Alle Anfragen laufen zentral zusammen und werden automatisch verarbeitet.",
    tags: ["Zentralisiert", "Automatisiert", "Übersicht"],
    icon: "✍️",
  },
];

const comingSoonServices = [
  {
    title: "Follow-Up Automatisierung",
    description: "Automatisches Nachfassen bei Interessenten, die nicht direkt buchen.",
    icon: "🔁",
  },
  {
    title: "No-Show Reduzierung",
    description: "Automatische Erinnerungen und Bestätigungen für weniger Termin-Ausfälle.",
    icon: "📅",
  },
  {
    title: "Bewertungen automatisieren",
    description: "Hole dir automatisch mehr 5★ Bewertungen nach jedem Termin.",
    icon: "⭐",
  },
  {
    title: "Kunden-Reaktivierung",
    description: "Gewinne alte Kunden zurück durch gezielte automatische Nachrichten.",
    icon: "🔄",
  },
  {
    title: "WhatsApp Funnel",
    description: "Verwandle Website- und Instagram-Besucher automatisch in Anfragen.",
    icon: "📲",
  },
  {
    title: "Mitarbeiterverwaltungs-App",
    description: "Eigene App für dein Team: Zeiterfassung, interner Chat, Urlaubsplanung und mehr – alles an einem Ort.",
    icon: "🧑‍💼",
  },
];

function ServicesSection() {
  return (
    <section id="leistungen" className="relative py-24 md:py-40 px-5 md:px-8 lg:px-16">
      <SectionCorners />
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <div
            className="inline-block text-sm font-medium px-4 py-1.5 rounded-full mb-5"
            style={{
              color: ACCENT,
              background: "rgba(193,255,114,0.08)",
              border: "1px solid rgba(193,255,114,0.2)",
            }}
          >
            Leistungen
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
            Was ich für dich{" "}
            <span style={{ color: ACCENT }}>automatisiere</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
            Jede Lösung wird individuell auf dein Business zugeschnitten.
            Keine vorgefertigten Templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-8 rounded-2xl transition-all duration-300 hover:border-white/15 cursor-default"
              style={{
                background: "hsl(0 0% 7%)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "hsl(0 0% 9%)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(193,255,114,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "hsl(0 0% 7%)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <div className="text-5xl mb-5">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-white/50 text-base leading-relaxed mb-5">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 rounded-md"
                    style={{
                      color: "rgba(193,255,114,0.7)",
                      background: "rgba(193,255,114,0.06)",
                      border: "1px solid rgba(193,255,114,0.1)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {comingSoonServices.map((service) => (
            <div
              key={service.title}
              className="p-8 rounded-2xl cursor-default"
              style={{
                background: "hsl(0 0% 5%)",
                border: "1px solid rgba(255,255,255,0.04)",
                opacity: 0.55,
              }}
            >
              <div className="text-5xl mb-5 grayscale">{service.icon}</div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-xl font-semibold text-white/70">
                  {service.title}
                </h3>
                <span
                  className="flex-shrink-0 text-sm font-medium px-2.5 py-0.5 rounded-md mt-0.5"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  Coming Soon
                </span>
              </div>
              <p className="text-white/35 text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "Für wen ist das geeignet?",
    answer:
      "Für Selbstständige, Freelancer, kleine und mittlere Unternehmen, die repetitive Aufgaben automatisieren und ihre Prozesse skalieren möchten. Egal ob du 1 Person oder 50 Mitarbeiter hast.",
  },
  {
    question: "Wie läuft die kostenlose Erstberatung ab?",
    answer:
      "In einem 15-minütigen Video-Call analysieren wir gemeinsam dein Business, identifizieren die größten Potenziale für KI-Automatisierung und du bekommst erste konkrete Handlungsempfehlungen — völlig kostenlos und ohne Verpflichtung.",
  },
  {
    question: "Wie lange dauert eine typische Implementierung?",
    answer:
      "Das hängt von der Komplexität ab. Einfache Automatisierungen sind oft in 1–3 Tagen umgesetzt. Komplexere KI-Agenten-Systeme können 2–4 Wochen in Anspruch nehmen. Im Erstgespräch gebe ich dir eine realistische Einschätzung.",
  },
  {
    question: "Welche Tools und Technologien nutzt du?",
    answer:
      "Ich arbeite mit modernsten Tools: n8n für Automatisierungen, OpenAI / Anthropic / lokale Modelle für KI, Cloud-Infrastruktur (AWS, GCP), APIs aller Art und spezifische Business-Tools wie CRMs, E-Mail-Plattformen etc.",
  },
  {
    question: "Was kostet das?",
    answer:
      "Die Erstberatung ist komplett kostenlos. Die Kosten für die Implementierung hängen vom Umfang des Projekts ab und werden transparent im Angebot festgelegt. Es gibt keine versteckten Kosten.",
  },
  {
    question: "Muss ich technisches Vorwissen haben?",
    answer:
      "Nein. Ich erkläre alles verständlich und auf dein Level angepasst. Du musst kein Entwickler sein — ich kümmere mich um die technische Umsetzung, du fokussierst dich auf dein Business.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 md:py-40 px-5 md:px-8 lg:px-16">
      <SectionCorners />
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-14 md:mb-18">
          <div
            className="inline-block text-sm font-medium px-4 py-1.5 rounded-full mb-5"
            style={{
              color: ACCENT,
              background: "rgba(193,255,114,0.08)",
              border: "1px solid rgba(193,255,114,0.2)",
            }}
          >
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Häufige Fragen
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{
                background: openIndex === i ? "hsl(0 0% 9%)" : "hsl(0 0% 7%)",
                border: openIndex === i ? "1px solid rgba(193,255,114,0.2)" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <button
                className="w-full text-left p-6 flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-white font-medium text-base md:text-lg">
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 transition-transform duration-200"
                  style={{
                    color: openIndex === i ? ACCENT : "rgba(255,255,255,0.3)",
                    transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-white/50 text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
    privacy: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacy) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch("https://formspree.io/f/xgopkbno", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          business: form.business,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="relative py-24 md:py-40 px-5 md:px-8 lg:px-16">
      <SectionCorners />
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div
            className="inline-block text-sm font-medium px-4 py-1.5 rounded-full mb-5"
            style={{
              color: ACCENT,
              background: "rgba(193,255,114,0.08)",
              border: "1px solid rgba(193,255,114,0.2)",
            }}
          >
            Erstgespräch buchen
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
            Starte jetzt —{" "}
            <span style={{ color: ACCENT }}>kostenlos</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl">
            15 Minuten, die deinen Workflow für immer verändern könnten.
          </p>
        </div>

        {submitted ? (
          <div
            className="text-center p-14 rounded-2xl"
            style={{
              background: "rgba(193,255,114,0.05)",
              border: "1px solid rgba(193,255,114,0.2)",
            }}
          >
            <div className="text-6xl mb-5">✓</div>
            <h3 className="text-3xl font-bold text-white mb-3">
              Nachricht erhalten!
            </h3>
            <p className="text-white/50 text-lg">
              Ich melde mich innerhalb von 24 Stunden bei dir. Freue mich auf
              unser Gespräch!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-7 sm:p-10 rounded-2xl flex flex-col gap-6"
            style={{
              background: "hsl(0 0% 7%)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-base text-white/60 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Max Mustermann"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-base text-white placeholder-white/20 outline-none transition-all"
                  style={{
                    background: "hsl(0 0% 10%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(193,255,114,0.4)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                />
              </div>
              <div>
                <label className="block text-base text-white/60 mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  required
                  placeholder="max@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-base text-white placeholder-white/20 outline-none transition-all"
                  style={{
                    background: "hsl(0 0% 10%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(193,255,114,0.4)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-base text-white/60 mb-2">
                Was machst du / dein Business?
              </label>
              <input
                type="text"
                placeholder="z.B. E-Commerce, Agentur, Coaching, SaaS..."
                value={form.business}
                onChange={(e) => setForm({ ...form, business: e.target.value })}
                className="w-full px-5 py-4 rounded-xl text-base text-white placeholder-white/20 outline-none transition-all"
                style={{
                  background: "hsl(0 0% 10%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(193,255,114,0.4)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
            </div>

            <div>
              <label className="block text-base text-white/60 mb-2">
                Wo siehst du das größte Potenzial?
              </label>
              <textarea
                rows={5}
                placeholder="Beschreibe kurz, welche Prozesse dich am meisten Zeit kosten oder wo du gerne KI einsetzen würdest..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-5 py-4 rounded-xl text-base text-white placeholder-white/20 outline-none transition-all resize-none"
                style={{
                  background: "hsl(0 0% 10%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(193,255,114,0.4)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                required
                checked={form.privacy}
                onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
                className="mt-0.5 shrink-0 w-5 h-5 rounded cursor-pointer accent-[#c1ff72]"
              />
              <span className="text-sm text-white/40 leading-relaxed">
                Ich habe die{" "}
                <a
                  href="/datenschutz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-white/70"
                  style={{ color: ACCENT, opacity: 0.8 }}
                >
                  Datenschutzerklärung
                </a>{" "}
                gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu. *
              </span>
            </label>

            <button
              type="submit"
              disabled={!form.privacy || submitting}
              className="w-full py-5 rounded-xl font-semibold text-lg transition-all active:scale-95 mt-1 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: ACCENT, color: "#0a0a0a" }}
            >
              {submitting ? "Wird gesendet…" : "Kostenloses Erstgespräch anfragen →"}
            </button>

            {submitError && (
              <p className="text-sm text-center" style={{ color: "#f87171" }}>
                Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib uns direkt an{" "}
                <a href="mailto:feller-alexander@gmx.net" style={{ textDecoration: "underline" }}>
                  feller-alexander@gmx.net
                </a>.
              </p>
            )}

            <p className="text-sm text-white/30 text-center">
              Kein Spam. Keine Verpflichtung. Ich melde mich innerhalb von 24h.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  const { openSettings } = useConsent();
  return (
    <footer className="py-14 px-8 md:px-16 border-t border-white/5">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
          <span className="text-base text-white/40">RevenueFlow Systems</span>
          <a
            href="https://www.instagram.com/revenueflow.systems/?hl=de"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-colors"
            style={{ color: "rgba(255,255,255,0.3)" }}
            onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="/impressum"
            className="text-sm text-white/30 hover:text-white/60 transition-colors"
          >
            Impressum
          </a>
          <a
            href="/datenschutz"
            className="text-sm text-white/30 hover:text-white/60 transition-colors"
          >
            Datenschutz
          </a>
          <button
            onClick={openSettings}
            className="text-sm text-white/30 hover:text-white/60 transition-colors"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            Cookie-Einstellungen
          </button>
          <p className="text-sm text-white/20">
            © {new Date().getFullYear()} — Alle Rechte vorbehalten
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ProcessSection />
        <ServicesSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
