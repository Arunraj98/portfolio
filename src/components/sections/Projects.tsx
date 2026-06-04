"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { PROJECTS, Project } from "@/lib/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import { X, Briefcase, Calendar, Cpu, CheckCircle2 } from "lucide-react";

/**
 * Animated Projects Section with Tag-Based Filtering and Project Detail Modal
 */
export default function Projects() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Extract unique tags dynamically to support future resume additions
  const uniqueTags = ["All", ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];

  const filteredProjects = selectedTag === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(selectedTag));

  // Lock global scroll when project details modal is active
  useEffect(() => {
    if (activeProject) {
      (window as any).lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      (window as any).lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      (window as any).lenis?.start();
      document.body.style.overflow = "";
    };
  }, [activeProject]);

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
                    onViewDetails={() => setActiveProject(project)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {activeProject && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10 cursor-default"
              onClick={() => setActiveProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 30, stiffness: 350 }}
                className="bg-background border border-surface/50 max-w-2xl w-full max-h-[85vh] flex flex-col relative rounded-none shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 text-muted hover:text-accent p-2 cursor-pointer transition-colors duration-200 focus:outline-none z-20"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Content container (Scrollable) */}
                <div 
                  data-lenis-prevent 
                  className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-6 flex-grow"
                >
                  {/* Category / Role & Date */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-accent/80 font-mono text-[10px] sm:text-xs uppercase tracking-widest border-b border-surface/20 pb-4">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      {activeProject.role}
                    </span>
                    <span className="hidden sm:inline text-surface/80">|</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {activeProject.period}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-sans font-black uppercase tracking-tight text-foreground leading-tight">
                    {activeProject.title}
                  </h3>

                  {/* Tech stack */}
                  <div className="flex flex-col gap-1.5 bg-surface/20 p-4 border border-surface/50 font-mono text-xs">
                    <span className="text-[10px] uppercase tracking-widest text-muted flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      Technology Stack
                    </span>
                    <span className="text-foreground font-semibold mt-1">
                      {activeProject.tech}
                    </span>
                  </div>

                  {/* Project Overview */}
                  <div className="space-y-2">
                    <h4 className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent font-bold">
                      Project Overview
                    </h4>
                    <p className="text-muted text-sm sm:text-base leading-relaxed font-sans">
                      {activeProject.desc}
                    </p>
                  </div>

                  {/* Key Contributions & Highlights */}
                  {activeProject.highlights && activeProject.highlights.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-surface/20">
                      <h4 className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent font-bold">
                        Key Contributions & Achievements
                      </h4>
                      <ul className="list-none flex flex-col gap-3.5">
                        {activeProject.highlights.map((bullet, bIdx) => (
                          <li 
                            key={bIdx} 
                            className="text-muted text-sm sm:text-base leading-relaxed font-sans flex items-start gap-3"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent mt-1 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer Tag List */}
                <div className="p-6 bg-surface/10 border-t border-surface/20 flex flex-wrap gap-1.5">
                  {activeProject.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="font-mono text-[9px] uppercase tracking-wider bg-background border border-surface/60 text-muted px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}

