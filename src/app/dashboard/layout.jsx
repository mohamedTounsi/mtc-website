"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogOut, LayoutDashboard, House, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Members", path: "/dashboard/members" },
  { name: "Event Members", path: "/dashboard/event-members" },
  { name: "Email Sender", path: "/dashboard/email-sender" },
  { name: "Featured-Event", path: "/dashboard/featured-event" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("dashboard-auth");
    if (auth === "true") setAuthenticated(true);
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD;
    if (passwordInput === correctPassword) {
      localStorage.setItem("dashboard-auth", "true");
      setAuthenticated(true);
    } else {
      alert("Incorrect password!");
      setPasswordInput("");
    }
  };

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0d] text-white p-4">
        <form
          onSubmit={handlePasswordSubmit}
          className="bg-[#111116] p-8 rounded-xl shadow-lg border border-purple-800/40 flex flex-col gap-4 w-full max-w-sm"
        >
          <h1 className="text-2xl font-semibold text-center">
            Enter Dashboard Password
          </h1>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Password"
            className="p-3 rounded-lg bg-[#1a1a1f] border border-purple-800/50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 transition-colors duration-200 text-white p-3 rounded-lg font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0a0a0d] text-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-gradient-to-b from-[#3b0a55] via-[#230733] to-[#0a0a0d] p-6 flex-col justify-between shadow-xl shadow-purple-900/30 border-r border-purple-800/40">
        <div>
          <Link href="/">
            <div className="flex items-center justify-center gap-2 mb-10 cursor-pointer">
              <h1 className="text-xl flex gap-2 items-center justify-center font-semibold text-white tracking-wide">
                <House />
                Home
              </h1>
            </div>
          </Link>
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

        <div className="mt-10 border-t border-purple-800/50 pt-5 text-center">
          <button
            onClick={() => {
              localStorage.removeItem("dashboard-auth");
              setAuthenticated(false);
            }}
            className="flex items-center gap-2 justify-center text-sm text-gray-400 hover:text-fuchsia-400 transition-colors duration-200"
          >
            <LogOut size={16} />
            Logout
          </button>
          <p className="text-xs text-gray-500 mt-4">© 2025 Admin Dashboard</p>
        </div>
      </aside>

      {/* Mobile Sidebar / Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 right-4 z-50 p-2 rounded-lg text-white shadow-md"
        >
          <Menu />
        </button>

        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-0 bg-[#0a0a0d] z-40 flex flex-col w-64 p-6 shadow-xl border-r border-purple-800/40"
          >
            <div className="flex justify-between items-center mb-10">
              <Link href="/">
                <h1 className="text-xl flex gap-2 items-center font-semibold text-white tracking-wide cursor-pointer">
                  <House />
                  Home
                </h1>
              </Link>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setSidebarOpen(false)}
                  >
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

            <div className="mt-auto border-t border-purple-800/50 pt-5 text-center">
              <button
                onClick={() => {
                  localStorage.removeItem("dashboard-auth");
                  setAuthenticated(false);
                }}
                className="flex items-center gap-2 justify-center text-sm text-gray-400 hover:text-fuchsia-400 transition-colors duration-200"
              >
                <LogOut size={16} />
                Logout
              </button>
              <p className="text-xs text-gray-500 mt-4">
                © 2025 Admin Dashboard
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Main Section */}
      <div className=" w-full flex flex-col">
        <header className="h-16 flex items-center justify-between px-8 bg-[#131318] border-b border-purple-800/50 backdrop-blur-sm">
          <h2 className="text-lg font-semibold tracking-wide bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
        </header>

        <main className=" w-full p-8 bg-[#0a0a0d]">
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
