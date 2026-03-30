import { useEffect, useState } from "react";
import { categoryMeta, ConsentCategory } from "@/config/cookieConfig";
import { useConsent, type ConsentState } from "@/context/ConsentContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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

  const handleSave = () => {
    const state: ConsentState = { necessary: true, ...local };
    saveConsent(state);
  };

  return (
    <Dialog open={settingsOpen} onOpenChange={(open) => !open && closeSettings()}>
      <DialogContent
        className="max-w-md p-6 gap-0"
        style={{
          background: "hsl(0 0% 8%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.7)",
        }}
      >
        <DialogHeader className="mb-5">
          <DialogTitle className="text-base font-semibold text-white">
            Cookie-Einstellungen
          </DialogTitle>
          <DialogDescription className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            Passe deine Datenschutzeinstellungen an.{" "}
            <a
              href="/datenschutz"
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              style={{ color: ACCENT }}
            >
              Datenschutzerklärung
            </a>
          </DialogDescription>
        </DialogHeader>

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
              onChange={(val) => setLocal((prev) => ({ ...prev, [key]: val }))}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleSave}
            className="flex-1 text-xs font-semibold px-4 py-2.5 rounded-lg transition-opacity hover:opacity-80 cursor-pointer"
            style={{
              color: "rgba(255,255,255,0.8)",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Auswahl speichern
          </button>
          <button
            onClick={acceptAll}
            className="flex-1 text-xs font-semibold px-4 py-2.5 rounded-lg transition-opacity hover:opacity-80 cursor-pointer"
            style={{ color: "#000", background: ACCENT }}
          >
            Alle akzeptieren
          </button>
        </div>
      </DialogContent>
    </Dialog>
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
          <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
            {label}
          </span>
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
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
          {description}
        </p>
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
      className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
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
