"use client";

import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";
import React, { useRef } from "react";
import { useLowPerformanceMode } from "@/lib/use-low-performance";

interface ScrollSectionProps {
  children: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
}

export function ScrollSection({ children, isFirst = false, isLast = false }: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const lowPerf = useLowPerformanceMode();
  const simplifyMotion = Boolean(reduceMotion || lowPerf);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleKeys = isFirst
    ? [0, 0.5, 0.75, 1]
    : [0, 0.25, 0.75, 1];
  const scaleVals = isFirst
    ? [1, 1, 1, isLast ? 1 : 0.88]
    : [0.88, 1, 1, isLast ? 1 : 0.88];

  const rotateKeys = scaleKeys;
  const rotateVals = isFirst
    ? [0, 0, 0, isLast ? 0 : -2]
    : [2, 0, 0, isLast ? 0 : -2];

  const opacityKeys = scaleKeys;
  const opacityVals = isFirst
    ? [1, 1, 1, isLast ? 1 : 0.5]
    : [0.5, 1, 1, isLast ? 1 : 0.5];

  const neutral4 = [1, 1, 1, 1];
  const neutral0 = [0, 0, 0, 0];

  const scale = useTransform(
    scrollYProgress,
    scaleKeys,
    simplifyMotion ? neutral4 : scaleVals,
  );
  const rotate = useTransform(
    scrollYProgress,
    rotateKeys,
    simplifyMotion ? neutral0 : rotateVals,
  );
  const opacity = useTransform(
    scrollYProgress,
    opacityKeys,
    simplifyMotion ? neutral4 : opacityVals,
  );

  return (
    <div ref={ref}>
      <motion.div
        style={{ scale, rotate, opacity, transformOrigin: "center center" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ScrollSection;
