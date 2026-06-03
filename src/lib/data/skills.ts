export interface Skill {
  name: string;
  category: "frontend_mobile" | "devops_backend" | "ai_tools";
  level: "expert" | "proficient" | "familiar";
}

export const SKILLS: Skill[] = [
  // Frontend & Mobile
  { name: "Angular (v12–v20)", category: "frontend_mobile", level: "expert" },
  { name: "TypeScript", category: "frontend_mobile", level: "expert" },
  { name: "RxJS", category: "frontend_mobile", level: "expert" },
  { name: "NgRx", category: "frontend_mobile", level: "expert" },
  { name: "Ionic Framework", category: "frontend_mobile", level: "expert" },
  { name: "HTML5 / CSS3", category: "frontend_mobile", level: "expert" },
  { name: "SCSS / CSS Grid", category: "frontend_mobile", level: "expert" },
  { name: "ag-Grid", category: "frontend_mobile", level: "proficient" },
  { name: "Angular Material", category: "frontend_mobile", level: "proficient" },
  { name: "WCAG Accessibility", category: "frontend_mobile", level: "proficient" },
  { name: "Responsive Design", category: "frontend_mobile", level: "expert" },
  { name: "Single-Page Apps (SPA)", category: "frontend_mobile", level: "expert" },

  // Backend, Desktop & DevOps
  { name: "Azure DevOps", category: "devops_backend", level: "expert" },
  { name: "CI/CD Pipeline Automation", category: "devops_backend", level: "expert" },
  { name: "REST APIs", category: "devops_backend", level: "expert" },
  { name: "Node.js", category: "devops_backend", level: "proficient" },
  { name: "Express", category: "devops_backend", level: "proficient" },
  { name: "Node-RED", category: "devops_backend", level: "proficient" },
  { name: ".NET 4.7.2", category: "devops_backend", level: "proficient" },
  { name: "WinForms & DevExpress", category: "devops_backend", level: "proficient" },
  { name: "SQL Server", category: "devops_backend", level: "proficient" },
  { name: "WhatsApp Business API", category: "devops_backend", level: "expert" },
  { name: "Telegram Bot API", category: "devops_backend", level: "expert" },
  { name: "Git / GitHub", category: "devops_backend", level: "expert" },

  // AI & Emerging Tech
  { name: "GitHub Copilot", category: "ai_tools", level: "expert" },
  { name: "Cursor", category: "ai_tools", level: "expert" },
  { name: "Claude API", category: "ai_tools", level: "proficient" },
  { name: "Model Context Protocol (MCP)", category: "ai_tools", level: "proficient" },
  { name: "AI Agent Development", category: "ai_tools", level: "proficient" },
  { name: "Gemini", category: "ai_tools", level: "proficient" },
  { name: "Augment Code", category: "ai_tools", level: "proficient" },
];
