"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SKILLS, Skill } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

/**
 * Editorial Skills Tag Clouds Section
 */
export default function Skills() {
  const frontendSkills = SKILLS.filter(s => s.category === "frontend_mobile");
  const devopsSkills = SKILLS.filter(s => s.category === "devops_backend");
  const aiSkills = SKILLS.filter(s => s.category === "ai_tools");


  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const pillVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  };

  const renderSkillGroup = (title: string, skills: Skill[]) => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border-b border-surface/30 pb-12 last:border-b-0 last:pb-0">
        {/* Editorial category sidebar */}
        <div className="lg:col-span-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4 lg:mb-0">
            {title}
          </h3>
        </div>

        {/* Dynamic Tag Cloud */}
        <div className="lg:col-span-9">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap gap-3"
          >
            {skills.map((skill) => (
              <motion.span
                key={skill.name}
                variants={pillVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="group inline-flex items-center bg-surface border border-surface/50 text-foreground hover:bg-accent hover:text-black hover:border-accent font-sans text-sm px-4 py-2 cursor-default transition-all duration-200"
              >
                {/* Level indicator dot */}
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full mr-2.5 inline-block transition-colors duration-200",
                  skill.level === "expert" 
                    ? "bg-accent group-hover:bg-black" 
                    : skill.level === "proficient" 
                    ? "bg-foreground/50 group-hover:bg-black/60" 
                    : "bg-muted/30 group-hover:bg-black/30"
                )} />
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <SectionWrapper id="skills" label="02 / Skills">
      <div className="flex flex-col gap-12 sm:gap-16">
        {renderSkillGroup("Frontend & Mobile", frontendSkills)}
        {renderSkillGroup("DevOps, Backend & Desktop", devopsSkills)}
        {renderSkillGroup("AI & Emerging Tech", aiSkills)}
      </div>
    </SectionWrapper>
  );
}
