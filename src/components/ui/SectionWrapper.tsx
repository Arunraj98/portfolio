"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  label?: string; // Optional section number, e.g. "01 / About"
  title?: string; // Optional section title displayed in the sidebar
}

// Client-side animated counter for section numbers (e.g., "01" -> counts from "00" to "01")
function AnimatedLabel({ label }: { label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mounted, setMounted] = useState(false);

  const matches = label.match(/^(\d+)(.*)/);
  const targetNumber = matches ? parseInt(matches[1], 10) : 0;
  const rest = matches ? matches[2] : label;

  const [count, setCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && mounted && targetNumber > 0) {
      const controls = animate(0, targetNumber, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setCount(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, mounted, targetNumber]);

  if (!mounted || !matches) {
    return <span>{label}</span>;
  }

  const formattedCount = String(count).padStart(matches[1].length, "0");

  return (
    <span ref={ref}>
      {formattedCount}
      {rest}
    </span>
  );
}

/**
 * SectionWrapper Layout Component with Unified Entrance Animations
 */
export const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  ({ className, id, label, title, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative py-20 md:py-32 border-b border-surface/30 px-6 md:px-12 overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Entrance Animation Wrapper for the entire layout grid */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16"
        >
          {/* Sidebar */}
          {(label || title) && (
            <div className="w-full md:w-[200px] lg:w-[240px] flex-shrink-0 flex flex-col items-start gap-3">
              {label && (
                <div className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-accent"></span>
                  <AnimatedLabel label={label} />
                </div>
              )}
              {title && (
                <h2 className="text-lg md:text-xl font-sans font-bold uppercase tracking-wider text-foreground">
                  {title}
                </h2>
              )}
            </div>
          )}

          {/* Content Pane */}
          <div className="flex-grow w-full">
            {children}
          </div>
        </motion.div>
      </section>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";
