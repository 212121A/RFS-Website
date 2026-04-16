import { useSyncExternalStore } from "react";

/**
 * Replit preview + weaker devices: fewer particles / simpler motion.
 * Also respects prefers-reduced-motion.
 */
export function getLowPerformanceMode(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }
  const h = window.location.hostname;
  return (
    h.includes("replit.dev") ||
    h.includes("repl.co") ||
    h.includes("replit.app")
  );
}

export function useLowPerformanceMode(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    getLowPerformanceMode,
    () => false,
  );
}
