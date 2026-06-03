import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ContactFormSchema } from "@/lib/validators/contact";
import { ZodError } from "zod";

// --- Types ---
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

// --- Simple In-Memory Rate Limiting ---
// Map structure: ip -> timestamps of successful submissions
const rateLimitMap = new Map<string, number[]>();

const LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3;

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter timestamps to keep only those within the active sliding window
  const activeTimestamps = timestamps.filter((t) => now - t < LIMIT_WINDOW_MS);

  if (activeTimestamps.length >= MAX_REQUESTS) {
    return true; // Rate limit exceeded
  }

  // Record this valid request timestamp
  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);
  return false;
}

/**
 * POST /api/contact
 * Receives and validates client contact submissions, persisting to the database.
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // 1. Rate Limiting Check
    const ip = getClientIp(request);
    if (checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again after 10 minutes.",
        },
        { status: 429 }
      );
    }

    // 2. Body Parsing
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    // 3. Schema Validation
    const validatedData = ContactFormSchema.parse(body);

    // 4. Persistence to Database
    const savedMessage = await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        source: validatedData.source,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully.",
        data: savedMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((e) => `${e.path.join(".")}: ${e.message}`);
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          errors: errorMessages,
        },
        { status: 400 }
      );
    }

    console.error("Error handling contact submission:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Admin endpoint: Fetches the latest 50 contact messages.
 * Protected by X-Admin-Key header validation.
 */
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Validate custom authorization header
    const apiKey = request.headers.get("x-admin-key");
    const expectedKey = process.env.ADMIN_API_KEY;

    if (!expectedKey || apiKey !== expectedKey) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Invalid credentials." },
        { status: 401 }
      );
    }

    // Retrieve last 50 entries
    const messages = await prisma.contactMessage.findMany({
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Messages retrieved successfully.",
      data: messages,
    });
  } catch (error) {
    console.error("Error retrieving contact messages:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
