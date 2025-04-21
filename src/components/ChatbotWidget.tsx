import React, { useRef, useState, useEffect } from "react";
import { MessageSquare, Sun, Moon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const DEFAULT_RESPONSES: { [key: string]: string } = {
  "high hemoglobin": "High hemoglobin might mean dehydration or other conditions. Drink water and talk to your doctor.",
  "low glucose": "Low blood sugar can make you feel dizzy or tired. Have a snack and let your doctor know.",
  "high cholesterol": "High cholesterol could be due to diet or genetics. Try eating less fried food and consult your doctor.",
  "high blood sugar": "High blood sugar means your body has trouble managing sugar levels. Try to eat balanced meals and see your doctor.",
  "high blood pressure": "High blood pressure can increase risks. Monitor regularly and consult your doctor if it stays high.",
  "default": "Sorry, I didn’t understand. Try asking about something like ‘high cholesterol’ or ‘low glucose.’",
  "not_health": "I can only answer health-related questions. Try asking about your blood report!"
};
const DISCLAIMER = "This is general information. Consult a doctor for medical advice.";

const chatStyleLight =
  "bg-white text-black border border-gray-200 shadow-lg rounded-lg";
const chatStyleDark =
  "bg-black text-white border border-gray-700 shadow-lg rounded-lg";

const getDisplayDate = (dateStr?: string | null) => {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString();
  } catch {
    return "";
  }
};

const extractSimpleIntent = (q: string) => {
  const s = q.toLowerCase();
  if (/weather|rain|forecast|temperature/.test(s)) return "not_health";
  if (/high hemoglobin/.test(s)) return "high hemoglobin";
  if (/low glucose|low blood sugar/.test(s)) return "low glucose";
  if (/high cholesterol/.test(s)) return "high cholesterol";
  if (/high blood sugar|high glucose/.test(s)) return "high blood sugar";
  if (/high blood pressure|bp/.test(s)) return "high blood pressure";
  if (/hemoglobin.*normal/.test(s)) return "hemoglobin_normal_q";
  if (/blood pressure.*high/.test(s)) return "bp_is_high";
  // fallback
  return "";
};

const isVoiceSupported = !!window.SpeechRecognition || !!window.webkitSpeechRecognition;

type Props = {
  className?: string;
  chatStyle?: string;
  disclaimerOverride?: string;
  responseTemplates?: { [intent: string]: string };
};

const ChatbotWidget: React.FC<Props> = ({
  chatStyle = "light",
  disclaimerOverride,
  responseTemplates
}) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [highContrast, setHighContrast] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string; disclaimer?: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 400);
  }, [open]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) handleSend();
    if (e.key === "Escape") setOpen(false);
  };

  const fetchLatestBloodReport = async () => {
    if (!user) return null;
    const { data, error } = await supabase
      .from("blood_reports")
      .select(
        "date, hemoglobin, cholesterol, glucose, blood_pressure"
      )
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) return null;
    return data;
  };

  const storeChatLog = async (question: string, response: string) => {
    if (!user) return;
    await supabase.from("chat_logs").insert({
      user_id: user.id,
      user_question: question,
      chatbot_response: response
    });
  };

  const generateBotResponse = async (prompt: string): Promise<string> => {
    const latest = await fetchLatestBloodReport();
    let intent = extractSimpleIntent(prompt);
    const rTemplates = responseTemplates || DEFAULT_RESPONSES;
    if (intent === "hemoglobin_normal_q" && latest) {
      let val = latest.hemoglobin;
      if (typeof val === "number") {
        let msg = `Your latest report shows hemoglobin at ${val} g/dL${latest.date ? ` (as of ${getDisplayDate(latest.date)})` : ""}, `;
        msg += val < 13 ? "which is low." : val > 17 ? "which is high." : "which is normal.";
        return `${msg} Consult your doctor for personalized advice.`;
      }
    }
    if (intent === "bp_is_high" && latest?.blood_pressure) {
      let bp = latest.blood_pressure;
      let msg = `Your latest blood pressure reading was ${bp}.`;
      msg += /1\d{2,3}\/\d{2,3}/.test(bp) && parseInt(bp.split('/')[0]) > 129 ? " This is a little higher than ideal, but still safe." : " This is normal.";
      return msg;
    }
    let answer = "";
    if (intent && rTemplates[intent]) {
      answer = rTemplates[intent];
    } else if (intent === "") {
      answer = rTemplates["default"];
    } else {
      answer = rTemplates[intent] || rTemplates["default"];
    }
    return answer;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const userMsg = input.trim();
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg }
    ]);
    setInput("");
    let response = "";
    try {
      response = await generateBotResponse(userMsg);
      if (!response) {
        response =
          "I don’t have your latest report. Generally, high hemoglobin might mean dehydration. Consult your doctor.";
      }
    } catch (e) {
      response =
        "Oops, something went wrong. Please try again or contact support.";
    }
    setMessages((prev) => [
      ...prev,
      { role: "bot", text: response, disclaimer: disclaimerOverride || DISCLAIMER }
    ]);
    if (user) {
      storeChatLog(userMsg, response + " " + (disclaimerOverride || DISCLAIMER));
    }
    setLoading(false);
  };

  const handleClear = () => {
    setMessages([]);
  };

  const widgetBtnStyle =
    "fixed z-50 bottom-5 right-5 rounded-full bg-acuveda-blue hover:bg-acuveda-blue/90 text-white p-4 shadow-lg focus:outline-acuveda-blue";

  return (
    <>
      <button
        className={widgetBtnStyle}
        aria-label={open ? "Close health chatbot" : "Open health chatbot"}
        onClick={() => setOpen((v) => !v)}
        tabIndex={0}
        style={{ fontSize: 0 }}
      >
        <MessageSquare className="w-7 h-7" aria-hidden="true" />
      </button>
      {open && (
        <div
          className={`fixed z-[60] bottom-24 right-5 w-[320px] max-w-[95vw] h-[430px] rounded-lg ${
            highContrast ? "bg-black text-white border-white" : chatStyle === "dark" ? chatStyleDark : chatStyleLight
          } flex flex-col shadow-2xl outline-none select-none`}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <div className="text-lg font-bold">AcuVeda Health Chatbot</div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setHighContrast((v) => !v)}
                aria-label={highContrast ? "Switch to normal contrast" : "Switch to high contrast mode"}
                size="icon"
                variant="ghost"
              >
                {highContrast ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                size="icon"
                variant="ghost"
              >
                ×
              </Button>
            </div>
          </div>
          <div
            className="flex-1 overflow-y-auto p-3"
            style={{ fontSize: "16px" }}
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.length === 0 && (
              <div className="text-sm text-muted-foreground mt-8 text-center">
                Ask me about your blood report, like:
                <div>
                  <em className="block mt-2">
                    "What does high hemoglobin mean?"<br />
                    "Is my blood pressure normal?"<br />
                    "How can I lower cholesterol?"
                  </em>
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 flex flex-col items-${msg.role === "user" ? "end" : "start"}`}
                aria-label={msg.role === "user" ? "User message" : "Bot response"}
              >
                <div
                  className={`px-3 py-2 rounded-[18px] ${msg.role === "user"
                    ? "bg-acuveda-blue text-white self-end"
                    : highContrast
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-black"
                    } max-w-[85%]`}
                >
                  {msg.text}
                </div>
                {msg.role === "bot" && (
                  <div
                    className="text-xs italic mt-0.5"
                    style={{
                      fontSize: "12px",
                      color: highContrast ? "#d1d5db" : "#555"
                    }}
                  >
                    {msg.disclaimer}
                  </div>
                )}
              </div>
            ))}
          </div>
          <form
            className="flex items-center gap-1 px-3 py-2 border-t"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            aria-label="Chatbot input area"
          >
            <input
              aria-label="Chatbot input field"
              placeholder="Ask about your health…"
              className={`flex-1 px-3 py-2 rounded border ${
                highContrast
                  ? "bg-gray-900 text-white border-white"
                  : "bg-white text-black border-gray-300"
              } outline-none focus:ring focus:ring-acuveda-blue text-base`}
              ref={inputRef}
              tabIndex={0}
              type="text"
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              autoComplete="off"
            />
            <Button
              type="submit"
              className="ml-1 bg-acuveda-blue hover:bg-acuveda-blue/90 text-white"
              size="sm"
              disabled={loading || !input.trim()}
              aria-label="Send"
              tabIndex={0}
            >
              Send
            </Button>
          </form>
          <div className="flex items-center justify-between px-4 py-2 border-t bg-gray-50">
            <Button
              variant="outline"
              size="xs"
              onClick={handleClear}
              aria-label="Clear chat"
            >
              Clear Chat
            </Button>
            <a
              href="/dashboard/chat-history"
              className="text-sm text-acuveda-blue underline ml-2"
              aria-label="View chat history"
            >
              Chat History
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
