import React, { useState } from "react";

const ACCENT = "#c1ff72";

interface AccordionItemData {
  id: number;
  label: string;
  metric: string;
  metricSub: string;
  description: string;
  bullets: string[];
  imageUrl: string;
}

interface AccordionItemProps {
  item: AccordionItemData;
  isActive: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}

function AccordionItem({ item, isActive, onMouseEnter, onClick }: AccordionItemProps) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out min-h-[480px] md:min-h-[540px]"
      style={{ flex: isActive ? "5 1 0%" : "0.6 1 0%" }}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <img
        src={item.imageUrl}
        alt={item.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out"
        style={{ transform: isActive ? "scale(1.05)" : "scale(1.2)" }}
      />
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: isActive
            ? "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.5) 100%)"
            : "rgba(0,0,0,0.65)",
        }}
      />

      {/* Collapsed: vertical label */}
      <span
        className="absolute text-white font-bold whitespace-nowrap transition-all duration-500 ease-in-out pointer-events-none"
        style={{
          bottom: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(50%) rotate(-90deg)",
          fontSize: "1.15rem",
          opacity: isActive ? 0 : 1,
          letterSpacing: "0.04em",
          textShadow: "0 2px 8px rgba(0,0,0,0.7)",
        }}
      >
        {item.label}
      </span>

      {/* Expanded: full content */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-5 md:p-7 transition-all duration-500"
        style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
      >
        <h3
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight mb-2"
          style={{ color: ACCENT, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        >
          {item.label}
        </h3>

        <div className="mb-1">
          <span className="text-2xl md:text-3xl font-black text-white" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>{item.metric}</span>
        </div>
        <p className="text-sm md:text-base font-medium text-white/60 mb-4" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>{item.metricSub}</p>

        {item.description && <p className="text-sm text-white/50 leading-relaxed mb-4 max-w-lg" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{item.description}</p>}

        <ul className="flex flex-col gap-2">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-2.5 text-base text-white font-semibold" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M20 6L9 17l-5-5" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {isActive && (
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: ACCENT }}
        />
      )}
    </div>
  );
}

interface InteractiveImageAccordionProps {
  items?: AccordionItemData[];
}

export function InteractiveImageAccordion({ items = defaultItems }: InteractiveImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={index === activeIndex}
          onMouseEnter={() => setActiveIndex(index)}
          onClick={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
}

const defaultItems: AccordionItemData[] = [
  {
    id: 1,
    label: "Voice Agent",
    metric: "–1 Mitarbeiter",
    metricSub: "Telefondienst komplett automatisiert.",
    description: "",
    bullets: [
      "Spart 400-800 \u20AC/Monat",
      "24/7 erreichbar",
      "Kein verpasster Anruf",
      "Termine automatisch gebucht",
    ],
    imageUrl: "/voice-agent.png",
  },
  {
    id: 2,
    label: "Küchen-Dashboard",
    metric: "0 \u20AC Hardware",
    metricSub: "Einmal kaufen. Kein Abo.",
    description: "",
    bullets: [
      "Kein Jahresvertrag",
      "Läuft auf jedem Gerät",
      "Live-Status: Küche <> Abholung",
      "Dein Logo, deine Farben",
    ],
    imageUrl: "/kitchen-dashboard.png",
  },
  {
    id: 3,
    label: "WhatsApp Bot",
    metric: "-80% Fragen",
    metricSub: "Bot antwortet sofort. 24/7.",
    description: "",
    bullets: [
      "Reservierung per Chat",
      "Weniger No-Shows",
    ],
    imageUrl: "/whatsapp-bot.png",
  },
  {
    id: 4,
    label: "Individuelle Lösung",
    metric: "100% dein System",
    metricSub: "Kein Template. Gebaut für dich.",
    description: "",
    bullets: [
      "Kein Abo-Lock-in",
      "Dein Branding",
      "Wächst mit dir",
      "Direkter Ansprechpartner",
    ],
    imageUrl: "/individuelle-loesung.png",
  },
];

export default InteractiveImageAccordion;
