"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { useContactForm } from "@/hooks/useContactForm";
import { Mail, MessageSquare } from "lucide-react";

// Inline custom SVG to guarantee cross-environment brand icon rendering
const LinkedinIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

/**
 * Premium Contact Section with form validation and real-time statuses
 */
export default function Contact() {
  const {
    register,
    onSubmit,
    errors,
    isLoading,
    isSuccess,
    isError,
    errorMessage,
    resetForm,
  } = useContactForm();

  // Animation variants for form items
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email Direct",
      value: "rajaarun384@gmail.com",
      href: "mailto:rajaarun384@gmail.com",
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      value: "+91 9605334293",
      href: "https://wa.me/919605334293",
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn Connect",
      value: "linkedin.com/in/arunraj98",
      href: "https://linkedin.com/in/arunraj98",
    },
  ];

  return (
    <SectionWrapper id="contact" label="04 / Contact">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Title + Info Cards */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black uppercase tracking-tight text-accent leading-[1.05] mb-4">
              Let&apos;s Build Something.
            </h3>
            <p className="text-muted text-sm sm:text-base leading-relaxed font-sans max-w-md">
              Have an enterprise integration project, structural migration, or architectural query? Reach out directly or complete the messaging form.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <a
                  key={idx}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 bg-surface border border-surface/50 hover:border-accent/40 hover:bg-surface/80 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="p-3 bg-background border border-surface/50 group-hover:border-accent/25 group-hover:bg-accent/5 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                      {method.label}
                    </span>
                    <span className="text-sm font-sans font-semibold text-foreground group-hover:text-accent transition-colors duration-300 mt-0.5">
                      {method.value}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7 w-full">
          <motion.form
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            onSubmit={onSubmit}
            className="flex flex-col gap-6 w-full"
          >
            {/* Input Name */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                {...register("name")}
                disabled={isLoading}
                className={`w-full bg-surface/30 border px-4 py-3 text-sm focus:outline-none focus:border-accent text-foreground font-sans placeholder-muted/30 rounded-none transition-colors ${
                  errors.name ? "border-red-500/50 focus:border-red-500" : "border-surface/50"
                }`}
              />
              {errors.name && (
                <span className="font-mono text-[10px] text-red-400 mt-1">
                  {errors.name.message}
                </span>
              )}
            </motion.div>

            {/* Input Email */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. john@example.com"
                {...register("email")}
                disabled={isLoading}
                className={`w-full bg-surface/30 border px-4 py-3 text-sm focus:outline-none focus:border-accent text-foreground font-sans placeholder-muted/30 rounded-none transition-colors ${
                  errors.email ? "border-red-500/50 focus:border-red-500" : "border-surface/50"
                }`}
              />
              {errors.email && (
                <span className="font-mono text-[10px] text-red-400 mt-1">
                  {errors.email.message}
                </span>
              )}
            </motion.div>

            {/* Input Message */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Describe your project constraints, milestones or architecture goals..."
                {...register("message")}
                disabled={isLoading}
                className={`w-full bg-surface/30 border px-4 py-3 text-sm focus:outline-none focus:border-accent text-foreground font-sans placeholder-muted/30 rounded-none transition-colors resize-none ${
                  errors.message ? "border-red-500/50 focus:border-red-500" : "border-surface/50"
                }`}
              />
              {errors.message && (
                <span className="font-mono text-[10px] text-red-400 mt-1">
                  {errors.message.message}
                </span>
              )}
            </motion.div>

            {/* Submit Button & Status Alerts */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4 mt-2">
              <Button
                variant={isSuccess ? "ghost" : "primary"}
                type="submit"
                disabled={isLoading || isSuccess}
                className="self-start min-w-[160px] h-12"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center gap-2 text-green-400 font-bold">
                    <svg className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Sent!
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>

              {/* Status Alert Panels */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/35 text-green-400 font-mono text-[11px] flex justify-between items-center"
                >
                  <span>Message delivered successfully! I will get back to you shortly.</span>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-accent underline font-bold cursor-pointer bg-transparent border-0 outline-none ml-4"
                  >
                    Send Another
                  </button>
                </motion.div>
              )}

              {isError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/35 text-red-400 font-mono text-[11px]"
                >
                  {errorMessage}
                </motion.div>
              )}
            </motion.div>
          </motion.form>
        </div>

      </div>
    </SectionWrapper>
  );
}
