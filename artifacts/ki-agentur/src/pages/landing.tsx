import { useState, useEffect } from "react";

const ACCENT = "#c1ff72";

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
      <div className="w-full px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-14 w-14 object-contain" />
          <span className="font-semibold text-white text-sm tracking-wide">
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
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all"
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
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
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
              className="text-sm text-white/70 hover:text-white transition-colors py-2 border-b border-white/5"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="text-sm font-semibold px-4 py-3 rounded-lg text-center mt-2"
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

function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-5 md:px-16 pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(193,255,114,1) 1px, transparent 1px), linear-gradient(90deg, rgba(193,255,114,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(193,255,114,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-6xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border"
          style={{
            color: ACCENT,
            borderColor: "rgba(193,255,114,0.3)",
            background: "rgba(193,255,114,0.05)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ background: ACCENT }} />
          <span>Kostenlose Erstberatung — 15 Min., keine Verpflichtung</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-5 leading-[1.1] tracking-tight">
          Dein Business.
          <br />
          <span style={{ color: ACCENT }}>Automatisiert.</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-8 leading-relaxed px-2">
          Ich analysiere deine individuellen Prozesse und implementiere KI-Agenten,
          die dir Zeit sparen, Fehler reduzieren und dein Business skalieren.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90 active:scale-95"
            style={{ background: ACCENT, color: "#0a0a0a" }}
          >
            Jetzt 15 Min. Erstgespräch buchen
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#prozess"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base transition-all border border-white/10 text-white hover:border-white/20 hover:bg-white/5"
          >
            Prozess ansehen
          </a>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 sm:flex sm:items-center sm:justify-center sm:gap-10">
          {[
            { number: "100%", label: "Individuelle Lösungen" },
            { number: "15 Min.", label: "Erstberatung" },
            { number: "∞", label: "Skalierbarkeit" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-2xl font-bold" style={{ color: ACCENT }}>
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    title: "Kostenlose Erstberatung",
    duration: "15 Minuten",
    description:
      "Wir analysieren gemeinsam deine aktuelle Situation, identifizieren die größten Zeitfresser und Ineffizienzen in deinem Business — und schauen, wo KI den größten Hebel hat.",
    highlight: "Kein Verkaufsgespräch. Nur ehrliche Analyse.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 10h8M8 14h5M5 3h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Strategie & Konzept",
    duration: "1–2 Tage",
    description:
      "Basierend auf deinen Zielen entwickle ich eine maßgeschneiderte KI-Strategie. Du bekommst einen konkreten Umsetzungsplan mit klar definierten Meilensteinen und erwartetem ROI.",
    highlight: "Transparent, verständlich, umsetzbar.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "KI-Implementierung",
    duration: "1–4 Wochen",
    description:
      "Ich baue und integriere die KI-Agenten direkt in deine bestehenden Tools und Workflows. Von n8n-Automatisierungen über API-Integrationen bis hin zu vollständigen KI-Agenten-Systemen.",
    highlight: "Keine Unterbrechung deines laufenden Business.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Testing & Optimierung",
    duration: "Laufend",
    description:
      "Gemeinsam testen wir alle implementierten Systeme, optimieren die Leistung und stellen sicher, dass alles reibungslos funktioniert. Ich begleite dich, bis alles perfekt läuft.",
    highlight: "Vollständiger Support bis zum Go-live.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Skalierung & Wachstum",
    duration: "Dauerhaft",
    description:
      "Nach dem erfolgreichen Start skalieren wir dein KI-System kontinuierlich. Neue Use Cases, erweiterte Automatisierungen und regelmäßige Optimierungen halten dich der Konkurrenz voraus.",
    highlight: "Dein Business wächst — deine Systeme auch.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function ProcessSection() {
  return (
    <section id="prozess" className="py-20 md:py-32 px-5 md:px-8 lg:px-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <div
            className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
            style={{
              color: ACCENT,
              background: "rgba(193,255,114,0.08)",
              border: "1px solid rgba(193,255,114,0.2)",
            }}
          >
            Der Prozess
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Von der Idee zur{" "}
            <span style={{ color: ACCENT }}>fertigen Lösung</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
            Ein klarer, strukturierter Weg — damit du immer weißt, wo wir stehen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="flex gap-6 group p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  animationDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(193,255,114,0.03)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(193,255,114,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.015)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <div className="flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center relative transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(193,255,114,0.08)",
                      border: "1px solid rgba(193,255,114,0.2)",
                    }}
                  >
                    <div style={{ color: ACCENT }}>{step.icon}</div>
                    <div
                      className="absolute -top-2 -right-2 text-xs font-bold px-1.5 py-0.5 rounded-md"
                      style={{
                        background: ACCENT,
                        color: "#0a0a0a",
                        fontSize: "10px",
                      }}
                    >
                      {step.number}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-white">
                      {step.title}
                    </h3>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full self-start sm:self-auto"
                      style={{
                        color: "rgba(193,255,114,0.8)",
                        background: "rgba(193,255,114,0.08)",
                        border: "1px solid rgba(193,255,114,0.15)",
                      }}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-white/50 leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: ACCENT }}
                  >
                    → {step.highlight}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "KI-Agenten",
    description:
      "Maßgeschneiderte KI-Agenten, die eigenständig Aufgaben übernehmen — von der Kundenanfrage bis zur Datenanal yse.",
    tags: ["n8n", "OpenAI", "Anthropic", "APIs"],
    icon: "🤖",
  },
  {
    title: "Workflow-Automatisierung",
    description:
      "Verbinde deine Tools und automatisiere repetitive Prozesse. Spar Zeit, reduziere Fehler und fokussiere dich auf das Wesentliche.",
    tags: ["n8n", "Zapier", "Make", "APIs"],
    icon: "⚡",
  },
  {
    title: "Lead-Generierung",
    description:
      "KI-gestützte Systeme, die potenzielle Kunden identifizieren, qualifizieren und automatisch ansprechen.",
    tags: ["Outreach", "CRM", "KI-Scoring"],
    icon: "🎯",
  },
  {
    title: "Chatbots & Support",
    description:
      "Intelligente Chatbots, die rund um die Uhr Kundenfragen beantworten und qualifizierte Leads generieren.",
    tags: ["RAG", "Support", "24/7"],
    icon: "💬",
  },
  {
    title: "Datenanalyse",
    description:
      "Verwandle deine Rohdaten in handlungsrelevante Insights. KI analysiert, erkennt Muster und gibt klare Empfehlungen.",
    tags: ["Analytics", "Reporting", "Prediction"],
    icon: "📊",
  },
  {
    title: "Content-Automatisierung",
    description:
      "Automatisiere deine Content-Produktion — von Social Media Posts über E-Mails bis zu Blog-Artikeln.",
    tags: ["Content", "Social Media", "E-Mail"],
    icon: "✍️",
  },
];

function ServicesSection() {
  return (
    <section id="leistungen" className="py-20 md:py-32 px-5 md:px-8 lg:px-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <div
            className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
            style={{
              color: ACCENT,
              background: "rgba(193,255,114,0.08)",
              border: "1px solid rgba(193,255,114,0.2)",
            }}
          >
            Leistungen
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Was ich für dich{" "}
            <span style={{ color: ACCENT }}>umsetzen kann</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
            Jede Lösung wird individuell auf dein Business zugeschnitten.
            Keine vorgefertigten Templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 rounded-2xl transition-all duration-300 hover:border-white/15 cursor-default"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(193,255,114,0.03)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(193,255,114,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-md"
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
    <section id="faq" className="py-20 md:py-32 px-5 md:px-8 lg:px-16">
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <div
            className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
            style={{
              color: ACCENT,
              background: "rgba(193,255,114,0.08)",
              border: "1px solid rgba(193,255,114,0.2)",
            }}
          >
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Häufige Fragen
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{
                background: openIndex === i ? "rgba(193,255,114,0.04)" : "rgba(255,255,255,0.02)",
                border: openIndex === i ? "1px solid rgba(193,255,114,0.2)" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <button
                className="w-full text-left p-5 flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-white font-medium text-sm md:text-base">
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 transition-transform duration-200"
                  style={{
                    color: openIndex === i ? ACCENT : "rgba(255,255,255,0.3)",
                    transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-white/50 text-sm leading-relaxed">
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
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="py-20 md:py-32 px-5 md:px-8 lg:px-16">
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <div
            className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
            style={{
              color: ACCENT,
              background: "rgba(193,255,114,0.08)",
              border: "1px solid rgba(193,255,114,0.2)",
            }}
          >
            Erstgespräch buchen
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Starte jetzt —{" "}
            <span style={{ color: ACCENT }}>kostenlos</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg">
            15 Minuten, die deinen Workflow für immer verändern könnten.
          </p>
        </div>

        {submitted ? (
          <div
            className="text-center p-12 rounded-2xl"
            style={{
              background: "rgba(193,255,114,0.05)",
              border: "1px solid rgba(193,255,114,0.2)",
            }}
          >
            <div className="text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Nachricht erhalten!
            </h3>
            <p className="text-white/50">
              Ich melde mich innerhalb von 24 Stunden bei dir. Freue mich auf
              unser Gespräch!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-8 rounded-2xl flex flex-col gap-4 sm:gap-5"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Max Mustermann"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
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
                <label className="block text-sm text-white/60 mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  required
                  placeholder="max@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
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
              <label className="block text-sm text-white/60 mb-2">
                Was machst du / dein Business?
              </label>
              <input
                type="text"
                placeholder="z.B. E-Commerce, Agentur, Coaching, SaaS..."
                value={form.business}
                onChange={(e) => setForm({ ...form, business: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
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
              <label className="block text-sm text-white/60 mb-2">
                Wo siehst du das größte Potenzial?
              </label>
              <textarea
                rows={4}
                placeholder="Beschreibe kurz, welche Prozesse dich am meisten Zeit kosten oder wo du gerne KI einsetzen würdest..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all resize-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
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

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90 active:scale-95 mt-2"
              style={{ background: ACCENT, color: "#0a0a0a" }}
            >
              Kostenloses Erstgespräch anfragen →
            </button>

            <p className="text-xs text-white/30 text-center">
              Kein Spam. Keine Verpflichtung. Ich melde mich innerhalb von 24h.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-8 md:px-16 border-t border-white/5">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-7 w-7 object-contain" />
          <span className="text-sm text-white/40">RevenueFlow Systems</span>
        </div>
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} — Alle Rechte vorbehalten
        </p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
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
