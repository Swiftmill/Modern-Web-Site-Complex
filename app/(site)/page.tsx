import aboutContent from "../content/about.json";
import projectsContent from "../content/projects.json";
import skillsContent from "../content/skills.json";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ContactSection } from "./sections/ContactSection";
import { SiteNavbar } from "@/components/SiteNavbar";

export default function HomePage() {
  return (
    <main id="main" className="relative flex min-h-screen flex-col gap-32 pb-32">
      <SiteNavbar />
      <HeroSection />
      <AboutSection content={aboutContent} />
      <ProjectsSection projects={projectsContent} />
      <SkillsSection constellation={skillsContent} />
      <ContactSection />
    </main>
  );
}
