"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import Tilt from "react-parallax-tilt";

type AboutContent = typeof import("@/app/content/about.json");

type AboutSectionProps = {
  content: AboutContent;
};

const cardMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 }
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 sm:px-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <p className="font-display text-sm uppercase tracking-[0.4em] text-accent-2">À propos</p>
        <h2 className="mt-4 text-3xl font-semibold text-gradient sm:text-5xl">{content.title}</h2>
        <p className="mt-6 text-base text-white/70 sm:text-lg">{content.description}</p>
      </motion.header>
      <div className="grid gap-8 md:grid-cols-3">
        {content.pillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            className="group"
            initial={cardMotion.initial}
            whileInView={cardMotion.animate}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
          >
            <TiltCard className="glass-panel frosted-border relative flex h-full flex-col gap-4 rounded-3xl p-8">
              <span className="text-xs uppercase tracking-[0.32em] text-accent/80">{`0${index + 1}`}</span>
              <h3 className="text-xl font-semibold text-white/90">{pillar.title}</h3>
              <p className="text-sm text-white/70">{pillar.body}</p>
              <span className="pointer-events-none absolute -right-6 top-6 h-16 w-16 rounded-full border border-accent/40 bg-accent/10 blur-2xl transition group-hover:scale-125" />
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

type TiltCardProps = ComponentPropsWithoutRef<typeof Tilt>;

function TiltCard({ className, children, ...rest }: TiltCardProps) {
  return (
    <Tilt
      glareEnable
      glareMaxOpacity={0.3}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      className={className}
      {...rest}
    >
      {children}
    </Tilt>
  );
}
