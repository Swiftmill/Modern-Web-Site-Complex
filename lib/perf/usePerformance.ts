"use client";

import { useEffect, useState } from "react";

type Quality = "ultra" | "high" | "medium";

export function usePerformance(): Quality {
  const [quality, setQuality] = useState<Quality>("ultra");

  useEffect(() => {
    if (typeof window === "undefined") return;
    let animationFrame = 0;
    let lastTime = performance.now();
    let frames = 0;

    const update = (time: number) => {
      frames += 1;
      if (time - lastTime >= 1000) {
        const fps = (frames * 1000) / (time - lastTime);
        if (fps < 40) {
          setQuality("medium");
        } else if (fps < 55) {
          setQuality((prev) => (prev === "medium" ? prev : "high"));
        } else {
          setQuality("ultra");
        }
        frames = 0;
        lastTime = time;
      }
      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return quality;
}
