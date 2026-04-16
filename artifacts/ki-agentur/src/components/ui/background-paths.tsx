"use client";

import { motion } from "framer-motion";
import React from "react";
import { useLowPerformanceMode } from "@/lib/use-low-performance";

function FloatingPaths({
  position,
  pathCount,
  animated,
}: {
  position: number;
  pathCount: number;
  animated: boolean;
}) {
  const paths = Array.from({ length: pathCount }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <PathLine key={path.id} path={path} animated={animated} />
        ))}
      </svg>
    </div>
  );
}

function PathLine({
  path,
  animated,
}: {
  path: { id: number; d: string; width: number };
  animated: boolean;
}) {
  const baseOpacity = 0.04 + path.id * 0.012;
  if (!animated) {
    return (
      <path
        d={path.d}
        stroke="#c1ff72"
        strokeWidth={path.width}
        strokeOpacity={Math.min(0.35, baseOpacity * 2)}
      />
    );
  }
  return (
    <motion.path
      d={path.d}
      stroke="#c1ff72"
      strokeWidth={path.width}
      strokeOpacity={baseOpacity}
      initial={{ pathLength: 0.3, opacity: 0.6 }}
      animate={{
        pathLength: 1,
        opacity: [0.3, 0.6, 0.3],
        pathOffset: [0, 1, 0],
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  );
}

export function BackgroundPaths({ children }: { children?: React.ReactNode }) {
  const low = useLowPerformanceMode();
  const pathCount = low ? 14 : 36;
  const animated = !low;
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <FloatingPaths position={1} pathCount={pathCount} animated={animated} />
        {!low && (
          <FloatingPaths position={-1} pathCount={pathCount} animated={animated} />
        )}
      </div>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

export default BackgroundPaths;
