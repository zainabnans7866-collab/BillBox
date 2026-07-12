import { useState } from "react";
import { groq } from "../lib/groqClient";

export default function AITest() {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  async function testGroq() {
    setLoading(true);

    try {
      const chatCompletion = await groq.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "user",
            content: "Say hello from BillBox AI in one sentence.",
          },
        ],
      });

      setAnswer(chatCompletion.choices[0].message.content);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-100">
      <button
        onClick={testGroq}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Testing..." : "Test Groq"}
      </button>

      <div className="bg-white p-6 rounded-lg shadow w-[500px]">
        <h2 className="font-bold mb-2">AI Response:</h2>
        <p>{answer}</p>
      </div>
    </div>
  );
}