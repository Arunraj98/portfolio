"use client";

import React from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgressBar() {
  const { scrollProgress } = useScrollProgress();

  return (
    <div
      style={{ transform: `scaleX(${scrollProgress})` }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[10000] pointer-events-none transition-transform duration-100 ease-out"
    />
  );
}
