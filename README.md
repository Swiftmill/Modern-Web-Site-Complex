# A Website — Modern Cosmic Showcase

A Website est une vitrine immersive construite avec Next.js 14, TypeScript et Three.js. Le site met en scène une galaxie 3D interactive, des transitions premium (Framer Motion/GSAP) et une direction artistique néon inspirée de l'espace.

## 🚀 Démarrage

```bash
npm install
npm run dev
```

- `npm run build` : build production
- `npm run start` : serveur production
- `npm run lint` : linting

## 🧱 Stack principale

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + design tokens personnalisés
- Three.js via @react-three/fiber & @react-three/drei
- GSAP + Framer Motion pour les animations UI et le scroll storytelling
- Lenis pour le smooth scroll respectueux du prefers-reduced-motion
- Postprocessing (Bloom, FXAA), shaders GLSL pour la nébuleuse

## 📁 Structure

```
app/
  layout.tsx                # Layout global + metadata
  (site)/page.tsx           # Page principale
  (site)/sections/*         # Sections UI (Hero, About, Projects, Skills, Contact)
  content/*.json            # Contenu statique
  styles/*                  # Tokens & global styles
components/
  SiteNavbar, GlowButton
  SmoothScrollProvider
  OrbitCarousel             # Carrousel 3D orbitant
  three/*                   # Canvas galaxie, shaders, constellation
lib/
  gsap/, perf/, shaders/
public/
  media/*                   # Assets statiques (posters, fallback, etc.)
```

## ✨ Fonctionnalités

- Galaxie WebGL (100k étoiles instanciées, shader de nébuleuse, planètes low poly)
- Adaptation de qualité temps réel via détection FPS
- Carrousel 3D orbitant et constellation interactive
- Animations micro-interactions (hover glow, tilt, reveals)
- Accessibilité : skip link, focus states, prefers-reduced-motion, formulaire accessible
- SEO : metadata OG/Twitter, sitemap, robots.txt

## 📦 Déploiement

Le projet est 100% statique : aucun backend, les contenus sont chargés depuis `app/content/*.json`. Déployable sur Vercel, Netlify ou toute plateforme static-friendly.
