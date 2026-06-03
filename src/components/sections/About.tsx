"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Briefcase, Rocket, RefreshCw, CheckCircle2 } from "lucide-react";
import { JOBS } from "@/lib/data/experience";
import { EDUCATION } from "@/lib/data/education";
import { CERTIFICATIONS } from "@/lib/data/certifications";

/**
 * Editorial About Section with Narrative, Work History, Education & Certifications
 */
export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const highlights = [
    { icon: Briefcase, label: "Experience", value: "3y 9m" },
    { icon: Rocket, label: "Apps Shipped", value: "17+" },
    { icon: RefreshCw, label: "Migrations Led", value: "8" },
    { icon: CheckCircle2, label: "POC Success", value: "100%" },
  ];

  return (
    <SectionWrapper id="about" label="01 / About">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-16 sm:gap-24"
      >
        {/* Narrative & Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Large display font pull-quote + profile pic */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-8 items-start">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black uppercase tracking-tight text-accent leading-[1.05]">
              I don&apos;t just ship code. I ship solutions that stick.
            </h3>
            
            {/* Framed Profile Picture */}
            <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] bg-surface border border-surface/50 overflow-hidden group">
              {/* Color tint overlay that fades out on hover */}
              <div className="absolute inset-0 bg-accent/5 mix-blend-color z-10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none" />
              <Image 
                src="/profile_pic.jfif" 
                alt="Arunraj A Profile Picture" 
                width={320}
                height={320}
                priority
                className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 hover:contrast-100 transition-all duration-500 scale-105 group-hover:scale-100"
              />
              {/* Inset floating frame */}
              <div className="absolute inset-0 border border-accent/25 m-3 pointer-events-none z-20 transition-all duration-300 group-hover:m-2.5" />
            </div>
          </motion.div>

          {/* Right Column: Narrative paragraphs */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-7 flex flex-col gap-6 text-muted text-sm sm:text-base leading-relaxed font-sans"
          >
            <p>
              I am a Senior Software Engineer at Citrus Informatics, Kochi, with 3 years and 9 months of experience building premium, enterprise-grade applications. I specialize in designing robust frontends, automating deployments, and scaling single-page applications.
            </p>
            <p>
              My track record includes developing a critical WhatsApp Business API workaround, a Telegram dual-QR strategy, delivering 17+ single-page applications, and engineering zero-touch Azure DevOps CI/CD pipelines that reduced build-to-release cycles by 85%.
            </p>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div 
          variants={itemVariants} 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-surface/40 pt-12"
        >
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="group p-6 bg-surface border border-surface/50 hover:border-accent/40 hover:bg-surface/80 transition-all duration-300 flex flex-col items-start gap-4"
              >
                <div className="p-3 bg-background border border-surface/50 group-hover:border-accent/20 group-hover:bg-accent/5 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-accent transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {item.label}
                  </span>
                  <span className="text-xl sm:text-2xl font-sans font-bold uppercase tracking-tight text-foreground">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Work Experience Timeline */}
        <motion.div variants={itemVariants} className="border-t border-surface/40 pt-16">
          <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-12">
            Professional Experience
          </h4>
          <div className="flex flex-col gap-12 sm:gap-16">
            {JOBS.map((job, jobIdx) => (
              <div key={jobIdx} className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start group">
                {/* Timeline Column */}
                <div className="lg:col-span-3 flex flex-col items-start gap-1.5">
                  <span className="font-sans font-extrabold text-sm text-foreground uppercase tracking-tight">
                    {job.company}
                  </span>
                  <span className="font-mono text-[10px] text-accent font-semibold">
                    {job.period}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    {job.location}
                  </span>
                </div>

                {/* Narrative Details Column */}
                <div className="lg:col-span-9 flex flex-col gap-4">
                  <div>
                    <h5 className="font-sans font-bold text-lg sm:text-xl text-foreground group-hover:text-accent transition-colors duration-200 uppercase tracking-tight">
                      {job.role}
                    </h5>
                    
                    {/* Job stack tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {job.stack.map((tech) => (
                        <span key={tech} className="font-mono text-[9px] uppercase tracking-wider text-muted border border-surface/60 px-2 py-0.5 bg-surface/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul className="list-none flex flex-col gap-3 text-muted text-sm leading-relaxed font-sans">
                    {job.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-[1px] before:bg-accent/60">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education & Certifications Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-surface/40 pt-16">
          {/* Education Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent">
              Academic Background
            </h4>
            <div className="flex flex-col gap-8">
              {EDUCATION.map((edu, eduIdx) => (
                <div key={eduIdx} className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] text-accent">
                    {edu.period}
                  </span>
                  <h5 className="font-sans font-black uppercase text-base text-foreground leading-snug tracking-tight">
                    {edu.degree}
                  </h5>
                  <div className="flex justify-between items-center text-xs font-mono text-muted mt-1">
                    <span>{edu.institution}</span>
                    <span className="text-foreground/90 font-bold bg-surface px-2 py-0.5 border border-surface/50">{edu.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent">
              Professional Credentials
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert, certIdx) => (
                <div 
                  key={certIdx} 
                  className="p-5 bg-surface/40 border border-surface/50 hover:border-accent/30 hover:bg-surface/80 transition-all duration-300 flex flex-col justify-between min-h-[100px]"
                >
                  <h5 className="font-sans font-bold text-xs uppercase tracking-tight text-foreground leading-normal">
                    {cert.title}
                  </h5>
                  <div className="flex justify-between items-center text-[10px] font-mono text-muted mt-4 border-t border-surface/30 pt-2.5">
                    <span>{cert.issuer}</span>
                    <span className="text-muted/60">{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

