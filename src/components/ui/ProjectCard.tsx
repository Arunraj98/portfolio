"use client";

import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/lib/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative w-full bg-surface/40 hover:bg-surface/80 p-8 border-y border-r border-surface/50 hover:border-accent/40 border-l-4 border-l-accent/40 hover:border-l-accent flex flex-col justify-between min-h-[300px] transition-colors duration-300 overflow-hidden cursor-default"
    >
      {/* Background Watermark Project Number */}
      <span className="absolute bottom-[-10px] right-2 text-8xl sm:text-[120px] font-sans font-black text-foreground/5 opacity-[0.03] group-hover:opacity-[0.08] select-none pointer-events-none transition-opacity duration-300">
        {formattedIndex}
      </span>

      <div className="relative z-10">
        {/* Header Row */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {project.role}
          </span>
          <span className="font-mono text-[10px] text-muted/85 whitespace-nowrap">
            {project.period}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold uppercase tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>

        {/* Tech Stack List */}
        <span className="font-mono text-[10px] text-accent/75 block mt-1">
          {project.tech}
        </span>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed mt-4 max-w-xl">
          {project.desc}
        </p>
      </div>

      {/* Bottom Row: Tags & Animated View Details Button */}
      <div className="relative z-10 flex justify-between items-center mt-8 pt-4 border-t border-surface/20">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="font-mono text-[9px] uppercase tracking-wider bg-background border border-surface/80 text-muted/90 px-2.5 py-0.5 rounded-none"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* View Details Button (Revealed on Hover) */}
        <div className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pr-1">
          <button className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold flex items-center gap-1 cursor-pointer bg-transparent border-0 outline-none">
            View Details <span className="text-sm leading-none">&rarr;</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
