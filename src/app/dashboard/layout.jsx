"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogOut, LayoutDashboard } from "lucide-react";

const navItems = [
  { name: "Members", path: "/dashboard/members" },
  { name: "Event Members", path: "/dashboard/event-members" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-[#0a0a0d] text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#3b0a55] via-[#230733] to-[#0a0a0d] p-6 flex flex-col justify-between shadow-xl shadow-purple-900/30 border-r border-purple-800/40">
        <div>
          {/* Logo / Title */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-fuchsia-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-purple-700/50">
              MTC
            </div>
            <h1 className="text-xl font-semibold text-white tracking-wide">
              Admin Panel
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = pathname === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className={`p-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                      active
                        ? "bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-md shadow-purple-900/50"
                        : "text-gray-300 hover:bg-purple-900/40 hover:text-white"
                    }`}
                  >
                    <LayoutDashboard size={18} />
                    {item.name}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-purple-800/50 pt-5 text-center">
          <button className="flex items-center gap-2 justify-center text-sm text-gray-400 hover:text-fuchsia-400 transition-colors duration-200">
            <LogOut size={16} />
            Logout
          </button>
          <p className="text-xs text-gray-500 mt-4">© 2025 Admin Dashboard</p>
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-[#131318] border-b border-purple-800/50 backdrop-blur-sm">
          <h2 className="text-lg font-semibold tracking-wide bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 bg-[#0a0a0d]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[80vh] rounded-xl bg-[#111116] border border-purple-800/40 p-6 shadow-lg shadow-purple-900/20"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
