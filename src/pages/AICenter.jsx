import { useState } from "react";
import Navbar from "../components/Navbar";

export default function AICenter() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function askAI() {

    const q = question.toLowerCase();

    if (q.includes("warranty")) {
      setAnswer("🛡 You can check all your active and expired warranties in the Warranty Center.");
    }
    else if (q.includes("bill")) {
      setAnswer("📄 All your uploaded bills are available in My Bills.");
    }
    else if (q.includes("price")) {
      setAnswer("💰 Your spending details are available on the Dashboard.");
    }
    else if (q.includes("expiry")) {
      setAnswer("⏰ Visit Warranty Center to see products that are expiring soon.");
    }
    else {
      setAnswer("🤖 Hello! I'm BillBox AI. I can help you understand your bills, warranties, expenses and product information.");
    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-900 to-purple-900">

      <Navbar />

      <div className="max-w-5xl mx-auto p-8">

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8">

          <h1 className="text-5xl font-black text-white">
            🤖 AI Center
          </h1>

          <p className="text-slate-300 mt-3 mb-8">
            Ask anything about your bills and warranties.
          </p>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: Which warranty expires first?"
            className="w-full h-40 rounded-2xl p-5 text-black"
          />

          <button
            onClick={askAI}
            className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            🚀 Ask BillBox AI
          </button>

          {answer && (

            <div className="mt-8 bg-white/10 rounded-2xl border border-white/20 p-6">

              <h2 className="text-2xl font-bold text-white mb-4">
                AI Response
              </h2>

              <p className="text-slate-200 text-lg">
                {answer}
              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}