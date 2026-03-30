import { useConsent } from "@/context/ConsentContext";

const ACCENT = "#c1ff72";

export function CookieBanner() {
  const { hasDecided, acceptAll, acceptNecessary, openSettings } = useConsent();

  if (hasDecided) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      role="region"
      aria-label="Cookie-Einstellungen"
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl p-5 sm:p-6"
        style={{
          background: "hsl(0 0% 8%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-white mb-1">
              Diese Website verwendet Cookies
            </p>
            <p className="text-xs text-white/50 leading-relaxed">
              Wir nutzen technisch notwendige Cookies sowie optionale Cookies für
              Statistik und externe Inhalte — nur mit deiner Einwilligung.{" "}
              <a
                href="/datenschutz"
                className="underline underline-offset-2"
                style={{ color: ACCENT }}
              >
                Datenschutzerklärung
              </a>
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2 shrink-0">
            <button
              onClick={acceptNecessary}
              className="text-xs font-medium px-4 py-2 rounded-lg transition-colors"
              style={{
                color: "rgba(255,255,255,0.65)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.1)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.06)")
              }
            >
              Nur notwendige
            </button>

            <button
              onClick={openSettings}
              className="text-xs font-medium px-4 py-2 rounded-lg transition-colors"
              style={{
                color: "rgba(255,255,255,0.45)",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.04)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
              }
            >
              Einstellungen
            </button>

            <button
              onClick={acceptAll}
              className="text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              style={{ color: "#000", background: ACCENT }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#d4ff8a")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = ACCENT)
              }
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
