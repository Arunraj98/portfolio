"use client";

import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Extends Framer Motion's HTMLMotionProps for buttons so it supports all standard
// HTML attributes (type, disabled, onClick) AND Framer Motion props (animate, whileHover).
// We omit "ref" to avoid standard typing mismatch between React and Framer Motion.
export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

/**
 * Premium Animated Button Component
 * 
 * For Angular developers: 
 * React components combine state, markup, and logic in one file.
 * Instead of writing complex CSS animations or Angular @triggers, we use
 * Framer Motion's `whileHover` and `whileTap` properties to declare micro-interactions.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    
    // Core styling classes mapping to the theme custom properties
    const baseStyles = "inline-flex items-center justify-center font-mono font-medium tracking-tight rounded-none transition-colors focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
    
    const variants = {
      primary: "bg-accent text-black border border-accent hover:shadow-[0_0_20px_rgba(232,255,58,0.25)]",
      outline: "bg-transparent text-accent border border-accent/40 hover:border-accent hover:shadow-[0_0_15px_rgba(232,255,58,0.1)]",
      ghost: "bg-transparent text-muted hover:text-foreground hover:bg-surface/50",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs uppercase tracking-wider",
      md: "px-6 py-3 text-sm uppercase tracking-wider",
      lg: "px-8 py-4 text-base uppercase tracking-wider",
    };

    return (
      <motion.button
        ref={ref as any}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        
        // --- Framer Motion Animation Settings ---
        // 1. whileHover: Animation state targeted when the cursor hovers over the element.
        //    We scale by 1.02 (2% larger) and smooth it.
        whileHover={{ scale: 1.02 }}
        // 2. whileTap: Animation state triggered on click (mouse down).
        whileTap={{ scale: 0.98 }}
        // 3. transition: Defines the easing and timing of the animation.
        //    Here we use a spring curve for physical weight/responsiveness.
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
