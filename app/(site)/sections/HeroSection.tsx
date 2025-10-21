"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { GlowButton } from "@/components/GlowButton";
import { useGsapHeroTimeline } from "@/lib/gsap/useGsapHeroTimeline";

const GalaxyCanvas = dynamic(() => import("@/components/three/GalaxyCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-sm uppercase tracking-[0.4em] text-accent">
      Initialisation de la galaxie...
    </div>
  )
});

export function HeroSection() {
  useGsapHeroTimeline();

  useEffect(() => {
    document.body.classList.add("hero-mounted");
    return () => document.body.classList.remove("hero-mounted");
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-24 pt-40 sm:px-12"
    >
      <div className="pointer-events-none absolute inset-0">
        <GalaxyCanvas />
      </div>
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-6 py-2 text-xs uppercase tracking-[0.3em] text-accent-2"
        >
          A Website Studio
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-balance text-4xl font-semibold leading-tight text-gradient drop-shadow-glow sm:text-6xl"
        >
          A Website — Exploring the Cosmos of Experience
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-base text-white/70 sm:text-lg"
        >
          Entrez dans une odyssée sensorielle où les galaxies de particules répondent à chaque mouvement,
          synchronisant design, narration et technologie.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <GlowButton href="#about">Entrer dans la galaxie</GlowButton>
        </motion.div>
      </div>
    </section>
  );
}
