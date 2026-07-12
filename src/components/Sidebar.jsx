import {
  LayoutDashboard,
  Receipt,
  PlusCircle,
  BarChart3,
  Bot,
  ShieldCheck,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);

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

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "My Bills",
      icon: <Receipt size={20} />,
      path: "/all-bills",
    },
    {
      title: "Add Bill",
      icon: <PlusCircle size={20} />,
      path: "/add-bill",
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/dashboard",
    },
    {
      title: "AI Center",
      icon: <Bot size={20} />,
      path: "/ai-center",
    },
    {
      title: "Warranty Center",
      icon: <ShieldCheck size={20} />,
      path: "/warranty",
    },
    {
      title: "Notifications",
      icon: <Bell size={20} />,
      path: "/notifications",
    },
    {
      title: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (

    <aside
      className={`${
        collapsed ? "w-20" : "w-72"
      } min-h-screen transition-all duration-500 flex flex-col ${
        darkMode
          ? `bg-gradient-to-b ${colors[theme].primary} text-white`
          : "bg-white text-slate-900 border-r border-gray-200"
      }`}
    >

      {/* Header */}

      <div
        className={`flex items-center justify-between p-5 ${
          darkMode
            ? "border-b border-white/10"
            : "border-b border-gray-200"
        }`}
      >

        {!collapsed && (

          <div>

            <h1 className="text-2xl font-bold">
              BillBox
            </h1>

            <p
              className={`text-xs mt-1 ${
                darkMode
                  ? "text-slate-200"
                  : "text-slate-600"
              }`}
            >
              Smart AI-Powered Warranty Manager
            </p>

          </div>

        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-2 rounded-lg ${
            darkMode
              ? "hover:bg-white/10"
              : "hover:bg-gray-200"
          }`}
        >
          <Menu size={20} />
        </button>

      </div>

      {/* Navigation */}

      <nav className="flex-1 mt-6 px-3 space-y-2">

        {menuItems.map((item) => (

          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-white text-slate-900 font-bold"
                  : darkMode
                  ? "text-white hover:bg-white/10"
                  : "text-slate-700 hover:bg-gray-200"
              }`
            }
          >

            {item.icon}

            {!collapsed && (

              <span>{item.title}</span>

            )}

          </NavLink>

        ))}

      </nav>

      {/* Logout */}

      <div
        className={`p-4 ${
          darkMode
            ? "border-t border-white/10"
            : "border-t border-gray-200"
        }`}
      >

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
        >

          <LogOut size={20} />

          {!collapsed && <span>Logout</span>}

        </button>

      </div>

    </aside>

  );

}