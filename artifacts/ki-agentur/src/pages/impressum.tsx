import { useEffect } from "react";

const ACCENT = "#c1ff72";

export default function ImpressumPage() {
  useEffect(() => {
    document.title = "Impressum — RevenueFlow Systems";
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "hsl(0 0% 4%)" }}>
      <header
        className="sticky top-0 z-50 px-8 py-4 flex items-center justify-between"
        style={{
          background: "rgba(10,10,10,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <a href="/" className="flex items-center gap-3 cursor-pointer">
          <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
          <span className="font-semibold text-white text-sm tracking-wide">
            RevenueFlow Systems
          </span>
        </a>
        <a
          href="/"
          className="text-sm font-medium px-4 py-2 rounded-lg transition-all"
          style={{ color: ACCENT }}
        >
          ← Zurück
        </a>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <div
          className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-6"
          style={{
            color: ACCENT,
            background: "rgba(193,255,114,0.08)",
            border: "1px solid rgba(193,255,114,0.2)",
          }}
        >
          Rechtliche Angaben
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
          Impressum
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Angaben gemäß § 5 DDG (ehem. TMG)
        </p>

        <div
          className="mb-8 px-5 py-4 rounded-xl text-sm"
          style={{
            background: "rgba(193,255,114,0.05)",
            border: "1px solid rgba(193,255,114,0.15)",
            color: ACCENT,
          }}
        >
          <strong>Hinweis:</strong> Die mit <code className="bg-white/10 px-1 rounded">[TODO]</code> markierten Felder musst du mit deinen echten Angaben ersetzen.
        </div>

        <div className="flex flex-col gap-10">
          <Section title="Angaben zum Unternehmen">
            <Row label="Firmenname / vollständiger Name" value="[TODO: z.B. RevenueFlow Systems GmbH / Max Mustermann]" />
            <Row label="Rechtsform" value="[TODO: z.B. GmbH / Einzelunternehmen / UG]" />
            <Row label="Vertretungsberechtigte Person" value="[TODO: z.B. Max Mustermann, Geschäftsführer]" />
          </Section>

          <Section title="Kontakt">
            <Row label="Anschrift" value="[TODO: Musterstraße 1, 12345 Musterstadt, Deutschland]" />
            <Row label="E-Mail" value="[TODO: kontakt@beispiel.de]" />
            <Row label="Telefon" value="[TODO: +49 123 456789]" />
          </Section>

          <Section title="Steuerliche Angaben">
            <Row label="USt-IdNr. (falls vorhanden)" value="[TODO: DE123456789 — oder entfernen, falls nicht vorhanden]" />
          </Section>

          <Section title="Berufsbezeichnung / Tätigkeit">
            <Row label="Tätigkeitsbeschreibung" value="[TODO: z.B. KI-Automatisierungsberater, IT-Dienstleister]" />
            <Row label="Zuständige Kammer / Aufsichtsbehörde (falls relevant)" value="[TODO: oder entfernen]" />
          </Section>

          <Section title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
            <Row label="Name & Anschrift" value="[TODO: Vollständiger Name, Anschrift wie oben]" />
          </Section>

          <Section title="Haftungshinweis">
            <p className="text-white/50 text-sm leading-relaxed">
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
          </Section>

          <Section title="Urheberrecht">
            <p className="text-white/50 text-sm leading-relaxed">
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </Section>
        </div>
      </main>

      <footer
        className="py-10 px-8 border-t text-center"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center justify-center gap-6 text-xs text-white/30">
          <a href="/impressum" className="hover:text-white/60 transition-colors">Impressum</a>
          <a href="/datenschutz" className="hover:text-white/60 transition-colors">Datenschutz</a>
        </div>
        <p className="text-xs text-white/20 mt-3">
          © {new Date().getFullYear()} RevenueFlow Systems — Alle Rechte vorbehalten
        </p>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        className="text-sm font-semibold uppercase tracking-widest mb-4"
        style={{ color: ACCENT }}
      >
        {title}
      </h2>
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  const isTodo = value.startsWith("[TODO");
  return (
    <div
      className="px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 border-b last:border-b-0"
      style={{
        borderColor: "rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <span className="text-xs text-white/40 sm:w-56 shrink-0">{label}</span>
      <span
        className={`text-sm ${isTodo ? "italic" : "text-white/70"}`}
        style={isTodo ? { color: "rgba(193,255,114,0.6)" } : {}}
      >
        {value}
      </span>
    </div>
  );
}
