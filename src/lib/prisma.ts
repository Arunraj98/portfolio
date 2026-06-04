import { PrismaClient } from "@prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

// Set up WebSocket support for serverless environments (Node.js/Next.js)
if (typeof globalThis.WebSocket === "undefined" && typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL;

// 1. Initialize the Prisma Neon driver adapter directly with configuration (Prisma v7 syntax)
const adapter = connectionString ? new PrismaNeon({ connectionString }) : undefined;

// 2. Create the PrismaClient singleton using the driver adapter
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(adapter ? { adapter } : {}),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
