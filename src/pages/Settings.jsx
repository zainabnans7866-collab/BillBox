import { useState } from "react";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";

import {
  FaMoon,
  FaBell,
  FaRobot,
  FaUserCircle,
  FaPalette,
  FaShieldAlt,
  FaSun,
} from "react-icons/fa";

export default function Settings() {

  const {
    darkMode,
    setDarkMode,
    theme,
    setTheme,
    colors,
  } = useTheme();

  const [emailReminder, setEmailReminder] = useState(true);
  const [pushNotification, setPushNotification] = useState(true);
  const [aiScanner, setAiScanner] = useState(true);

  const [name, setName] = useState("BillBox User");

  function saveSettings() {

    alert("✅ Settings Saved Successfully!");

  }

  return (

    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >

      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-6">

        <h1 className="text-5xl font-black">
          ⚙ Settings
        </h1>

        <p
          className={`mt-2 mb-10 ${
            darkMode
              ? "text-slate-300"
              : "text-slate-600"
          }`}
        >
          Customize your BillBox AI experience.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Profile */}

          <div
            className={`rounded-3xl border p-8 shadow-2xl ${
              darkMode
                ? "bg-white/10 border-white/20"
                : "bg-white border-gray-200"
            }`}
          >

            <div className="flex items-center gap-3 mb-6">

              <FaUserCircle className="text-3xl text-cyan-400" />

              <h2 className="text-2xl font-bold">

                Profile

              </h2>

            </div>

            <label>

              Display Name

            </label>

            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full mt-2 mb-6 p-4 rounded-2xl text-black"
            />

            <label>

              Theme Color

            </label>

            <select
              value={theme}
              onChange={(e)=>setTheme(e.target.value)}
              className="w-full mt-2 p-4 rounded-2xl text-black"
            >

              <option value="purple">
                🟣 Purple
              </option>

              <option value="blue">
                🔵 Blue
              </option>

              <option value="green">
                🟢 Green
              </option>

              <option value="orange">
                🟠 Orange
              </option>

              <option value="red">
                🔴 Red
              </option>

            </select>

          </div>
                    {/* Appearance */}

          <div
            className={`rounded-3xl border p-8 shadow-2xl ${
              darkMode
                ? "bg-white/10 border-white/20"
                : "bg-white border-gray-200"
            }`}
          >

            <div className="flex items-center gap-3 mb-6">

              {darkMode ? (
                <FaMoon className="text-3xl text-yellow-300" />
              ) : (
                <FaSun className="text-3xl text-orange-400" />
              )}

              <h2 className="text-2xl font-bold">

                Appearance

              </h2>

            </div>

            {/* Dark Mode */}

            <div
              className={`flex justify-between items-center rounded-2xl p-5 mb-5 ${
                darkMode ? "bg-white/5" : "bg-gray-100"
              }`}
            >

              <div>

                <h3 className="font-bold flex items-center gap-2">

                  <FaMoon />

                  Dark Mode

                </h3>

                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-slate-300"
                      : "text-slate-600"
                  }`}
                >
                  Enable dark interface across BillBox.
                </p>

              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-16 h-9 rounded-full transition ${
                  darkMode
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              >

                <div
                  className={`w-7 h-7 bg-white rounded-full mt-1 transition ${
                    darkMode
                      ? "ml-8"
                      : "ml-1"
                  }`}
                />

              </button>

            </div>

            {/* Push Notifications */}

            <div
              className={`flex justify-between items-center rounded-2xl p-5 ${
                darkMode ? "bg-white/5" : "bg-gray-100"
              }`}
            >

              <div>

                <h3 className="font-bold flex items-center gap-2">

                  <FaBell />

                  Push Notifications

                </h3>

                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-slate-300"
                      : "text-slate-600"
                  }`}
                >
                  Receive alerts inside BillBox.
                </p>

              </div>

              <button
                onClick={() =>
                  setPushNotification(!pushNotification)
                }
                className={`w-16 h-9 rounded-full transition ${
                  pushNotification
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              >

                <div
                  className={`w-7 h-7 bg-white rounded-full mt-1 transition ${
                    pushNotification
                      ? "ml-8"
                      : "ml-1"
                  }`}
                />

              </button>

            </div>

          </div>
                    {/* AI & Notifications */}

          <div
            className={`rounded-3xl border p-8 shadow-2xl ${
              darkMode
                ? "bg-white/10 border-white/20"
                : "bg-white border-gray-200"
            }`}
          >

            <div className="flex items-center gap-3 mb-6">

              <FaRobot className="text-3xl text-purple-400" />

              <h2 className="text-2xl font-bold">
                AI & Notifications
              </h2>

            </div>

            {/* AI Scanner */}

            <div
              className={`flex justify-between items-center rounded-2xl p-5 mb-5 ${
                darkMode ? "bg-white/5" : "bg-gray-100"
              }`}
            >

              <div>

                <h3 className="font-bold">
                  🤖 AI Bill Scanner
                </h3>

                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-slate-300"
                      : "text-slate-600"
                  }`}
                >
                  Automatically scan and detect bill information.
                </p>

              </div>

              <button
                onClick={() => setAiScanner(!aiScanner)}
                className={`w-16 h-9 rounded-full ${
                  aiScanner ? "bg-green-500" : "bg-gray-400"
                }`}
              >

                <div
                  className={`w-7 h-7 bg-white rounded-full mt-1 transition ${
                    aiScanner ? "ml-8" : "ml-1"
                  }`}
                />

              </button>

            </div>

            {/* Email */}

            <div
              className={`flex justify-between items-center rounded-2xl p-5 ${
                darkMode ? "bg-white/5" : "bg-gray-100"
              }`}
            >

              <div>

                <h3 className="font-bold">
                  📧 Email Reminder
                </h3>

                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-slate-300"
                      : "text-slate-600"
                  }`}
                >
                  Receive warranty reminder emails.
                </p>

              </div>

              <button
                onClick={() =>
                  setEmailReminder(!emailReminder)
                }
                className={`w-16 h-9 rounded-full ${
                  emailReminder ? "bg-green-500" : "bg-gray-400"
                }`}
              >

                <div
                  className={`w-7 h-7 bg-white rounded-full mt-1 transition ${
                    emailReminder ? "ml-8" : "ml-1"
                  }`}
                />

              </button>

            </div>

          </div>

          {/* Security */}

          <div
            className={`rounded-3xl border p-8 shadow-2xl ${
              darkMode
                ? "bg-white/10 border-white/20"
                : "bg-white border-gray-200"
            }`}
          >

            <div className="flex items-center gap-3 mb-6">

              <FaShieldAlt className="text-3xl text-green-400" />

              <h2 className="text-2xl font-bold">
                Security
              </h2>

            </div>

            <div className="space-y-4">

              <div className={`${darkMode ? "bg-white/5" : "bg-gray-100"} rounded-2xl p-5`}>
                🔒 Supabase Authentication Enabled
              </div>

              <div className={`${darkMode ? "bg-white/5" : "bg-gray-100"} rounded-2xl p-5`}>
                ☁ Cloud Backup Connected
              </div>

              <div className={`${darkMode ? "bg-white/5" : "bg-gray-100"} rounded-2xl p-5`}>
                🛡 Your bills are private and secure
              </div>

            </div>

          </div>
                    {/* About BillBox */}

          <div
            className={`lg:col-span-2 rounded-3xl border p-8 shadow-2xl ${
              darkMode
                ? "bg-white/10 border-white/20"
                : "bg-white border-gray-200"
            }`}
          >

            <h2 className="text-3xl font-bold mb-6">
              📱 About BillBox AI
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div
                className={`rounded-2xl p-5 ${
                  darkMode ? "bg-white/5" : "bg-gray-100"
                }`}
              >
                <h3 className="font-bold text-lg">
                  🚀 Version
                </h3>

                <p className="mt-2">
                  BillBox AI v1.0.0
                </p>

              </div>

              <div
                className={`rounded-2xl p-5 ${
                  darkMode ? "bg-white/5" : "bg-gray-100"
                }`}
              >
                <h3 className="font-bold text-lg">
                  ☁ Cloud
                </h3>

                <p className="mt-2">
                  Connected to Supabase
                </p>

              </div>

              <div
                className={`rounded-2xl p-5 ${
                  darkMode ? "bg-white/5" : "bg-gray-100"
                }`}
              >
                <h3 className="font-bold text-lg">
                  🤖 AI Engine
                </h3>

                <p className="mt-2">
                  Gemini AI Enabled
                </p>

              </div>

            </div>

            <button
              onClick={saveSettings}
              className={`mt-8 w-full bg-gradient-to-r ${
                colors[theme].button
              } text-white py-4 rounded-2xl text-xl font-bold hover:scale-105 transition`}
            >
              💾 Save Settings
            </button>

            <p
              className={`text-center mt-8 ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Made with ❤️ using React • Tailwind • Supabase • Gemini AI
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}