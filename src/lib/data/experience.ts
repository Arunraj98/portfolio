export interface Job {
  role: string;
  company: string;
  location: string;
  period: string;
  stack: string[];
  bullets: string[];
}

export const JOBS: Job[] = [
  {
    role: "Senior Software Engineer",
    company: "Citrus Informatics India Pvt Ltd",
    location: "Kochi, Kerala",
    period: "Oct 2025 – Present",
    stack: [".NET 4.7.2", "WinForms", "DevExpress 22.2.3", "WhatsApp API", "Telegram Bot API", "SQL Server"],
    bullets: [
      "Engineered a Meta-approved PDF document workaround for WhatsApp report delivery, enabling single-click dispatch to any patient with zero prior interaction.",
      "Implemented a full 3-tab WhatsApp Settings module covering API tokens, template building with real-time Meta approval tracking, and per-patient delivery logs.",
      "Architected a dual QR code Telegram patient registration strategy mapping patient ID parameters to bot URLs, ensuring seamless self-registration for walk-ins.",
      "Developed a 3-step fallback registration flow (phone number → patient ID → anonymous chat) preventing communication blocks.",
      "Constructed a real-time bidirectional staff-patient live chat inside the LIMS with file attachments, notifications, and RBAC security.",
      "Self-initiated the entire patient messaging platform without a formal specification, designated as the highest-impact deliverable of the engagement by management."
    ]
  },
  {
    role: "Software Engineer",
    company: "Citrus Informatics India Pvt Ltd",
    location: "Kochi, Kerala",
    period: "Mar 2023 – Sep 2025",
    stack: ["Angular v12-v20", "TypeScript", "RxJS", "NgRx", "Ionic", "Azure DevOps", "REST APIs"],
    bullets: [
      "Launched 17+ production Angular SPAs and 5 Ionic mobile apps with a 30% faster turnaround time, powered by a custom shared library adopted org-wide.",
      "Reduced mobile CI/CD release cycles from 48 hours to 3 hours (85% reduction) by building automated Azure DevOps build/sign/release pipelines.",
      "Led 8 major version Angular upgrades (v12 to v20) across active enterprise applications with zero production downtime or incidents.",
      "Optimized Web Vitals, improving page load and LCP by 25% through OnPush detection, lazy loading, and bundle analysis.",
      "Acted as the company's sole Rapid Prototyping Lead with a 100% POC-to-production conversion rate.",
      "Integrated AI tools (Cursor, Copilot, Gemini) to optimize boilerplate creation, shortening time-to-review."
    ]
  },
  {
    role: "Software Engineer Trainee",
    company: "Citrus Informatics India Pvt Ltd",
    location: "Kochi, Kerala",
    period: "Sep 2022 – Mar 2023",
    stack: ["Angular", "TypeScript", "RxJS", "DHTMLX Gantt"],
    bullets: [
      "Promoted to full Software Engineer in 6 months (versus 12-month standard) by delivering a production-ready POC in week one with zero rework requests.",
      "Completed a complex DHTMLX Gantt Chart module in 1 week (against a 4-week estimate), demoing directly to the client CTO."
    ]
  }
];
