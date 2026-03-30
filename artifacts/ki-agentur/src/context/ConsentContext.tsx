import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  scriptEntries,
} from "@/config/cookieConfig";

export interface ConsentState {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
  externalMedia: boolean;
}

interface StoredConsent extends ConsentState {
  version: number;
  decidedAt: string;
}

interface ConsentContextValue {
  consent: ConsentState | null;
  hasDecided: boolean;
  settingsOpen: boolean;
  acceptAll: () => void;
  acceptNecessary: () => void;
  saveConsent: (state: ConsentState) => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readStored(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: StoredConsent = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      necessary: true,
      statistics: parsed.statistics ?? false,
      marketing: parsed.marketing ?? false,
      externalMedia: parsed.externalMedia ?? false,
    };
  } catch {
    return null;
  }
}

function persist(state: ConsentState): void {
  const stored: StoredConsent = {
    ...state,
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
}

function injectScript(entry: (typeof scriptEntries)[number]): void {
  if (document.getElementById(entry.id)) return;
  const el = document.createElement("script");
  el.id = entry.id;
  if (entry.src) el.src = entry.src;
  if (entry.async) el.async = true;
  if (entry.defer) el.defer = true;
  if (entry.inline) el.textContent = entry.inline;
  document.head.appendChild(el);
}

function activateScripts(state: ConsentState): void {
  for (const entry of scriptEntries) {
    const allowed =
      entry.category === "necessary" ||
      (entry.category === "statistics" && state.statistics) ||
      (entry.category === "marketing" && state.marketing) ||
      (entry.category === "externalMedia" && state.externalMedia);
    if (allowed) injectScript(entry);
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(() => readStored());
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (consent) activateScripts(consent);
  }, [consent]);

  const saveConsent = useCallback((state: ConsentState) => {
    persist(state);
    setConsent(state);
    setSettingsOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({ necessary: true, statistics: true, marketing: true, externalMedia: true });
  }, [saveConsent]);

  const acceptNecessary = useCallback(() => {
    saveConsent({ necessary: true, statistics: false, marketing: false, externalMedia: false });
  }, [saveConsent]);

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        hasDecided: consent !== null,
        settingsOpen,
        acceptAll,
        acceptNecessary,
        saveConsent,
        openSettings,
        closeSettings,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}
