export interface Certification {
  title: string;
  issuer: string;
  year: number;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Building with the Claude API",
    issuer: "Anthropic",
    year: 2026
  },
  {
    title: "Introduction to Model Context Protocol (MCP)",
    issuer: "Anthropic",
    year: 2026
  },
  {
    title: "Introduction to Agent Skills",
    issuer: "Anthropic",
    year: 2026
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    year: 2026
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    year: 2025
  },
  {
    title: "Foundations: Data, Data Everywhere",
    issuer: "Google Data Analytics",
    year: 2025
  }
];
