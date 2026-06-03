import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to conditionally join and merge Tailwind CSS class names.
 * Similar to Angular's dynamic class bindings (e.g. [ngClass]), this
 * merges classes and correctly resolves Tailwind style overrides.
 * 
 * @param inputs - List of class names, conditional objects, or arrays
 * @returns Concatenated and deduplicated Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely generates a UUID v4 string across browser and server-side environments.
 * Provides a fallback for older browsers and non-secure (HTTP) origins where
 * crypto.randomUUID is not available, avoiding Node.js dependency bundling issues.
 */
export function generateUUID(): string {
  if (
    typeof window !== "undefined" &&
    window.crypto &&
    typeof window.crypto.randomUUID === "function"
  ) {
    return window.crypto.randomUUID();
  }
  
  // Safe fallback for non-secure contexts and SSR
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
