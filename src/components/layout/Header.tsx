"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUnreadCount } from "@/store/notificationStore";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * Global Header Component with Sticky Glassmorphism and Dynamic Scroll Behaviors
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const unreadCount = useUnreadCount();
  const { scrollY } = useScrollProgress();

  const isScrolled = scrollY > 20;

  // Active section highlights via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-30% 0px -40% 0px" } // Highlights the section that occupies the center-top viewport
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Smooth scroll using globally-initialized Lenis instance
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(href, { duration: 1.2 });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300 bg-background/80 backdrop-blur-md",
        isScrolled ? "border-surface/80 shadow-md" : "border-surface/30"
      )}
    >
      {/* Container height shrinks when scrolled */}
      <div
        className={cn(
          "max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-300",
          isScrolled ? "h-16" : "h-20"
        )}
      >
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, "body")}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <span className="font-mono text-xl font-black text-accent bg-surface px-2.5 py-1 border border-accent/20 group-hover:border-accent/80 transition-colors">
            AR
          </span>
          <span className="font-sans text-xs uppercase tracking-widest text-foreground font-semibold">
            Arunraj A
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "font-mono text-xs uppercase tracking-wider transition-colors focus:outline-none flex items-center gap-1.5 relative py-2",
                  isActive ? "text-accent font-bold" : "text-muted hover:text-accent/80"
                )}
              >
                {link.label}
                {link.label === "Contact" && unreadCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-mono text-[9px] font-bold text-white shadow-sm">
                    {unreadCount}
                  </span>
                )}
                {/* Underline indicator for active item */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Animated Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-muted hover:text-accent focus:text-accent focus:outline-none relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <motion.span
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 7.5 : 0,
            }}
            transition={{ duration: 0.25 }}
            className="w-5.5 h-[1.5px] bg-current block"
          />
          <motion.span
            animate={{
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="w-5.5 h-[1.5px] bg-current block"
          />
          <motion.span
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -7.5 : 0,
            }}
            transition={{ duration: 0.25 }}
            className="w-5.5 h-[1.5px] bg-current block"
          />
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden w-full border-t border-surface/30 bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "font-mono text-sm uppercase tracking-widest transition-colors focus:outline-none flex items-center gap-2",
                      isActive ? "text-accent font-bold" : "text-muted hover:text-accent"
                    )}
                  >
                    {link.label}
                    {link.label === "Contact" && unreadCount > 0 && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 font-mono text-[10px] font-bold text-white shadow-sm">
                        {unreadCount}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
