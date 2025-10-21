"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
  { href: "#about", label: "À propos" },
  { href: "#projects", label: "Projets" },
  { href: "#skills", label: "Compétences" },
  { href: "#contact", label: "Contact" }
];

export function SiteNavbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-40 flex justify-center px-6 pt-8"
    >
      <nav className="pointer-events-auto glass-panel frosted-border flex w-full max-w-5xl items-center justify-between gap-6 rounded-full px-8 py-4 text-sm">
        <Link href="#hero" className="font-display text-sm uppercase tracking-[0.4em] text-white/80">
          A Website
        </Link>
        <ul className="hidden items-center gap-6 text-xs uppercase tracking-[0.32em] text-white/60 sm:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <Link
          href="#contact"
          className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/80 transition hover:bg-white/10"
        >
          Parlons-en
        </Link>
      </nav>
    </motion.header>
  );
}
