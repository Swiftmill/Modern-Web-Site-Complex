"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const socialLinks = [
  { href: "https://dribbble.com", label: "Dribbble" },
  { href: "https://behance.net", label: "Behance" },
  { href: "https://github.com", label: "GitHub" }
];

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  return (
    <section id="contact" className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 sm:px-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center"
      >
        <p className="font-display text-sm uppercase tracking-[0.4em] text-accent-2">Contact</p>
        <h2 className="mt-4 text-3xl font-semibold text-gradient sm:text-5xl">
          Prêts à tracer une nouvelle constellation ?
        </h2>
        <p className="mt-6 text-base text-white/70 sm:text-lg">
          Parlez-nous de votre prochaine mission, nous calibrerons ensemble un voyage cosmique mémorable.
        </p>
      </motion.header>
      <div className="glass-panel frosted-border grid gap-10 rounded-3xl p-10 lg:grid-cols-[1fr_0.8fr]">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-6"
          action="mailto:contact@awebsite.studio"
          method="post"
          encType="text/plain"
        >
          <label className="flex flex-col gap-2 text-sm text-white/70">
            Nom
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
              name="name"
              autoComplete="name"
              value={formState.name}
              onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-white/70">
            Email
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
              type="email"
              name="email"
              autoComplete="email"
              value={formState.email}
              onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-white/70">
            Message
            <textarea
              className="min-h-[160px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
              name="message"
              value={formState.message}
              onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
              required
            />
          </label>
          <button
            type="submit"
            className="mt-4 rounded-full border border-white/10 bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-white/90 shadow-lg shadow-accent/40 transition hover:bg-accent-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Envoyer
          </button>
        </motion.form>
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col justify-between gap-8"
        >
          <div className="space-y-4 text-sm text-white/70">
            <p>
              Nous opérons depuis Paris et Montréal, déployant des équipes hybrides capables de couvrir stratégie, design,
              développement et production audio-visuelle.
            </p>
            <p>
              <strong className="text-white">contact@awebsite.studio</strong>
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.32em] text-white/60">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.aside>
      </div>
      <footer className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/40">
        <span>© {new Date().getFullYear()} A Website Studio</span>
        <span>Made with love across the cosmos</span>
      </footer>
    </section>
  );
}
