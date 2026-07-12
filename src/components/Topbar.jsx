import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
      <div className="relative w-96">
        <Search
          className="absolute left-3 top-3 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search bills..."
          className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell
            className="text-slate-600 hover:text-indigo-600"
            size={24}
          />

          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            2
          </span>
        </button>

        <div className="flex items-center gap-3">
          <UserCircle2
            size={38}
            className="text-indigo-600"
          />

          <div>
            <p className="font-semibold text-slate-800">
              Welcome Back
            </p>

            <p className="text-sm text-slate-500">
              BillBox User
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}