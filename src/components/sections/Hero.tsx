"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Button } from "@/components/ui/Button";

// 1. TypeScript Interface for the Stats Data
interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const statsData: StatItem[] = [
  { value: 17, suffix: "+", label: "SPAs Delivered" },
  { value: 8, suffix: "", label: "Angular Migrations" },
  { value: 85, suffix: "%", label: "CI/CD Reduction" },
  { value: 100, suffix: "%", label: "POC-to-Production" },
];

/**
 * StatCounter Component
 * Runs a smooth high-performance count-up animation when it enters the viewport.
 */
function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // useInView triggers when the component intersects with the viewport
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    // Only animate when the element is visible to the user
    if (!inView) return;

    const node = ref.current;
    if (!node) return;

    // Framer Motion's animate function controls the interpolation
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toString();
      },
    });

    // Cleanup: cancel the animation if the component unmounts
    return () => controls.stop();
  }, [value, inView]);

  return (
    <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-accent tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

/**
 * Editorial & Cinematic Hero Section
 */
export default function Hero() {
  // Staggered sequence variant configuration
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

  const eyebrowVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
  };

  const headingVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Cinematic out-expo curve
      },
    },
  };

  const subheadingVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 16,
      },
    },
  };

  const buttonsVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 16,
      },
    },
  };

  const statsVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 16,
      },
    },
  };

  const headingLines = [
    { text: "Building Scalable", classes: "text-foreground" },
    { text: "Enterprise Web", classes: "text-foreground" },
    { text: "Experiences.", classes: "text-accent" },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-24 py-24 overflow-hidden bg-background">
      {/* 2. Moving dot grid background with radial mask for center spotlight */}
      <div 
        className="absolute inset-0 animated-dot-grid pointer-events-none -z-10 opacity-60" 
        style={{
          maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl w-full flex flex-col items-start gap-8 md:gap-10"
      >
        {/* Eyebrow Tag */}
        <motion.div 
          variants={eyebrowVariants} 
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface border border-accent/20 text-accent font-mono text-xs uppercase tracking-widest"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Senior Software Engineer · 3.5+ Years · Kochi, Kerala
        </motion.div>

        {/* Main Heading (word-by-word reveal) */}
        <motion.h1
          variants={headingVariants}
          className="text-[40px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-sans font-black uppercase tracking-tight leading-[1.0] md:leading-[0.95] flex flex-col items-start"
        >
          {headingLines.map((line, lineIndex) => (
            <span key={lineIndex} className="block overflow-hidden py-1">
              {line.text.split(" ").map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  variants={wordVariants}
                  className={`inline-block mr-[0.25em] last:mr-0 ${line.classes}`}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          variants={subheadingVariants}
          className="text-muted font-mono text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed"
        >
          Angular (v12–v20) · TypeScript · RxJS · NgRx · Ionic · Azure DevOps
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          variants={buttonsVariants} 
          className="flex flex-wrap gap-4"
        >
          <Button 
            variant="primary" 
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
          >
            View My Work
          </Button>
          <Button 
            variant="outline" 
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Let&apos;s Talk
          </Button>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          variants={statsVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 w-full border-t border-surface/50 pt-10 mt-6"
        >
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-start gap-1 md:border-r last:border-r-0 border-surface/40 md:pr-4">
              <StatCounter value={stat.value} suffix={stat.suffix} />
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted mt-1 leading-normal">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
