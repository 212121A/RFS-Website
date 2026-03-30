export type ConsentCategory = "necessary" | "statistics" | "marketing" | "externalMedia";

export interface ScriptEntry {
  id: string;
  category: ConsentCategory;
  src?: string;
  async?: boolean;
  defer?: boolean;
  inline?: string;
}

export const CONSENT_STORAGE_KEY = "rf_cookie_consent";
export const CONSENT_VERSION = 1;

/**
 * Add your third-party scripts here.
 * They are only injected after the user gives consent for that category.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * HOW TO ADD A SERVICE
 *   1. Uncomment the relevant block below (or copy the pattern).
 *   2. Replace the placeholder IDs / domains with your real values.
 *   3. The script will be injected automatically once consent is given.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const scriptEntries: ScriptEntry[] = [

  // ── STATISTIK ────────────────────────────────────────────────────────────

  // TODO: Plausible Analytics — replace 'YOUR-DOMAIN.COM' with your domain
  // {
  //   id: "plausible",
  //   category: "statistics",
  //   src: "https://plausible.io/js/script.js",
  //   async: true,
  //   defer: true,
  //   // Note: also add data-domain="YOUR-DOMAIN.COM" via a custom attribute
  //   // wrapper if needed. Or use the inline variant with window.plausible.
  // },

  // TODO: Google Analytics 4 — replace 'G-XXXXXXXXXX' with your Measurement ID
  // {
  //   id: "google-analytics-loader",
  //   category: "statistics",
  //   src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX",
  //   async: true,
  // },
  // {
  //   id: "google-analytics-init",
  //   category: "statistics",
  //   inline: `
  //     window.dataLayer = window.dataLayer || [];
  //     function gtag(){dataLayer.push(arguments);}
  //     gtag('js', new Date());
  //     gtag('config', 'G-XXXXXXXXXX');
  //   `,
  // },

  // ── MARKETING ────────────────────────────────────────────────────────────

  // TODO: Meta Pixel — replace 'YOUR_PIXEL_ID' with your actual Pixel ID
  // {
  //   id: "meta-pixel",
  //   category: "marketing",
  //   inline: `
  //     !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  //     n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  //     n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  //     t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  //     document,'script','https://connect.facebook.net/en_US/fbevents.js');
  //     fbq('init','YOUR_PIXEL_ID');
  //     fbq('track','PageView');
  //   `,
  // },

  // TODO: Google Ads Conversion Tracking — replace 'AW-XXXXXXXXX' with your ID
  // {
  //   id: "google-ads",
  //   category: "marketing",
  //   src: "https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX",
  //   async: true,
  // },

  // ── EXTERNE MEDIEN ────────────────────────────────────────────────────────
  // YouTube and Calendly embeds are handled via the ConsentPlaceholder component.
  // TODO: Add any additional external media scripts here if needed.

];

export const categoryMeta: Record<ConsentCategory, { label: string; description: string }> = {
  necessary: {
    label: "Notwendig",
    description:
      "Technisch erforderliche Cookies und Funktionen für den Betrieb der Website. Diese können nicht deaktiviert werden.",
  },
  statistics: {
    label: "Statistik",
    description:
      "Anonymisierte Nutzungsdaten (z. B. via Plausible Analytics) helfen uns, die Website zu verbessern. Keine personenbezogenen Daten.",
  },
  marketing: {
    label: "Marketing",
    description:
      "Werbeanzeigen und Remarketing (z. B. Meta Pixel, Google Ads). Aktuell kein Tool aktiv — Infrastruktur ist vorbereitet.",
  },
  externalMedia: {
    label: "Externe Medien",
    description:
      "Eingebettete externe Inhalte wie YouTube-Videos oder Calendly-Buchungswidgets. Ohne Einwilligung werden Platzhalter angezeigt.",
  },
};
