"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

type GlowButtonProps = {
  href: string;
  children: ReactNode;
};

export function GlowButton({ href, children }: GlowButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="relative inline-flex"
    >
      <div className="absolute inset-0 rounded-full bg-accent blur-lg opacity-50" aria-hidden />
      <Link
        href={href}
        className="relative inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white/90 shadow-lg shadow-accent/25 backdrop-blur transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {children}
      </Link>
    </motion.div>
  );
}
