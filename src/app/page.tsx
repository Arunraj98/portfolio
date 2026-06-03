import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

/**
 * Main Home Page Route (/)
 * 
 * For Angular developers:
 * In Angular App routing, pages are often dynamic router-outlets.
 * In a Next.js App Router setup, page.tsx acts as the direct template wrapper for this route.
 * We compose our single-page layout by nesting the child sections directly in the tree.
 */
export default function Home() {
  return (
    <div className="flex-1 w-full bg-background flex flex-col">
      {/* Hero Intro Canvas */}
      <Hero />

      {/* 01. Profile Bio & Stat Counters */}
      <About />

      {/* 02. Technical Competency Stack */}
      <Skills />

      {/* 03. Selected Work Grid */}
      <Projects />

      {/* 04. Messaging Connection Form */}
      <Contact />
    </div>
  );
}
