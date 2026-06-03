import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { generateUUID } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string; // Store as ISO string for seamless serialization
}

interface ChatState {
  messages: ChatMessage[];
  input: string;
  isOpen: boolean;
  isLoading: boolean;
  sessionId: string;
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (): ChatState => ({
        messages: [],
        input: "",
        isOpen: false,
        isLoading: false,
        sessionId: "", // Initialized as empty to avoid Next.js SSR hydration mismatch
      }),
      {
        name: "arunraj-portfolio-chat-session",
        // Only persist messages and sessionId to localStorage
        partialize: (state) => ({
          messages: state.messages,
          sessionId: state.sessionId,
        }),
        onRehydrateStorage: () => (state) => {
          // Safely generate a sessionId on the client side after hydration if none exists
          if (state && !state.sessionId) {
            state.sessionId = generateUUID();
          }
        },
      }
    ),
    { name: "ChatStore" }
  )
);

/**
 * Chat Actions (Static Reference)
 * 
 * DESIGN DECISION: Separating actions from store state.
 * In Zustand v5, exposing actions as static functions mutating the store via `setState` is the 
 * recommended practice. This ensures selectors like `useChatActions` return a stable reference, 
 * avoiding the React `getServerSnapshot` infinite loop caused by selector-created transient objects.
 */
export const chatActions = {
  addMessage: (msg: { role: "user" | "model"; content: string }) =>
    useChatStore.setState((state) => {
      const activeSessionId = state.sessionId || generateUUID();
      const newMsg: ChatMessage = {
        id: generateUUID(),
        role: msg.role,
        content: msg.content,
        timestamp: new Date().toISOString(),
      };
      return {
        sessionId: activeSessionId,
        messages: [...state.messages, newMsg],
      };
    }),

  updateLastModelMessage: (chunk: string) =>
    useChatStore.setState((state) => {
      const messages = [...state.messages];
      if (messages.length === 0) return {};

      const lastMsg = { ...messages[messages.length - 1] };
      if (lastMsg.role === "model") {
        // Append chunk to the existing assistant message
        lastMsg.content += chunk;
        messages[messages.length - 1] = lastMsg;
      } else {
        // Add a new model message block
        messages.push({
          id: generateUUID(),
          role: "model",
          content: chunk,
          timestamp: new Date().toISOString(),
        });
      }

      return { messages };
    }),

  setInput: (input: string) => useChatStore.setState({ input }),
  setIsOpen: (isOpen: boolean) => useChatStore.setState({ isOpen }),
  setIsLoading: (isLoading: boolean) => useChatStore.setState({ isLoading }),
  clearChat: () => useChatStore.setState({ messages: [] }),
};

// Individual custom selector hooks to optimize rendering performance
export const useChatMessages = () => useChatStore((state) => state.messages);
export const useChatInput = () => useChatStore((state) => state.input);
export const useIsChatOpen = () => useChatStore((state) => state.isOpen);
export const useIsChatLoading = () => useChatStore((state) => state.isLoading);
export const useChatSessionId = () => useChatStore((state) => state.sessionId);
export const useChatActions = () => chatActions;
