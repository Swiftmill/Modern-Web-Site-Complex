"use client";

import { motion } from "framer-motion";
import { ConstellationCanvas } from "@/components/three/ConstellationCanvas";
import type skills from "@/app/content/skills.json";

type SkillsContent = typeof skills;

type SkillsSectionProps = {
  constellation: SkillsContent;
};

export function SkillsSection({ constellation }: SkillsSectionProps) {
  return (
    <section id="skills" className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 sm:px-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <p className="font-display text-sm uppercase tracking-[0.4em] text-accent-2">Compétences</p>
        <h2 className="mt-4 text-3xl font-semibold text-gradient sm:text-5xl">{constellation.headline}</h2>
        <p className="mt-6 text-base text-white/70 sm:text-lg">{constellation.description}</p>
      </motion.header>
      <div className="glass-panel frosted-border relative grid gap-8 rounded-3xl p-8 lg:grid-cols-[1fr_0.9fr]">
        <ConstellationCanvas data={constellation} />
        <div className="flex flex-col justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-3 text-sm text-white/70"
          >
            <p>
              Notre réseau de compétences est orchestré tel un système stellaire. Chaque connexion reflète une synergie
              concrète déployée sur nos expériences immersives.
            </p>
            <p>
              Cliquez sur un nœud pour zoomer et découvrir comment nous combinons technologies et direction artistique pour
              produire des voyages numériques sur-mesure.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
