import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";

export const runtime = "nodejs"; // Force Node.js runtime for Neon websocket support

interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Validate Gemini API Key existence
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Google Gemini API key is missing. Please configure GOOGLE_GEMINI_API_KEY.", type: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    // 2. Parse request payload
    const body = await req.json();
    const { messages, sessionId } = body as {
      messages: ChatMessage[];
      sessionId: string;
    };

    if (!messages || messages.length === 0 || !sessionId) {
      return Response.json(
        { error: "Invalid request payload. 'messages' and 'sessionId' are required.", type: "BAD_REQUEST" },
        { status: 400 }
      );
    }

    // 3. Initialize Google Gemini client and model
    const genAI = new GoogleGenerativeAI(apiKey);
    const systemInstruction = 
      "You are Arunraj A's portfolio AI assistant. Your purpose is to represent Arunraj professionally, sharing details about his career, projects, skills, education, and credentials. You also have access to Google Search to look up relevant context, information about companies he worked at, or general information related to him.\n\n" +
      "--- ARUNRAJ A'S PROFILE ---\n" +
      "- **Role**: Senior Software Engineer / Senior Angular Developer\n" +
      "- **Experience**: 3.5+ years (working at Citrus Informatics India Pvt Ltd in Kochi, Kerala)\n" +
      "- **Location**: Kochi, Kerala, India\n" +
      "- **Job Preferences**: Open to Senior Frontend / Angular Developer roles at product-based companies (Target CTC: 14-16 LPA)\n" +
      "- **Education**:\n" +
      "  * Master of Computer Applications (MCA), University of Calicut (2019-2021) - CGPA: 7.51/10\n" +
      "  * Bachelor of Computer Applications (BCA), University of Calicut (2016-2019) - CGPA: 3.58/6.00\n" +
      "- **Certifications**:\n" +
      "  * Anthropic: Introduction to Agent Skills, Building with the Claude API, Introduction to Model Context Protocol (MCP), Claude Code in Action (2026)\n" +
      "  * IBM SkillsBuild: Artificial Intelligence Fundamentals (2025)\n" +
      "  * Google: Foundations: Data, Data Everywhere (2025)\n" +
      "- **Technical Competency Stack**:\n" +
      "  * Expert: Angular (v12-v20), TypeScript, RxJS, NgRx, Ionic Framework, HTML5/CSS3, SCSS, Responsive Design, Single-Page Apps (SPA), Azure DevOps, CI/CD Pipeline Automation, REST APIs, WhatsApp Business API, Meta Template API, Telegram Bot API, Git/GitHub, GitHub Copilot, Cursor\n" +
      "  * Proficient: ag-Grid, Angular Material, WCAG Accessibility, Node.js, Express, Node-RED, .NET 4.7.2, WinForms, DevExpress, SQL Server, Claude API, Model Context Protocol (MCP), AI Agent Development, Gemini, Google Search Tool, Google Maps API, Vercel, Jira, Figma\n" +
      "- **Key Projects & Impact**:\n" +
      "  * **Developer Portfolio — Next.js 16 + Gemini AI**: Personal portfolio built with Next.js 16 (App Router), Tailwind CSS, Framer Motion, Zustand, Prisma, Neon, and Vercel, featuring a Gemini 2.5 Flash chatbot with Google Search grounding.\n" +
      "  * **LIMS Patient Messaging Platform (Solo Lead Engineer, Feb 2026 - Present)**: Designed and delivered an end-to-end messaging integration inside a .NET WinForms LIMS: WhatsApp lab report delivery with in-app template management, Telegram bot patient registration with dual-QR onboarding, and a real-time staff-patient chat module with RBAC and PDF support.\n" +
      "  * **Azure DevOps CI/CD Pipeline (DevOps Engineer, Sep-Oct 2024)**: Built automated build/sign/release pipelines for Ionic Android & iOS, reducing release cycles from ~48 to ~3 hours (85% reduction).\n" +
      "  * **Angular Enterprise Migration (Migration Lead, May-Aug 2025)**: Led 8 major version Angular upgrades (v12 to v20) across active enterprise applications with zero production downtime.\n" +
      "  * **Node-RED Notification Engine (Architect, Aug-Sep 2023)**: Designed and deployed a workflow-based notification engine in a single 24-hour cycle, achieving 100% production readiness.\n\n" +
      "--- SYSTEM GUIDELINES ---\n" +
      "1. You have Google Search Grounding enabled. If a user asks general questions about Arunraj, his current city Kochi, his employer Citrus Informatics, his alma mater Calicut University, or web technology concepts relevant to his stack, use Google Search to provide contextually grounded and accurate answers.\n" +
      "2. Keep responses concise, professional, engaging, and structured (using Markdown headers and bolding where appropriate).\n" +
      "3. Represent Arunraj's work ethic and capability in a positive, professional light.";

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
      tools: [{ googleSearch: {} } as any],
    });

    // 4. Map client-side message history to Gemini API format
    // Exclude the last message, which is the user's latest query
    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const latestMessageText = messages[messages.length - 1].content;

    // 5. Establish Gemini chat and test call to capture errors before starting stream response
    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(latestMessageText);

    // 6. Create custom ReadableStream for Server-Sent Events (SSE)
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          let fullResponseText = "";

          // Consume the stream chunks from Gemini SDK
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullResponseText += chunkText;
            
            // Encode and dispatch SSE chunk
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunkText })}\n\n`));
          }

          // Build complete history to persist in the database
          const modelMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "model",
            content: fullResponseText,
            timestamp: new Date().toISOString(),
          };
          const completeHistory = [...messages, modelMessage];

          // Persist the full chat logs to the Neon DB
          await prisma.chatSession.upsert({
            where: { sessionId },
            update: {
              messages: completeHistory as any,
            },
            create: {
              sessionId,
              messages: completeHistory as any,
            },
          });

          controller.close();
        } catch (streamErr: any) {
          console.error("Gemini stream rendering error:", streamErr);
          const errText = streamErr?.message || String(streamErr);
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: errText })}\n\n`));
          } catch (_) {}
          controller.error(streamErr);
        }
      },
    });

    // 7. Return Streaming HTTP Response
    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no", // Turn off response buffering for local proxies and Vercel CDN
      },
    });

  } catch (error: any) {
    console.error("Gemini API Route Error:", error);
    const errMessage = error?.message || String(error);
    
    // Catch API key issues or Rate limiting before response starts
    let status = 500;
    let errorType = "INTERNAL_SERVER_ERROR";

    if (errMessage.includes("API key") || errMessage.includes("not valid") || error?.status === 401) {
      status = 401;
      errorType = "UNAUTHORIZED";
    } else if (
      errMessage.includes("quota") ||
      errMessage.includes("exhausted") ||
      errMessage.includes("rate limit") ||
      error?.status === 429
    ) {
      status = 429;
      errorType = "RATE_LIMIT_EXCEEDED";
    }

    return Response.json(
      { error: errMessage, type: errorType },
      { status }
    );
  }
}
