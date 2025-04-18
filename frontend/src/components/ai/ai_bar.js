import { useState } from "react";
import { askAi } from "../../lib/services/ai";

export const AiBar = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAsking, setIsAsking] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    try {
      setIsAsking(true);
      const result = await askAi(question);
      setAnswer(result.answer);
    } catch (err) {
      console.error("Error in AI request:", err);
      setAnswer("Something went wrong...");
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-blue-600">Sales Dashboard</h1>
        <div className="flex items-center gap-2 w-1/2">
          <input
            type="text"
            placeholder="Ask the AI about sales..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAskQuestion}
            disabled={isAsking}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            {isAsking ? "Thinking..." : "Ask"}
          </button>
        </div>
      </div>

      {/* AI Answer */}
      {answer && (
        <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
          <strong>AI Answer:</strong> {answer}
        </div>
      )}
    </>
  );
};
