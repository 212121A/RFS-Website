import { useEffect } from "react";

const ACCENT = "#c1ff72";

export default function DatenschutzPage() {
  useEffect(() => {
    document.title = "Datenschutzerklärung — RevenueFlow Systems";
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
          Datenschutzerklärung
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Stand: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
        </p>

        <div
          className="mb-10 px-5 py-4 rounded-xl text-sm"
          style={{
            background: "rgba(193,255,114,0.05)",
            border: "1px solid rgba(193,255,114,0.15)",
            color: ACCENT,
          }}
        >
          <strong>Hinweis:</strong> Mit <code className="bg-white/10 px-1 rounded">[TODO]</code> markierte Stellen musst du mit deinen echten Angaben ersetzen. Optionale Abschnitte kannst du entfernen, falls der jeweilige Dienst nicht eingesetzt wird.
        </div>

        <div className="flex flex-col gap-10 text-white/60 text-sm leading-relaxed">

          <DSSection title="1. Verantwortlicher">
            <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
            <div
              className="mt-4 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="italic" style={{ color: "rgba(193,255,114,0.6)" }}>
                [TODO: Vollständiger Name / Firmenname]<br />
                [TODO: Anschrift]<br />
                [TODO: E-Mail]<br />
                [TODO: Telefon]
              </p>
            </div>
          </DSSection>

          <DSSection title="2. Allgemeine Hinweise zur Datenverarbeitung">
            <p>
              Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Wir behandeln deine personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p className="mt-3">
              Personenbezogene Daten werden nur erhoben, soweit dies technisch notwendig ist oder du ausdrücklich eingewilligt hast. Eine Weitergabe an Dritte erfolgt nicht ohne deine Einwilligung, es sei denn, dies ist zur Vertragserfüllung erforderlich oder gesetzlich vorgeschrieben.
            </p>
          </DSSection>

          <DSSection title="3. Hosting">
            <p>
              Diese Website wird bei folgendem Anbieter gehostet:
            </p>
            <p className="mt-3 italic" style={{ color: "rgba(193,255,114,0.6)" }}>
              [TODO: Hosting-Anbieter, z.B. Replit / Vercel / Hetzner — Name und Anschrift des Anbieters eintragen und ggf. Auftragsverarbeitungsvertrag (AVV) abschließen]
            </p>
            <p className="mt-3">
              Der Einsatz dieses Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </DSSection>

          <DSSection title="4. Server-Logfiles">
            <p>
              Der Hosting-Anbieter dieser Website erhebt und speichert automatisch Informationen in sogenannten Server-Logfiles, die dein Browser automatisch übermittelt. Dies sind:
            </p>
            <ul className="mt-3 ml-4 space-y-1 list-disc list-outside">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="mt-3">
              Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem fehlerfreien Betrieb der Website).
            </p>
          </DSSection>

          <DSSection title="5. Kontaktformular">
            <p>
              Wenn du uns über das Kontaktformular auf dieser Website eine Anfrage zukommen lässt, werden deine Angaben aus dem Anfrageformular — inklusive der von dir dort angegebenen Kontaktdaten — zum Zweck der Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>
            <p className="mt-3">
              Diese Daten geben wir nicht ohne deine Einwilligung weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) sowie Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen).
            </p>
            <p className="mt-3">
              Die von dir im Kontaktformular eingegebenen Daten verbleiben bei uns, bis du uns zur Löschung aufforderst, deine Einwilligung zur Speicherung widerrufst oder der Zweck für die Datenspeicherung entfällt.
            </p>
          </DSSection>

          <DSSection title="6. E-Mail-Kontakt">
            <p>
              Wenn du uns per E-Mail kontaktierst, werden deine Angaben inklusive deiner E-Mail-Adresse zur Bearbeitung der Anfrage gespeichert. E-Mails werden bei folgendem Anbieter verarbeitet:
            </p>
            <p className="mt-3 italic" style={{ color: "rgba(193,255,114,0.6)" }}>
              [TODO: E-Mail-Anbieter, z.B. Google Workspace / Microsoft 365 / Proton Mail — ggf. AVV abschließen]
            </p>
          </DSSection>

          <DSSection title="7. Terminbuchung [OPTIONAL]">
            <div
              className="px-4 py-3 rounded-lg mb-3 text-xs"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              Diesen Abschnitt nur aktivieren, wenn ein Terminbuchungstool (z.B. Calendly, TidyCal, Cal.com) eingebunden ist — sonst entfernen.
            </div>
            <p className="italic" style={{ color: "rgba(193,255,114,0.6)" }}>
              [TODO: Für die Terminbuchung setzen wir [Terminbuchungs-Tool] ein. Anbieter: [Name, Anschrift]. Beim Buchen eines Termins werden folgende Daten verarbeitet: Name, E-Mail, Terminzeit. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Weitere Informationen findest du in der Datenschutzerklärung des Anbieters: [Link]]
            </p>
          </DSSection>

          <DSSection title="8. Analyse & Tracking [OPTIONAL]">
            <div
              className="px-4 py-3 rounded-lg mb-3 text-xs"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              Diesen Abschnitt nur aktivieren, wenn ein Analyse-Tool eingesetzt wird — sonst entfernen.
            </div>
            <p className="italic" style={{ color: "rgba(193,255,114,0.6)" }}>
              [TODO: Wir setzen [Analytics-Tool, z.B. Plausible / Fathom / Google Analytics] ein. Anbieter: [Name, Anschrift]. Rechtsgrundlage und weitere Details hier eintragen.]
            </p>
          </DSSection>

          <DSSection title="9. Cookies">
            <p>
              Diese Website setzt ausschließlich technisch notwendige Cookies ein, die für den Betrieb der Website erforderlich sind. Es werden keine Marketing-, Tracking- oder Analyse-Cookies verwendet.
            </p>
            <p className="mt-3">
              Technisch notwendige Cookies bedürfen nach § 25 Abs. 2 Nr. 2 TTDSG keiner Einwilligung.
            </p>
          </DSSection>

          <DSSection title="10. Rechte der betroffenen Personen">
            <p>Du hast gegenüber uns folgende Rechte hinsichtlich deiner personenbezogenen Daten:</p>
            <ul className="mt-3 ml-4 space-y-1 list-disc list-outside">
              <li><strong className="text-white/70">Auskunft</strong> — Art. 15 DSGVO</li>
              <li><strong className="text-white/70">Berichtigung</strong> — Art. 16 DSGVO</li>
              <li><strong className="text-white/70">Löschung</strong> — Art. 17 DSGVO</li>
              <li><strong className="text-white/70">Einschränkung der Verarbeitung</strong> — Art. 18 DSGVO</li>
              <li><strong className="text-white/70">Datenübertragbarkeit</strong> — Art. 20 DSGVO</li>
              <li><strong className="text-white/70">Widerspruch gegen die Verarbeitung</strong> — Art. 21 DSGVO</li>
              <li><strong className="text-white/70">Widerruf einer erteilten Einwilligung</strong> — Art. 7 Abs. 3 DSGVO</li>
            </ul>
            <p className="mt-4">
              Zur Ausübung deiner Rechte wende dich an:{" "}
              <span className="italic" style={{ color: "rgba(193,255,114,0.6)" }}>
                [TODO: E-Mail-Adresse]
              </span>
            </p>
          </DSSection>

          <DSSection title="11. Beschwerderecht bei einer Aufsichtsbehörde">
            <p>
              Du hast das Recht, dich bei einer Datenschutzbehörde über unsere Verarbeitung deiner personenbezogenen Daten zu beschweren. Die zuständige Aufsichtsbehörde richtet sich nach deinem Wohnsitz bzw. dem Bundesland des Unternehmens:
            </p>
            <p className="mt-3 italic" style={{ color: "rgba(193,255,114,0.6)" }}>
              [TODO: Zuständige Aufsichtsbehörde eintragen, z.B. Landesbeauftragte für Datenschutz und Informationsfreiheit NRW, Bayern, Berlin etc.]
            </p>
          </DSSection>

          <DSSection title="12. Speicherdauer">
            <p>
              Personenbezogene Daten werden gelöscht, sobald der Zweck der Speicherung entfällt und keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Kontaktanfragen werden in der Regel nach Abschluss der Kommunikation und spätestens nach{" "}
              <span className="italic" style={{ color: "rgba(193,255,114,0.6)" }}>
                [TODO: z.B. 6 Monaten / 3 Jahren]
              </span>{" "}
              gelöscht, sofern keine Vertragsbeziehung entstanden ist.
            </p>
          </DSSection>

          <DSSection title="13. Datensicherheit">
            <p>
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt.
            </p>
            <p className="mt-3">
              Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um deine Daten vor unberechtigtem Zugriff zu schützen.
            </p>
          </DSSection>

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

function DSSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-white mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
