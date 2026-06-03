import { useCallback } from "react";
import {
  useChatStore,
  useChatMessages,
  useChatInput,
  useChatActions,
} from "@/store/chatStore";

/**
 * useChat Hook
 * 
 * DESIGN RATIONALE: Why read from and update the Zustand store instead of local React useState?
 * 1. Global Sync: If the user triggers message sending, multiple UI components (floating bubble badge, sidebar chat panel, main page widgets)
 *    stay in sync instantly because they all subscribe to the same Zustand singleton store.
 * 2. Reduced Component Re-renders: Storing state locally in useState triggers re-renders on the parent component and all its children.
 *    With Zustand, components use selective hooks to only re-render when their specific target data changes.
 * 3. Decoupled Business Logic: The streaming decoder and SSE parsing logic is encapsulated in this hook and the store actions,
 *    keeping the UI layout components pure, readable, and focused on presentation.
 */
export function useChat() {
  const messages = useChatMessages();
  const input = useChatInput();
  const { addMessage, updateLastModelMessage, setInput, setIsLoading } = useChatActions();

  const sendMessage = useCallback(
    async (textOverride?: string) => {
      const text = (textOverride !== undefined ? textOverride : input).trim();
      if (!text) return;

      // 1. Clear input field and set loading state in global store
      setInput("");
      setIsLoading(true);

      // 2. Add the user message to the store (generates sessionId if empty)
      addMessage({ role: "user", content: text });

      // Retrieve the session ID generated or already existing in store
      // We must get the state dynamically to check the newly updated sessionId (after addMessage)
      const currentSessionId = useChatStore.getState().sessionId;

      try {
        // 3. Initiate POST request to streaming chat endpoint
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, { role: "user", content: text }],
            sessionId: currentSessionId,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP error! Status: ${response.status}`);
        }

        // 4. Connect to SSE stream
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("ReadableStream response body is not readable.");
        }

        const decoder = new TextDecoder();
        let done = false;

        // 5. Stream reader loop
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;

          if (value) {
            const chunk = decoder.decode(value, { stream: !done });
            
            // SSE responses are formatted as "data: {JSON}\n\n". Split by lines to parse.
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const dataStr = line.slice(6).trim();
                if (!dataStr) continue;

                try {
                  const parsed = JSON.parse(dataStr);
                  
                  if (parsed.error) {
                    throw new Error(parsed.error);
                  }
                  
                  if (parsed.text) {
                    // Inject SSE text chunk directly into store. The store automatically appends it to the last model message.
                    updateLastModelMessage(parsed.text);
                  }
                } catch (jsonErr) {
                  console.error("Failed to parse event stream chunk:", line, jsonErr);
                }
              }
            }
          }
        }
      } catch (err: any) {
        console.error("Chat streaming failed:", err);
        // Inject error message in chat history as a system notification
        addMessage({
          role: "model",
          content: `Error: ${err?.message || "Failed to establish assistant connection. Please check your network."}`,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [messages, input, addMessage, updateLastModelMessage, setInput, setIsLoading]
  );

  return {
    sendMessage,
  };
}
export default useChat;
