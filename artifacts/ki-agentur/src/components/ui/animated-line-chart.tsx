"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface ChartLine {
  label: string;
  data: number[];
  color: string;
}

interface AnimatedLineChartProps {
  lines?: ChartLine[];
  xLabel?: string;
  yLabels?: string[];
  width?: number;
  height?: number;
  className?: string;
}

const defaultLines: ChartLine[] = [
  { label: "Umsatz", data: [8, 12, 11, 18, 24, 22, 32, 38, 55], color: "#c1ff72" },
  { label: "Qualität", data: [15, 20, 28, 26, 35, 42, 40, 50, 48], color: "#72d4ff" },
  { label: "Zeit", data: [30, 34, 32, 40, 38, 48, 52, 55, 62], color: "#ff72c1" },
];

function buildPath(data: number[], width: number, height: number, padding: number, paddingLeft: number): { d: string; length: number } {
  const innerW = width - paddingLeft - padding;
  const innerH = height - padding * 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => ({
    x: paddingLeft + (i / (data.length - 1)) * innerW,
    y: padding + innerH - ((v - min) / range) * innerH,
  }));

  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  let length = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    length += Math.sqrt(dx * dx + dy * dy);
  }

  return { d, length };
}

export function AnimatedLineChart({
  lines = defaultLines,
  xLabel = "Von manuell \u2192 automatisiert",
  yLabels = ["Umsatz", "Qualität", "Zeit"],
  width = 600,
  height = 280,
  className,
}: AnimatedLineChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const padding = 40;
  const paddingLeft = 110;
  const innerW = width - paddingLeft - padding;
  const innerH = height - padding * 2;
  const gridRows = 4;
  const gridCols = (lines[0]?.data.length ?? 9) - 1;

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        style={{ maxWidth: width }}
      >
        {Array.from({ length: gridRows + 1 }).map((_, i) => {
          const y = padding + (i / gridRows) * innerH;
          return <line key={`h${i}`} x1={paddingLeft} x2={paddingLeft + innerW} y1={y} y2={y} stroke="rgba(193,255,114,0.08)" strokeWidth={1} />;
        })}
        {Array.from({ length: gridCols + 1 }).map((_, i) => {
          const x = paddingLeft + (i / gridCols) * innerW;
          return <line key={`v${i}`} x1={x} x2={x} y1={padding} y2={padding + innerH} stroke="rgba(193,255,114,0.08)" strokeWidth={1} />;
        })}

        {/* Y-Achse */}
        <line x1={paddingLeft} x2={paddingLeft} y1={padding} y2={padding + innerH} stroke="rgba(193,255,114,0.2)" strokeWidth={1.5} />
        {/* Pfeil Y */}
        <polygon points={`${paddingLeft},${padding - 6} ${paddingLeft - 4},${padding + 2} ${paddingLeft + 4},${padding + 2}`} fill="rgba(193,255,114,0.3)" />

        {/* X-Achse */}
        <line x1={paddingLeft} x2={paddingLeft + innerW} y1={padding + innerH} y2={padding + innerH} stroke="rgba(193,255,114,0.2)" strokeWidth={1.5} />
        {/* Pfeil X */}
        <polygon points={`${paddingLeft + innerW + 6},${padding + innerH} ${paddingLeft + innerW - 2},${padding + innerH - 4} ${paddingLeft + innerW - 2},${padding + innerH + 4}`} fill="rgba(193,255,114,0.3)" />

        {/* X-Achsen-Label */}
        <text
          x={paddingLeft + innerW / 2}
          y={height - 6}
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="18"
          fontFamily="inherit"
        >
          {xLabel}
        </text>

        {/* Y-Achsen-Labels */}
        {yLabels.map((label, i) => (
          <text
            key={i}
            x={paddingLeft - 10}
            y={padding + (innerH / (yLabels.length + 1)) * (i + 1)}
            textAnchor="end"
            fill={lines[i]?.color ?? "rgba(255,255,255,0.4)"}
            fontSize="18"
            fontFamily="inherit"
            fontWeight="600"
          >
            {label}
          </text>
        ))}

        {lines.map((line, li) => {
          const { d, length } = buildPath(line.data, width, height, padding, paddingLeft);
          return (
            <motion.path
              key={li}
              d={d}
              fill="none"
              stroke={line.color}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={length}
              animate={inView ? {
                strokeDashoffset: [length, 0, 0, length],
              } : { strokeDashoffset: length }}
              transition={{
                duration: 8,
                delay: li * 0.5,
                ease: "easeInOut",
                repeat: Infinity,
                times: [0, 0.4, 0.6, 1],
              }}
              style={{ filter: `drop-shadow(0 0 6px ${line.color}55)` }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default AnimatedLineChart;
