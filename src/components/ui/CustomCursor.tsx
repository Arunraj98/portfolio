"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 450, damping: 30 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmall = window.innerWidth < 768;
      setIsMobile(isTouch || isSmall);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) {
      document.body.classList.remove("custom-cursor-active");
      return () => window.removeEventListener("resize", checkDevice);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, label[for], .clickable"
      );
      targets.forEach((elem) => {
        // Remove existing listeners to prevent duplicates
        elem.removeEventListener("mouseenter", handleHoverStart);
        elem.removeEventListener("mouseleave", handleHoverEnd);
        elem.addEventListener("mouseenter", handleHoverStart);
        elem.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    document.body.classList.add("custom-cursor-active");

    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    addHoverListeners();

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.classList.remove("custom-cursor-active");
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 48 : 12,
          height: isHovered ? 48 : 12,
          backgroundColor: isHovered ? "rgba(232, 255, 58, 0.08)" : "rgba(232, 255, 58, 0.1)",
          border: isHovered ? "1.5px solid #E8FF3A" : "1px solid rgba(232, 255, 58, 0.4)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.25 }}
        className="fixed pointer-events-none z-[99999] rounded-full"
      />
      {/* Inner Pinpoint Dot */}
      <motion.div
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.3 : 1,
          backgroundColor: isHovered ? "#E8FF3A" : "#E8FF3A",
        }}
        className="fixed pointer-events-none z-[99999] w-2 h-2 rounded-full"
      />
    </>
  );
}
