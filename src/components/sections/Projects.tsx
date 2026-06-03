"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { PROJECTS } from "@/lib/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";

/**
 * Animated Projects Section with Tag-Based Filtering
 */
export default function Projects() {
  const [selectedTag, setSelectedTag] = useState("All");

  // Extract unique tags dynamically to support future resume additions
  const uniqueTags = ["All", ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];

  const filteredProjects = selectedTag === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(selectedTag));

  return (
    <SectionWrapper id="work" label="03 / Projects">
      <div className="flex flex-col gap-8 md:gap-10">
        
        {/* Dynamic Filter Buttons */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-surface/30">
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`font-mono text-[10px] sm:text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-300 cursor-pointer ${
                selectedTag === tag
                  ? "bg-accent border-accent text-black font-extrabold"
                  : "bg-surface/20 border-surface/50 text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid Container with Layout Animation */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              // Find original index from full array to preserve index labels during filtering
              const originalIndex = PROJECTS.findIndex(p => p.title === project.title);

              return (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <ProjectCard 
                    project={project} 
                    index={originalIndex} 
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}

