/**
 * Shared interfaces and types for the portfolio application.
 * Like in Angular, these type definitions enforce shape contract boundaries 
 * across components, API routes, and database models.
 */

export type MessageSource = "WHATSAPP" | "TELEGRAM" | "FORM";

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  source: MessageSource;
  createdAt?: Date | string;
}

export interface ChatMessage {
  role: "user" | "model" | "system";
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id?: string;
  sessionId: string;
  messages: ChatMessage[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
