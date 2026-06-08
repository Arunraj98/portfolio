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
    stack: [".NET 4.7.2", "WinForms", "DevExpress", "WhatsApp Business API", "Meta Template API", "Telegram Bot API", "SQL Server"],
    bullets: [
      "Designed and delivered a WhatsApp-based lab report dispatch system integrated into an existing .NET WinForms LIMS — replacing a fully manual process with automated, direct patient delivery via the WhatsApp Business API.",
      "Developed a custom Meta message template builder within the LIMS UI, handling template creation, Meta submission, approval tracking, and a Send Logs dashboard with per-patient delivery status — eliminating dependency on the Meta Business portal.",
      "Architected a Telegram Bot patient registration flow using a dual-QR approach: bill-specific QR codes for returning patients and a lab-wide QR for walk-in registration, with a three-step fallback to handle edge cases.",
      "Built a real-time bidirectional messaging module inside the LIMS — staff-to-patient chat with PDF attachments, message management, and role-based access control restricting features to authorised staff.",
      "Delivered the full messaging platform end-to-end, from API integration to UI, working closely with management to define requirements iteratively."
    ]
  },
  {
    role: "Software Engineer",
    company: "Citrus Informatics India Pvt Ltd",
    location: "Kochi, Kerala",
    period: "Mar 2023 – Sep 2025",
    stack: ["Angular v12–v20", "TypeScript", "RxJS", "NgRx", "Ionic", "Azure DevOps", "SCSS", "REST APIs"],
    bullets: [
      "Developed and maintained 17+ production Angular applications across multiple client engagements, covering feature development, bug fixes, performance optimisation, and third-party API integration.",
      "Built and shipped 5 cross-platform Ionic mobile apps for Android and iOS, including full CI/CD pipeline setup on Azure DevOps — reducing build and release time from ~48 hours to ~3 hours.",
      "Led the Angular version migration from v12 to v20 across several active applications, managing breaking changes, NgRx upgrades, and coordinating testing with the team to maintain production stability.",
      "Identified and resolved key frontend performance issues — including unnecessary change detection cycles and unoptimised bundles — improving load time and Lighthouse scores across client-facing apps.",
      "Built an internal Angular component library (loaders, alert modals, activity log widgets) used across multiple projects to reduce duplication and standardise UI patterns.",
      "Took ownership of new feature POCs assigned by management, delivering working prototypes within tight timelines that were subsequently adopted into production.",
      "Designed modular frontend architecture using shared component libraries and lazy-loaded feature modules — improving scalability, reducing bundle size, and enabling independent development across multiple concurrent projects."
    ]
  },
  {
    role: "Software Engineer Trainee",
    company: "Citrus Informatics India Pvt Ltd",
    location: "Kochi, Kerala",
    period: "Sep 2022 – Mar 2023",
    stack: ["Angular", "TypeScript", "DHTMLX Gantt"],
    bullets: [
      "Promoted to Software Engineer after 6 months, ahead of the standard 12-month timeline, based on performance during the trainee period.",
      "Built a DHTMLX Gantt Chart reporting module for a solar project management client — delivered within the first week, demonstrated to the client, and deployed to production without further revision."
    ]
  }
];
