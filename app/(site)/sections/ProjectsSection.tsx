"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import type projects from "@/app/content/projects.json";
import { OrbitCarousel } from "@/components/OrbitCarousel";

type Projects = typeof projects;

type ProjectsSectionProps = {
  projects: Projects;
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeProject, setActiveProject] = useState(projects[0] ?? null);
  const posters = useMemo(
    () =>
      projects.map((project) => ({
        id: project.id,
        title: project.title,
        image: `/media/${project.id}.svg`
      })),
    [projects]
  );

  if (!activeProject) {
    return null;
  }

  return (
    <section id="projects" className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 sm:px-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <p className="font-display text-sm uppercase tracking-[0.4em] text-accent-2">Showcase</p>
        <h2 className="mt-4 text-3xl font-semibold text-gradient sm:text-5xl">Projets orbitant dans notre galaxie</h2>
        <p className="mt-6 text-base text-white/70 sm:text-lg">
          Une sélection de missions cosmiques alliant storytelling immersif, technologies avancées et direction artistique
          lumineuse.
        </p>
      </motion.header>
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <OrbitCarousel
          posters={posters}
          onFocus={(id) => {
            const project = projects.find((item) => item.id === id);
            if (project) setActiveProject(project);
          }}
        />
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass-panel frosted-border flex h-full flex-col gap-6 rounded-3xl p-8"
        >
          <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-white/5">
            <Image
              src={`/media/${activeProject.id}.svg`}
              alt={activeProject.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.32em] text-accent/80">Mission</p>
            <h3 className="text-2xl font-semibold text-white/90">{activeProject.title}</h3>
            <p className="text-sm text-white/70">{activeProject.description}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/60">Stack</p>
            <ul className="mt-2 flex flex-wrap gap-2 text-xs text-white/70">
              {activeProject.tech.map((tech) => (
                <li key={tech} className="rounded-full border border-white/10 px-3 py-1">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>{activeProject.role}</span>
            <a
              href={activeProject.link}
              target="_blank"
              rel="noreferrer"
              className="text-accent-2 transition hover:text-white"
            >
              Visiter ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
