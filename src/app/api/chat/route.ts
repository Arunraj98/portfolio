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
      "You are Arunraj A's portfolio assistant. Arunraj is a Senior Angular Developer with 3 years 9 months of experience. " +
      "He specializes in Angular v12-v20, TypeScript, RxJS, NgRx, Ionic, and Azure DevOps. " +
      "Key achievements: 17+ production SPAs, 85% CI/CD time reduction, WhatsApp Business API media workaround, dual QR Telegram strategy, 100% POC-to-production rate. " +
      "He is based in Kochi, Kerala. Open to Senior Frontend/Angular Developer roles at product-based companies, targeting 14-16 LPA. " +
      "Answer only questions about Arunraj's skills, projects, and experience. Keep responses concise and professional.";

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
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
