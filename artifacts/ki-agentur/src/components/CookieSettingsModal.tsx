import { useEffect, useState } from "react";
import { categoryMeta, ConsentCategory } from "@/config/cookieConfig";
import { useConsent, type ConsentState } from "@/context/ConsentContext";

const ACCENT = "#c1ff72";

const OPTIONAL_CATEGORIES: Array<Exclude<ConsentCategory, "necessary">> = [
  "statistics",
  "marketing",
  "externalMedia",
];

type LocalState = Record<Exclude<ConsentCategory, "necessary">, boolean>;

export function CookieSettingsModal() {
  const { consent, settingsOpen, closeSettings, saveConsent, acceptAll } =
    useConsent();

  const [local, setLocal] = useState<LocalState>({
    statistics: false,
    marketing: false,
    externalMedia: false,
  });

  useEffect(() => {
    if (settingsOpen) {
      setLocal({
        statistics: consent?.statistics ?? false,
        marketing: consent?.marketing ?? false,
        externalMedia: consent?.externalMedia ?? false,
      });
    }
  }, [settingsOpen, consent]);

  if (!settingsOpen) return null;

  const handleSave = () => {
    const state: ConsentState = { necessary: true, ...local };
    saveConsent(state);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSettings();
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{
          background: "hsl(0 0% 8%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.7)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Cookie-Einstellungen"
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-white">
              Cookie-Einstellungen
            </h2>
            <p className="text-xs text-white/40 mt-1">
              Passe deine Datenschutzeinstellungen an.{" "}
              <a
                href="/datenschutz"
                style={{ color: ACCENT }}
                className="underline underline-offset-2"
              >
                Datenschutzerklärung
              </a>
            </p>
          </div>
          <button
            onClick={closeSettings}
            aria-label="Schließen"
            className="ml-4 shrink-0 transition-colors"
            style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.7)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.3)")
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <CategoryRow
            label={categoryMeta.necessary.label}
            description={categoryMeta.necessary.description}
            checked={true}
            disabled={true}
            onChange={() => {}}
          />
          {OPTIONAL_CATEGORIES.map((key) => (
            <CategoryRow
              key={key}
              label={categoryMeta[key].label}
              description={categoryMeta[key].description}
              checked={local[key]}
              disabled={false}
              onChange={(val) =>
                setLocal((prev) => ({ ...prev, [key]: val }))
              }
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleSave}
            className="flex-1 text-xs font-medium px-4 py-2.5 rounded-lg transition-colors"
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
            Auswahl speichern
          </button>
          <button
            onClick={acceptAll}
            className="flex-1 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
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
  );
}

function CategoryRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div
      className="flex items-start gap-4 p-4 rounded-xl"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-sm font-medium text-white/80">{label}</span>
          {disabled && (
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{
                background: "rgba(193,255,114,0.08)",
                color: ACCENT,
                fontSize: "10px",
                border: "1px solid rgba(193,255,114,0.15)",
              }}
            >
              Immer aktiv
            </span>
          )}
        </div>
        <p className="text-xs text-white/40 leading-relaxed">{description}</p>
      </div>
      <div className="shrink-0 mt-0.5">
        <Toggle checked={checked} disabled={disabled} onChange={onChange} />
      </div>
    </div>
  );
}

function Toggle({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      style={{
        position: "relative",
        display: "inline-flex",
        height: "20px",
        width: "36px",
        flexShrink: 0,
        borderRadius: "9999px",
        border: "none",
        padding: 0,
        transition: "background-color 0.2s",
        background: checked
          ? disabled
            ? "rgba(193,255,114,0.35)"
            : ACCENT
          : "rgba(255,255,255,0.12)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "2px",
          left: checked ? "18px" : "2px",
          width: "16px",
          height: "16px",
          borderRadius: "9999px",
          background: "#fff",
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}
