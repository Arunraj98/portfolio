# Arunraj A — Portfolio & AI Assistant

A premium, production-grade Next.js 16 portfolio designed for Arunraj A (Senior Angular Developer / Frontend Engineer). It features advanced scroll dynamics, custom spring-physics cursor tracking, a serverless Prisma-backed Neon PostgreSQL database, Gemini-powered AI chatbot integration, and automated SEO optimization.

---

## 🚀 Key Features

* **Advanced Scroll Dynamics**: Kinetic smooth scrolling driven by Lenis and a viewport-progress tracker.
* **Unified Reveal Animations**: Page sections fade and slide up on viewport entry; section numbering tags animate dynamically from `0` to target indices.
* **Elastic Custom Cursor**: Desktop-only custom mouse pointer with spring physics (`useSpring`) and MutationObserver binding. Fallback to default cursor on touch/mobile.
* **Gemini AI chatbot**: A floating chat widget powered by Google's Gemini API which handles dynamic queries about Arunraj's skills, professional history, and preferences. Reflows to full-screen on mobile.
* **Serverless Neon DB + Prisma**: Edge-runtime compatible PostgreSQL connection structure with Prisma Client.
* **API Webhook Integrations**: Contact details and chat notifications route dynamically to Telegram alerts and WhatsApp Cloud APIs.
* **SEO & Metadata**: Auto-generated dynamic OpenGraph images using Next.js `ImageResponse`, automated robots.txt rules, and XML sitemaps including section anchor fragments.
* **Hardened Security**: Custom HTTP Headers (Clickjacking, MIME Sniffing, XSS blocker) defined in `vercel.json`.

---

## 🛠️ Technology Stack

* **Framework**: Next.js 16 (App Router)
* **Library**: React 19
* **Styles**: Tailwind CSS v4
* **Animations**: Framer Motion
* **Smooth Scrolling**: Lenis
* **ORM & Database**: Prisma ORM with `@neondatabase/serverless` PostgreSQL (Neon DB)
* **Form Logic**: React Hook Form + Zod validation
* **State Management**: Zustand
* **Icons**: Lucide React

---

## 📁 File Structure

```text
arunraj-portfolio/
├── prisma/                  # Database Schema Definitions
├── public/                  # Static assets (images, profile picture)
├── src/
│   ├── app/                 # Next.js App Routes
│   │   ├── api/             # Chat and Contact endpoints
│   │   ├── layout.tsx       # Root layout containing Lenis, Custom Cursor, and Progress Bar
│   │   ├── metadata.ts      # Shared SEO Metadata definition
│   │   ├── opengraph-image.tsx # Next.js Dynamic OpenGraph card generator
│   │   ├── robots.ts        # Search crawler rules (robots.txt)
│   │   └── sitemap.ts       # XML sitemap generator
│   ├── components/
│   │   ├── layout/          # Structural headers, footers, and Lenis smooth scroll wrappers
│   │   ├── sections/        # Homepage section components (Hero, About, Skills, Projects, Contact)
│   │   └── ui/              # Modular UI elements (Buttons, Chat widgets, Custom Cursor, Cards)
│   ├── hooks/               # Custom hooks (scroll tracking, chat connections)
│   ├── lib/                 # Shared data arrays and helper utilities
│   ├── store/               # Zustand state blocks for chat and notifications
│   └── types/               # TypeScript type templates
├── vercel.json              # Custom Vercel security headers
└── next.config.ts           # StrictMode and Image optimization settings
```

---

## 💻 Local Setup & Development

### 1. Prerequisite Installations
Make sure you have Node.js and `pnpm` installed.

### 2. Check out repository
```bash
git clone https://github.com/arunraj998/portfolio.git
cd arunraj-portfolio
```

### 3. Install packages
```bash
pnpm install
```

### 4. Configure Local Environment Variables
Create a `.env.local` file at the root:
```env
# Neon Database Pool Link
DATABASE_URL="postgresql://[user]:[password]@[host]/neondb?sslmode=require"

# NextAuth Signing Secret
NEXTAUTH_SECRET="any-cryptographic-hash"

# Google Gemini API key
GOOGLE_GEMINI_API_KEY="AIzaSy..."

# WhatsApp APIs (Optional)
WHATSAPP_TOKEN="EAA..."
WHATSAPP_PHONE_NUMBER_ID="123..."
WHATSAPP_WEBHOOK_VERIFY_TOKEN="my-verify-token"

# Telegram API Alerts (Optional)
TELEGRAM_BOT_TOKEN="12345678:ABCDef..."
TELEGRAM_CHAT_ID="987654321"

# Canonical URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 5. Synchronize Database & Run Build Scripts
```bash
pnpm db:generate   # Generate Prisma Client classes
pnpm db:push       # Push schema state to Neon Cloud DB
```

### 6. Start Dev Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the project.

---

## ☁️ Production Deployment on Vercel

1. Push your repository to your personal Git account (GitHub, GitLab, or Bitbucket).
2. Connect your Git repository to **Vercel** via the Vercel dashboard.
3. Add the environment variables specified in `.env.local` inside **Settings > Environment Variables**.
4. Trigger the deployment. Vercel automatically runs `next build` and deploys static pages to the edge and API routes as serverless/edge functions.

### Webhook Configuration Guides

#### Telegram Alerts
Register Vercel endpoints to listen to incoming chat events:
```bash
curl -X GET "https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/setWebhook?url=https://<YOUR_VERCEL_DOMAIN>/api/chat"
```

#### WhatsApp / Meta API Webhook
1. Go to the [Meta Developer Console](https://developers.facebook.com/).
2. Under **WhatsApp > Configuration**:
   - Set **Callback URL** to `https://<YOUR_VERCEL_DOMAIN>/api/contact`.
   - Set **Verify Token** to the value of `WHATSAPP_WEBHOOK_VERIFY_TOKEN`.
3. Save changes and subscribe to webhook messaging streams.

---

## 📌 Pushing to Your Personal Git

To add remotes and push to your personal Git repository:
```bash
git init
git branch -M main
git add .
git commit -m "chore: final portfolio release build"
git remote add origin https://github.com/arunraj998/portfolio.git
git push -u origin main
```
