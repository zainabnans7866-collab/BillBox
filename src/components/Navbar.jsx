import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {

  const navigate = useNavigate();

  const {
    darkMode,
    theme,
    colors,
  } = useTheme();

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (

    <nav
      className={`sticky top-0 z-50 shadow-2xl border-b transition-all duration-500 ${
        darkMode
          ? `bg-gradient-to-r ${colors[theme].primary} border-white/10`
          : "bg-white border-gray-200"
      }`}
    >

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}

        <div
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer select-none"
        >

          <h1
            className={`text-3xl font-black ${
              darkMode
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            🧾 BillBox AI
          </h1>

          <p
            className={`text-xs ${
              darkMode
                ? "text-slate-200"
                : "text-slate-600"
            }`}
          >
            Smart Warranty Manager
          </p>

        </div>

        {/* Navigation */}

        <div className="flex items-center gap-3 flex-wrap">

          {[
            { label: "🏠 Dashboard", path: "/dashboard" },
            { label: "📋 Bills", path: "/all-bills" },
            { label: "➕ Add Bill", path: "/add-bill" },
            { label: "🔔 Notifications", path: "/notifications" },
            { label: "🛡 Warranty", path: "/warranty" },
            { label: "👤 Profile", path: "/profile" },
            { label: "⚙ Settings", path: "/settings" },
          ].map((item) => (

            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-4 py-2 rounded-xl transition hover:scale-105 ${
                darkMode
                  ? "text-white hover:bg-white/10"
                  : "text-slate-900 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>

          ))}

          <button
            onClick={logout}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold px-5 py-2 rounded-xl hover:scale-105 transition shadow-xl"
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </nav>

  );

}