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
    title: "LIMS Patient Messaging Platform",
    role: "Solo Lead Engineer",
    tech: "WhatsApp & Telegram API · .NET 4.7.2 · DevExpress · SQL Server",
    desc: "Solo end-to-end delivery of a full patient communication platform. Engineered a Meta-approved PDF workaround, dual-QR onboarding, and a real-time bidirectional chat system. Self-initiated without a formal specification, eliminating all manual report dispatch.",
    period: "Feb 2026 – Present",
    tags: ["Enterprise", "API Integration", "Healthcare"],
    highlights: [
      "Meta-approved document-header template workaround enabling single-click PDF report delivery with zero prior patient interaction.",
      "Complete WhatsApp settings module including an in-app template builder with real-time approval status tracking.",
      "Dual QR registration bot strategy mapping patient ID parameters to Telegram bot URLs.",
      "Real-time bidirectional chat with RBAC, PDF attachments, and active message logs inside LIMS."
    ]
  },
  {
    title: "Azure DevOps CI/CD Pipeline",
    role: "DevOps Engineer",
    tech: "Azure DevOps · Ionic · Angular · Android · iOS",
    desc: "Engineered zero-touch CI/CD automation pipelines for Ionic Android and iOS builds, reducing mobile compile and release cycle times by 85%. Requires no manual steps post-merge, remaining in continuous use.",
    period: "Sep – Oct 2024",
    tags: ["DevOps", "Mobile", "Automation"],
    highlights: [
      "Reduced mobile release cycles from 48 hours to 3 hours.",
      "Automated keystore signing, plist updates, and build delivery pipelines.",
      "Maintained zero-touch builds in production for over 18 months."
    ]
  },
  {
    title: "Angular Enterprise Migration",
    role: "Migration Lead",
    tech: "Angular v12-v20 · RxJS · NgRx · SCSS · TypeScript",
    desc: "Directed 8 major version upgrades across live enterprise applications with zero production downtime. Built a custom shared component library adopted org-wide, cutting cross-project boilerplate code.",
    period: "May – Aug 2025",
    tags: ["Migration", "Architecture"],
    highlights: [
      "8 major upgrades completed on production environments with zero downtime.",
      "Shared component library (loaders, alerts, logs) reduced project boilerplate by 30%."
    ]
  },
  {
    title: "oneLEAD — Lead Management Suite",
    role: "Lead Engineer",
    tech: "Angular · ag-Grid · Google Maps API · TypeScript",
    desc: "Developed a high-performance lead management SPA with ag-Grid sorting, filtering, and pagination plus Google Maps geocoding. Delivered on schedule with zero post-release defects.",
    period: "Jul – Aug 2024",
    tags: ["SPA", "Enterprise"]
  },
  {
    title: "Node-RED Notification Engine",
    role: "Architect",
    tech: "Node-RED · Angular · REST APIs · Webhooks",
    desc: "Designed and deployed a workflow-based notification engine in one working day, achieving 100% production readiness on first deployment with zero subsequent rework requested.",
    period: "Aug – Sep 2023",
    tags: ["Backend", "Real-time"],
    highlights: [
      "Initiated, designed, and deployed within a single 24-hour cycle.",
      "Zero post-release defects or rework requests."
    ]
  },
  {
    title: "Financial Information Platform",
    role: "Software Engineer",
    tech: "Angular · Ionic · Azure DevOps · Android · iOS",
    desc: "Produced a finance manager Angular SPA and converted it into a cross-platform Ionic mobile app. Deployed across Dev and UAT environments with full UI/UX, testing, and CI/CD pipeline coverage.",
    period: "Mar – Apr 2024",
    tags: ["Finance", "Mobile"]
  }
];
