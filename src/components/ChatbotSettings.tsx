import React, { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * No-code management interface for editing chatbot disclaimer & Q/A pairs.
 * (You can connect this to Supabase for real-time editing with extra work.)
 */
const DEFAULT_RESPONSES = [
  { question: "What does high hemoglobin mean?", answer: "High hemoglobin might mean dehydration or other conditions. Drink water and talk to your doctor." },
  { question: "Why is my cholesterol high?", answer: "High cholesterol could be due to diet or genetics. Try eating less fried food and consult your doctor." },
  { question: "What does low glucose mean?", answer: "Low blood sugar can make you feel dizzy or tired. Have a snack and let your doctor know." },
];

const DEFAULT_DISCLAIMER = "This is general information. Consult a doctor for medical advice.";

const ChatbotSettings: React.FC = () => {
  const [responses, setResponses] = useState(DEFAULT_RESPONSES);
  const [disclaimer, setDisclaimer] = useState(DEFAULT_DISCLAIMER);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  // Only stored in local state, but can be connected to DB if needed
  return (
    <div className="container max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Chatbot Settings</h1>
      <div className="mb-6">
        <label className="block font-medium mb-2">Medical Disclaimer</label>
        <textarea
          className="w-full border rounded p-2"
          value={disclaimer}
          onChange={(e) => setDisclaimer(e.target.value)}
        />
      </div>
      <div>
        <h2 className="font-semibold mb-2">Responses</h2>
        <ul>
          {responses.map((r, idx) => (
            <li key={idx} className="mb-2 flex">
              {editIdx === idx ? (
                <>
                  <input
                    className="border p-1 mr-2 flex-1"
                    value={r.question}
                    onChange={(e) => {
                      const list = [...responses];
                      list[idx].question = e.target.value;
                      setResponses(list);
                    }}
                  />
                  <input
                    className="border p-1 mr-2 flex-1"
                    value={r.answer}
                    onChange={(e) => {
                      const list = [...responses];
                      list[idx].answer = e.target.value;
                      setResponses(list);
                    }}
                  />
                  <Button onClick={() => setEditIdx(null)} size="sm">
                    Done
                  </Button>
                </>
              ) : (
                <>
                  <span className="flex-1">{r.question}</span>
                  <span className="flex-1 text-gray-700">{r.answer}</span>
                  <Button onClick={() => setEditIdx(idx)} size="sm" className="ml-2">
                    Edit
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
        <Button
          className="mt-3"
          onClick={() =>
            setResponses((old) => [...old, { question: "", answer: "" }])
          }
        >
          Add Q&A
        </Button>
      </div>
      {/* You can connect these settings to a DB or global context if needed */}
    </div>
  );
};

export default ChatbotSettings;
