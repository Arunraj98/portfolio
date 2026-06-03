import React from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * Minimal Global Footer Component
 * 
 * For Angular developers:
 * React components compile to flat HTML nodes. There is no custom container
 * tag generated in the final DOM (unlike <app-footer> in Angular) unless you explicitly declare one,
 * keeping the DOM tree clean.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-surface/30 bg-background/50 py-12 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Copyright and subtle status indicator */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="font-mono text-xs text-muted">
            &copy; {currentYear} ARUNRAJ A. ALL RIGHTS RESERVED.
          </p>
          <div className="font-mono text-[10px] text-accent tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
            <span>SYSTEM // RUNNING</span>
          </div>
        </div>

        {/* Center: Subtle ASCII signature stamp */}
        <div className="hidden lg:block font-mono text-xs text-muted/30 select-none">
          {`/* arunraj-portfolio_v1.0.0 */`}
        </div>

        {/* Right Side: Monospace social anchors */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-muted hover:text-accent flex items-center gap-1 transition-colors focus:outline-none"
          >
            GitHub
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-muted hover:text-accent flex items-center gap-1 transition-colors focus:outline-none"
          >
            LinkedIn
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
