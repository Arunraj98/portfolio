import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL 
  ? process.env.NEXT_PUBLIC_APP_URL 
  : process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Arunraj A — Senior Angular Developer | Frontend Engineer | Kochi",
    template: "%s | Arunraj A",
  },
  description: "Senior Angular Developer with 3y9m experience. 17+ SPAs, Angular v12–v20 migration expert, Azure DevOps CI/CD, Ionic. Open to product-based company roles.",
  keywords: [
    "Angular developer Kochi",
    "TypeScript developer Kerala",
    "frontend engineer",
    "Senior Angular Developer",
    "Angular v12-v20 migration expert",
    "Azure DevOps CI/CD",
    "Ionic developer",
    "Arunraj A",
    "frontend developer Kochi",
    "web developer Kochi",
    "SPA developer",
    "Next.js portfolio",
    "React developer",
    "Citrus Informatics",
  ],
  authors: [{ name: "Arunraj A" }],
  creator: "Arunraj A",
  openGraph: {
    title: "Arunraj A — Senior Angular Developer | Frontend Engineer | Kochi",
    description: "Senior Angular Developer with 3y9m experience. 17+ SPAs, Angular v12–v20 migration expert, Azure DevOps CI/CD, Ionic. Open to product-based company roles.",
    url: baseUrl,
    siteName: "Arunraj A Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arunraj A — Senior Angular Developer | Frontend Engineer | Kochi",
    description: "Senior Angular Developer with 3y9m experience. 17+ SPAs, Angular v12–v20 migration expert, Azure DevOps CI/CD, Ionic. Open to product-based company roles.",
  },
  alternates: {
    canonical: "/",
  },
};
