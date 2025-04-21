import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{user: string; bot: string;}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);

    setChatHistory((prev) => [...prev, { user: input, bot: '' }]);

    try {
      if (!user?.id) {
        throw new Error("User not logged in");
      }

      const { data: chatLog, error } = await supabase
        .from('chat_logs')
        .insert([
          {
            user_id: user.id,
            user_question: input,
            chatbot_response: '...', // Initial loading state
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Simulate AI response logic and add disclaimer
      const botReply = `This is a simulated response. For medical advice, consult a doctor.`;

      // After getting the response (e.g., botReply):
      setChatHistory((prev) => [...prev, { user: input, bot: botReply }]);

      // Update the chat log with the chatbot response
      await supabase
        .from('chat_logs')
        .update({ chatbot_response: botReply })
        .eq('id', chatLog.id);

    } catch (err: any) {
      console.error("Error sending message:", err.message);
      setChatHistory((prev) => [...prev, { user: 'Error', bot: 'Failed to get response.' }]);
    }

    setInput('');
    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) handleSend();
  };

  const handleClear = () => setChatHistory([]);

  return (
    <>
      <button
        aria-label="Open chatbot"
        className="fixed bottom-6 right-6 z-50 bg-acuveda-blue rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
        onClick={() => setOpen(true)}
        tabIndex={0}
      >
        <MessageCircle className="text-white" size={32} />
      </button>

      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[320px] h-[420px] bg-white rounded-lg shadow-2xl flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Chatbot window"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b bg-acuveda-blue rounded-t-lg">
            <span className="text-white text-xl font-bold">AcuVeda Chatbot</span>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Close chatbot"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-white"
            style={{ fontSize: '16px' }}>
            {chatHistory.length === 0 ? (
              <div className="text-center text-muted-foreground pt-16">
                <span className="text-lg">Ask about your health…</span>
              </div>
            ) : (
              chatHistory.map((entry, i) => (
                <div key={i} className="mb-4">
                  <div>
                    <span className="font-semibold text-acuveda-blue">You: </span>
                    <span>{entry.user}</span>
                  </div>
                  {entry.bot && (
                    <div className="mt-2 px-3 py-2 rounded bg-gray-100">
                      <span className="block text-black">{entry.bot}</span>
                      <span className="block italic text-xs text-gray-500 mt-2" style={{ fontSize: '12px' }}>
                        This is general information. Consult a doctor for medical advice.
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div className="px-4 py-2 border-t bg-white flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your health…"
              aria-label="Chatbot input field"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-acuveda-blue"
              style={{ fontSize: '16px' }}
              tabIndex={0}
            />
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              variant="default"
              size="sm"
              aria-label="Send message"
              className="h-10 px-4"
            >
              Send
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              size="sm"
              aria-label="Clear chat"
              className="h-10 ml-1"
            >
              Clear Chat
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
