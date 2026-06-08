"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Trash2, Sparkles, AlertCircle } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import {
  useChatMessages,
  useChatInput,
  useIsChatOpen,
  useIsChatLoading,
  useChatActions,
} from "@/store/chatStore";
import { useUnreadCount, useNotificationActions } from "@/store/notificationStore";
import { cn } from "@/lib/utils";

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  
  // 1. Retrieve Chat store values and actions
  const messages = useChatMessages();
  const input = useChatInput();
  const isOpen = useIsChatOpen();
  const isLoading = useIsChatLoading();
  const { setInput, setIsOpen, clearChat } = useChatActions();

  // 2. Retrieve notification values and actions
  const unreadCount = useUnreadCount();
  const { reset: resetNotifications } = useNotificationActions();

  // 3. Connect custom streaming hook
  const { sendMessage } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);

  // Avoid hydration mismatch by waiting until component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset unread count when chat window is opened
  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      resetNotifications();
    }
  }, [isOpen, unreadCount, resetNotifications]);

  // Autoscroll to bottom on new messages or loading state changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <div className={cn("fixed bottom-6 right-6 z-50", isOpen && "hidden md:block")}>
        {/* Subtle AI Pulse Ring */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-accent/30 rounded-full pointer-events-none"
          />
        )}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-colors focus:outline-none border z-10",
            isOpen
              ? "bg-surface border-accent/30 text-accent"
              : "bg-accent border-accent/20 text-background"
          )}
          aria-label="Toggle chat assistant"
        >
          {isOpen ? (
            <motion.div
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="relative"
              >
                <Bot className="w-6.5 h-6.5" />
                <motion.div
                  animate={{ scale: [0.85, 1.15, 0.85], rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="absolute -top-1 -right-1 text-background"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* Unread Message Notification Badge */}
          <AnimatePresence>
            {!isOpen && unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-mono text-[10px] font-bold text-white shadow-md z-20"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Expanded Chat Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-50 w-full h-full md:w-[380px] md:h-[520px] max-w-full md:max-w-[calc(100vw-2rem)] rounded-none md:rounded-2xl border-0 md:border md:border-surface/50 bg-background md:bg-background/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3.5 border-b border-surface/40 bg-surface/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="absolute top-0 left-0 animate-ping flex h-2.5 w-2.5 rounded-full bg-emerald-500/75" />
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-foreground flex items-center gap-1.5">
                    Arunraj's AI <Sparkles className="w-3.5 h-3.5 text-accent" />
                  </h3>
                  <p className="text-[10px] text-muted">Portfolio Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="p-1.5 text-muted hover:text-red-400 transition-colors focus:outline-none"
                    title="Clear history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-muted hover:text-accent transition-colors focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div data-lenis-prevent className="flex-grow p-4 overflow-y-auto space-y-4 flex flex-col">
              {messages.length === 0 ? (
                <div className="my-auto flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="p-3 bg-surface/30 border border-surface/50 rounded-2xl text-accent">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-foreground">
                      Ask me about Arunraj
                    </p>
                    <p className="font-sans text-xs text-muted max-w-[240px] mt-1 leading-relaxed">
                      I can answer questions regarding his experience, Angular skillset, NgRx, or open role preferences.
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm font-sans leading-relaxed whitespace-pre-wrap",
                        isUser
                          ? "bg-accent text-background font-medium self-end rounded-tr-none"
                          : msg.content.startsWith("Error:")
                          ? "bg-red-500/10 border border-red-500/20 text-red-200 self-start rounded-tl-none flex items-start gap-2"
                          : "bg-surface/60 border border-surface/30 text-foreground self-start rounded-tl-none"
                      )}
                    >
                      {!isUser && msg.content.startsWith("Error:") && (
                        <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      )}
                      <div>{msg.content}</div>
                    </motion.div>
                  );
                })
              )}

              {/* Real-time Streaming Loading Indicator */}
              {isLoading && (
                <div className="bg-surface/60 border border-surface/30 text-foreground self-start rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-surface/40 bg-surface/10"
            >
              <div className="flex items-center gap-2 bg-surface/50 border border-surface/60 rounded-xl px-3 py-1.5 focus-within:border-accent/40 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask something..."
                  disabled={isLoading}
                  className="flex-grow bg-transparent text-sm text-foreground focus:outline-none disabled:text-muted placeholder:text-muted py-1"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-1.5 bg-accent text-background rounded-lg hover:bg-accent/80 disabled:bg-surface/50 disabled:text-muted transition-colors focus:outline-none shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Powered Label */}
              <div className="text-center mt-2.5">
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted/60 select-none">
                  Powered by Gemini 2.5 Flash
                </span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
