import Navbar from "../components/Navbar";
import { useState } from "react";

export default function AIAssistant() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function askAI() {

    const q = question.toLowerCase();

    if (q.includes("warranty")) {
      setAnswer("🛡 Check your Warranty Center to view all active and expiring warranties.");
    }

    else if (q.includes("spent") || q.includes("money")) {
      setAnswer("💰 Visit Dashboard Analytics to see your total spending.");
    }

    else if (q.includes("bill")) {
      setAnswer("📄 All your uploaded bills are available in the My Bills page.");
    }

    else {
      setAnswer("🤖 I'm BillBox AI. I can help you with bills, warranties and spending insights.");
    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-900 to-purple-900">

      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-6">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

          <h1 className="text-5xl font-black text-white mb-3">
            🤖 BillBox AI Assistant
          </h1>

          <p className="text-slate-300 mb-8">
            Ask anything about your bills and warranties.
          </p>

          <textarea
            value={question}
            onChange={(e)=>setQuestion(e.target.value)}
            placeholder="Example: Which warranty expires first?"
            className="w-full h-40 rounded-2xl p-5 bg-white text-black"
          />

          <button
            onClick={askAI}
            className="mt-5 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-2xl text-white font-bold hover:scale-105 transition"
          >
            Ask AI
          </button>

          {answer && (

            <div className="mt-8 bg-white/10 rounded-2xl p-6 border border-white/20">

              <h2 className="text-2xl font-bold text-white mb-3">
                AI Response
              </h2>

              <p className="text-slate-200">
                {answer}
              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}