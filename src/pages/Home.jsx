import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white">

      {/* Background Glow */}

      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/20 blur-[180px] rounded-full"></div>

      <div className="absolute top-20 right-0 w-[550px] h-[550px] bg-purple-600/20 blur-[180px] rounded-full"></div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-500/10 blur-[220px] rounded-full"></div>

      {/* NAVBAR */}

      <nav className="relative z-10 flex justify-between items-center px-12 py-8">

        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-300 bg-clip-text text-transparent">
            BillBox AI
          </h1>

          <p className="text-slate-400">
            AI Powered Warranty Manager
          </p>

        </div>

        <div className="flex gap-5">

          <button
            onClick={() => navigate("/login")}
            className="px-7 py-3 rounded-xl bg-white text-black font-bold hover:scale-105 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-7 py-3 rounded-xl border border-cyan-400 hover:bg-cyan-400 hover:text-black transition font-bold"
          >
            Get Started
          </button>

        </div>

      </nav>

      {/* HERO */}

      <section className="relative z-10 max-w-7xl mx-auto min-h-[88vh] flex items-center px-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center w-full">

          {/* LEFT */}

          <div>

            <span className="inline-block bg-cyan-500/20 border border-cyan-400/30 px-5 py-2 rounded-full text-cyan-300 font-semibold">
              🚀 AI Powered Bill Management
            </span>

            <h1 className="text-7xl lg:text-8xl font-black leading-tight mt-8">

              Store Bills.

              <br />

              Track Warranty.

              <br />

              <span className="text-cyan-300">
                Never Lose Money.
              </span>

            </h1>

            <p className="text-slate-300 text-xl leading-9 mt-8">

              Upload bills in seconds using AI.

              Automatically detect warranty,

              purchase date,

              expiry date,

              spending,

              and manage everything from one beautiful dashboard.

            </p>

            <div className="flex gap-6 mt-10">

              <button
                onClick={() => navigate("/signup")}
                className="px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-bold text-lg hover:scale-105 transition shadow-2xl"
              >
                🚀 Start Free
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-10 py-5 rounded-2xl border border-white hover:bg-white hover:text-black transition font-bold"
              >
                Login
              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="bg-white/10 backdrop-blur-2xl rounded-[35px] p-8 border border-white/20 shadow-[0_0_70px_rgba(59,130,246,0.3)]">

            <h2 className="text-3xl font-black mb-8">
              Dashboard Preview
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between bg-white/10 rounded-2xl p-5">
                <span>Total Bills</span>
                <span className="font-bold text-cyan-300">126</span>
              </div>

              <div className="flex justify-between bg-white/10 rounded-2xl p-5">
                <span>Total Spending</span>
                <span className="font-bold">₹3,45,800</span>
              </div>

              <div className="flex justify-between bg-white/10 rounded-2xl p-5">
                <span>Warranty Active</span>
                <span className="font-bold text-green-400">117</span>
              </div>

              <div className="flex justify-between bg-white/10 rounded-2xl p-5">
                <span>Expiring Soon</span>
                <span className="font-bold text-yellow-400">9</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="relative z-10 max-w-7xl mx-auto py-28 px-10">

        <h2 className="text-5xl font-black text-center mb-20">
          Why BillBox AI?
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          <Feature
            icon="🤖"
            title="AI Scanner"
            text="Reads bills automatically."
          />

          <Feature
            icon="🛡"
            title="Warranty"
            text="Tracks every warranty."
          />

          <Feature
            icon="📊"
            title="Analytics"
            text="See spending insights instantly."
          />

          <Feature
            icon="☁️"
            title="Cloud Backup"
            text="Secure Supabase Storage."
          />

        </div>

      </section>
            {/* STATS */}

      <section className="relative z-10 max-w-7xl mx-auto px-10 py-24">

        <h2 className="text-5xl font-black text-center mb-20">
          Trusted Worldwide
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">

          <div>
            <h1 className="text-6xl font-black text-cyan-300">15K+</h1>
            <p className="text-slate-400 mt-3">Bills Stored</p>
          </div>

          <div>
            <h1 className="text-6xl font-black text-purple-300">99%</h1>
            <p className="text-slate-400 mt-3">AI Accuracy</p>
          </div>

          <div>
            <h1 className="text-6xl font-black text-green-300">24/7</h1>
            <p className="text-slate-400 mt-3">Cloud Backup</p>
          </div>

          <div>
            <h1 className="text-6xl font-black text-pink-300">5K+</h1>
            <p className="text-slate-400 mt-3">Happy Users</p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="relative z-10 max-w-6xl mx-auto px-10 pb-24">

        <div className="rounded-[40px] bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-700 p-16 text-center shadow-[0_0_80px_rgba(79,70,229,0.5)]">

          <h2 className="text-5xl font-black">
            Ready to Organize Your Bills?
          </h2>

          <p className="text-xl mt-6 text-slate-200">
            Join thousands of users managing warranties effortlessly with AI.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-10 bg-white text-black px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition"
          >
            🚀 Create Free Account
          </button>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-white/10 py-12 text-center">

        <h2 className="text-3xl font-black">
          BillBox AI
        </h2>

        <p className="text-slate-400 mt-3">
          Smart AI Powered Warranty Management Platform
        </p>

        <div className="flex justify-center gap-10 mt-8 text-slate-400">

          <span>React</span>

          <span>Supabase</span>

          <span>Groq AI</span>

          <span>Cloud Storage</span>

        </div>

        <p className="mt-8 text-slate-500">
          © 2026 BillBox AI. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[30px] border border-white/20 p-8 hover:-translate-y-3 hover:scale-105 transition-all duration-300 shadow-xl">

      <div className="text-6xl">
        {icon}
      </div>

      <h3 className="text-3xl font-bold mt-6">
        {title}
      </h3>

      <p className="text-slate-300 mt-5 leading-8">
        {text}
      </p>

    </div>
  );
}