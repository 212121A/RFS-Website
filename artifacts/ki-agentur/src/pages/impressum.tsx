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
          <strong>Hinweis:</strong> Bitte noch die <strong>E-Mail-Adresse</strong> eintragen.
        </div>

        <div className="flex flex-col gap-10">
          <Section title="Angaben zum Unternehmen">
            <Row label="Firmenname / vollständiger Name" value="RevenueFlow Systems" />
            <Row label="Rechtsform" value="Einzelunternehmen" />
            <Row label="Inhaber" value="Alexander Feller" />
          </Section>

          <Section title="Kontakt">
            <Row label="Anschrift" value="Turniergraben 1, 73525 Schwäbisch Gmünd, Deutschland" />
            <Row label="E-Mail" value="[TODO: kontakt@beispiel.de]" />
            <Row label="Telefon" value="+49 177 8090025" />
          </Section>

          <Section title="Berufsbezeichnung / Tätigkeit">
            <Row label="Tätigkeitsbeschreibung" value="KI-Automatisierungsberater, IT-Dienstleister" />
          </Section>

          <Section title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
            <Row label="Name & Anschrift" value="Alexander Feller, Turniergraben 1, 73525 Schwäbisch Gmünd" />
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
