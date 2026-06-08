export interface Skill {
  name: string;
  category: "frontend_mobile" | "devops_backend" | "ai_tools";
  level: "expert" | "proficient" | "familiar";
}

export const SKILLS: Skill[] = [
  // Frontend & Mobile
  { name: "Angular v12–v20", category: "frontend_mobile", level: "expert" },
  { name: "RxJS", category: "frontend_mobile", level: "expert" },
  { name: "NgRx", category: "frontend_mobile", level: "expert" },
  { name: "TypeScript", category: "frontend_mobile", level: "expert" },
  { name: "Angular CLI", category: "frontend_mobile", level: "expert" },
  { name: "Lazy Loading & Optimisation", category: "frontend_mobile", level: "expert" },
  { name: "OnPush Change Detection", category: "frontend_mobile", level: "expert" },
  { name: "Component Libraries", category: "frontend_mobile", level: "expert" },
  { name: "ag-Grid", category: "frontend_mobile", level: "proficient" },
  { name: "SCSS / CSS Grid", category: "frontend_mobile", level: "expert" },
  { name: "WCAG Accessibility", category: "frontend_mobile", level: "proficient" },
  { name: "React", category: "frontend_mobile", level: "proficient" },
  { name: "Next.js 16 (App Router)", category: "frontend_mobile", level: "proficient" },
  { name: "Zustand", category: "frontend_mobile", level: "proficient" },
  { name: "Tailwind CSS", category: "frontend_mobile", level: "proficient" },
  { name: "Framer Motion", category: "frontend_mobile", level: "proficient" },
  { name: "Ionic Framework", category: "frontend_mobile", level: "expert" },
  { name: "Capacitor", category: "frontend_mobile", level: "proficient" },
  { name: "Cross-Platform Android / iOS", category: "frontend_mobile", level: "expert" },
  { name: "Responsive Design", category: "frontend_mobile", level: "expert" },

  // DevOps, Backend & Desktop
  { name: "Node.js", category: "devops_backend", level: "proficient" },
  { name: "Next.js API Routes", category: "devops_backend", level: "proficient" },
  { name: "Prisma ORM", category: "devops_backend", level: "proficient" },
  { name: "PostgreSQL & Neon", category: "devops_backend", level: "proficient" },
  { name: "REST APIs", category: "devops_backend", level: "expert" },
  { name: ".NET 4.7.2", category: "devops_backend", level: "proficient" },
  { name: "WinForms", category: "devops_backend", level: "proficient" },
  { name: "DevExpress", category: "devops_backend", level: "proficient" },
  { name: "WhatsApp Business API", category: "devops_backend", level: "expert" },
  { name: "Meta Template API", category: "devops_backend", level: "expert" },
  { name: "Telegram Bot API", category: "devops_backend", level: "expert" },
  { name: "Node-RED", category: "devops_backend", level: "proficient" },
  { name: "Google Maps API", category: "devops_backend", level: "proficient" },
  { name: "Azure DevOps", category: "devops_backend", level: "expert" },
  { name: "Vercel", category: "devops_backend", level: "proficient" },
  { name: "Git & GitHub", category: "devops_backend", level: "expert" },
  { name: "Android & iOS Build Pipelines", category: "devops_backend", level: "expert" },
  { name: "Jira", category: "devops_backend", level: "proficient" },
  { name: "Figma", category: "devops_backend", level: "proficient" },

  // AI & Emerging Tech
  { name: "Gemini 2.5 Flash", category: "ai_tools", level: "proficient" },
  { name: "Google Search Tool", category: "ai_tools", level: "proficient" },
  { name: "Claude API", category: "ai_tools", level: "proficient" },
  { name: "Model Context Protocol (MCP)", category: "ai_tools", level: "proficient" },
  { name: "AI Agent Development", category: "ai_tools", level: "proficient" },
  { name: "GitHub Copilot", category: "ai_tools", level: "expert" },
  { name: "Cursor", category: "ai_tools", level: "expert" }
];
