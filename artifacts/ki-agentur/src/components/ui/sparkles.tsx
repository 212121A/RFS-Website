"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useLowPerformanceMode } from "@/lib/use-low-performance";

type SparklesProps = {
  className?: string;
  size?: number;
  minSize?: number | null;
  density?: number;
  speed?: number;
  minSpeed?: number | null;
  opacity?: number;
  opacitySpeed?: number;
  minOpacity?: number | null;
  color?: string;
  background?: string;
  options?: Record<string, unknown>;
};

export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFFFFF",
  background = "transparent",
  options = {},
}: SparklesProps) {
  const [isReady, setIsReady] = useState(false);
  const low = useLowPerformanceMode();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setIsReady(true);
    });
  }, []);

  const id = useId();

  const effectiveDensity = useMemo(() => {
    if (!low) return density;
    return Math.min(180, Math.round(density * 0.12));
  }, [density, low]);

  const defaultOptions = {
    background: {
      color: {
        value: background,
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    fpsLimit: low ? 60 : 120,
    particles: {
      color: {
        value: color,
      },
      move: {
        enable: true,
        direction: "none" as const,
        speed: {
          min: minSpeed || speed / 10,
          max: low ? speed * 0.6 : speed,
        },
        straight: false,
      },
      number: {
        value: effectiveDensity,
      },
      opacity: {
        value: {
          min: minOpacity || opacity / 10,
          max: opacity,
        },
        animation: {
          enable: !low,
          sync: false,
          speed: low ? 0 : opacitySpeed,
        },
      },
      size: {
        value: {
          min: minSize || size / 2.5,
          max: size,
        },
      },
    },
    detectRetina: !low,
  };

  return isReady ? (
    <Particles
      id={id}
      options={{ ...defaultOptions, ...options }}
      className={className}
    />
  ) : null;
}
