"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function HiringToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/settings/hiring");
      const data = await res.json();
      setIsOpen(data.isOpen);
    } catch (error) {
      console.error("Failed to fetch hiring status", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async () => {
    const newState = !isOpen;
    try {
      const res = await fetch("/api/settings/hiring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOpen: newState }),
      });

      if (res.ok) {
        setIsOpen(newState);
        toast.success(`Hiring is now ${newState ? "OPEN" : "CLOSED"}`);
        // Reload to update other parts of the dashboard that depend on this setting
        setTimeout(() => window.location.reload(), 1000);
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className="text-white/50">Loading status...</div>;

  return (
    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm mb-8">
      <Toaster position="top-right" />
      <div className="flex flex-col">
        <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Hiring Status</span>
        <span className={`text-xl font-bold ${isOpen ? "text-green-400" : "text-red-400"}`}>
          {isOpen ? "OPEN" : "CLOSED"}
        </span>
      </div>
      
      <button
        onClick={toggleStatus}
        className={`ml-auto px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
          isOpen 
            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30" 
            : "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
        }`}
      >
        {isOpen ? "Close Hiring" : "Open Hiring"}
      </button>
    </div>
  );
}
