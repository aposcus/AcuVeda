
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

type ChatLog = {
  id: string;
  timestamp: string;
  user_question: string;
  chatbot_response: string;
};

const ChatHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    if (!user) {
      setLogs([]);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("chat_logs")
      .select("id, timestamp, user_question, chatbot_response")
      .eq("user_id", user.id)
      .order("timestamp", { ascending: false });
    if (!error && data) setLogs(data);
    setLoading(false);
  };

  const handleDeleteAll = async () => {
    if (!user) return;
    await supabase.from("chat_logs").delete().eq("user_id", user.id);
    fetchLogs();
  };

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="container max-w-xl mx-auto py-10 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Chat History</h1>
      <Button variant="destructive" onClick={handleDeleteAll} className="mb-4">
        Delete History
      </Button>
      {loading ? (
        <div className="text-sm">Loading...</div>
      ) : logs.length === 0 ? (
        <div className="text-muted-foreground">No chat history found.</div>
      ) : (
        <ul className="space-y-4">
          {logs.map((log) => (
            <li key={log.id} className="bg-white rounded shadow p-4">
              <div>
                <span className="text-xs text-gray-500">
                  {log.timestamp && new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="font-semibold mt-2" aria-label="User Question">
                Q: {log.user_question}
              </div>
              <div className="mt-2" aria-label="Bot Reply">
                <span className="text-gray-700">{log.chatbot_response}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatHistoryPage;
