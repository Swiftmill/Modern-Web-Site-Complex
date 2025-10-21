"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export function useGsapHeroTimeline() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
      timeline.fromTo(
        "#__galaxy-root",
        { backgroundPosition: "center 0" },
        { backgroundPosition: "center 60px", duration: 3, ease: "power1.inOut" }
      );
    });

    return () => ctx.revert();
  }, []);
}
