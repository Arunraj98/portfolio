export interface Project {
  title: string;
  role: string;
  tech: string;
  desc: string;
  period: string;
  tags: string[];
  highlights?: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "Developer Portfolio — Next.js 16 + Gemini AI",
    role: "Full Stack Developer",
    tech: "Next.js 16 · TypeScript · Tailwind CSS · Framer Motion · Zustand · Prisma · Neon · Vercel · Gemini 2.5 Flash · Google Search Tool",
    desc: "Personal portfolio site built with Next.js 16 (App Router), Tailwind CSS, and Framer Motion. Includes a Gemini 2.5 Flash-powered AI chatbot with Google Search grounding for live Q&A on skills and projects. Data layer uses Prisma with Neon serverless Postgres; deployed on Vercel.",
    period: "2025 – Present",
    tags: ["Next.js 16", "AI Chatbot", "Vercel", "Prisma"],
    highlights: [
      "Personal portfolio site built with Next.js 16 (App Router), Tailwind CSS, and Framer Motion.",
      "Includes a Gemini 2.5 Flash-powered AI chatbot with Google Search grounding for live Q&A on skills and projects.",
      "Data layer uses Prisma with Neon serverless Postgres; deployed on Vercel."
    ]
  },
  {
    title: "LIMS Patient Messaging Platform",
    role: "Solo Lead Engineer",
    tech: ".NET 4.7.2 · WinForms · WhatsApp Business API · Telegram Bot API · DevExpress",
    desc: "End-to-end messaging integration inside a .NET WinForms LIMS: WhatsApp lab report delivery with in-app template management, Telegram bot patient registration with dual-QR onboarding, and a real-time staff-patient chat module with RBAC and PDF support.",
    period: "Feb 2026 – Present",
    tags: ["WhatsApp API", "Telegram Bot API", ".NET WinForms", "DevExpress"],
    highlights: [
      "Designed and delivered a WhatsApp-based lab report dispatch system integrated into an existing .NET WinForms LIMS — replacing a fully manual process.",
      "Developed a custom Meta message template builder within the LIMS UI, handling template creation, Meta submission, approval tracking, and a Send Logs dashboard.",
      "Architected a Telegram Bot patient registration flow using a dual-QR approach: bill-specific QR codes for returning patients and a lab-wide QR for walk-in registration, with a three-step fallback.",
      "Built a real-time bidirectional messaging module inside the LIMS — staff-to-patient chat with PDF attachments, message management, and role-based access control."
    ]
  },
  {
    title: "Azure DevOps CI/CD — Mobile Build Automation",
    role: "DevOps Engineer",
    tech: "Azure DevOps · Ionic · Angular · Android · iOS",
    desc: "Designed automated build and release pipelines for Ionic Android and iOS apps on Azure DevOps. Reduced release cycle from ~48 hours to ~3 hours. Pipelines remain in active use.",
    period: "Sep 2024 – Oct 2024",
    tags: ["Azure DevOps", "Ionic", "CI/CD", "Automation"],
    highlights: [
      "Designed automated build and release pipelines for Ionic Android and iOS apps on Azure DevOps.",
      "Reduced release cycle from ~48 hours to ~3 hours.",
      "Pipelines remain in active use."
    ]
  },
  {
    title: "Angular Enterprise Migration",
    role: "Migration Lead",
    tech: "Angular v12–v20 · RxJS · NgRx · TypeScript · SCSS",
    desc: "Led incremental Angular version upgrades (v12 through v20) across multiple live applications. Managed dependency conflicts, NgRx API changes, and coordinated regression testing to ensure production stability throughout.",
    period: "May 2025 – Aug 2025",
    tags: ["Angular", "Upgrade", "NgRx", "Migration"],
    highlights: [
      "Led incremental Angular version upgrades (v12 through v20) across multiple live applications.",
      "Managed dependency conflicts and NgRx API changes.",
      "Coordinated regression testing to ensure production stability throughout."
    ]
  },
  {
    title: "Node-RED Real-Time Notification Engine",
    role: "Architect",
    tech: "Node-RED · Angular · REST APIs",
    desc: "Built a workflow-based real-time notification engine using Node-RED, integrated with an Angular frontend. Delivered and deployed within a single working day.",
    period: "Aug 2023 – Sep 2023",
    tags: ["Node-RED", "Real-Time", "Angular", "Backend"],
    highlights: [
      "Built a workflow-based real-time notification engine using Node-RED, integrated with an Angular frontend.",
      "Delivered and deployed within a single working day."
    ]
  }
];
