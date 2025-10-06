"use client";
import { useState } from "react";
import { Send, Mail, Users, UserPlus, RotateCcw, UsersRound, CheckCircle2, CircleMinus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const recipientOptions = [
  { label: "All members", value: "all", icon: <Users className="w-4 h-4 mr-2" /> },
  { label: "Paid members", value: "paid", icon: <CheckCircle2 className="w-4 h-4 mr-2" /> },
  { label: "Unpaid members", value: "unpaid", icon: <CircleMinus className="w-4 h-4 mr-2" /> },
  { label: "New members", value: "new", icon: <UserPlus className="w-4 h-4 mr-2" /> },
  { label: "Renewing members", value: "renewing", icon: <RotateCcw className="w-4 h-4 mr-2" /> },
  { label: "Group members", value: "group", icon: <UsersRound className="w-4 h-4 mr-2" /> },
];

export default function EmailSenderPage() {
  const [form, setForm] = useState({
    to: "all",
    groupName: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.message.trim()) {
      toast.error("Subject and message are required.");
      return;
    }
    if (form.to === "group" && !form.groupName.trim()) {
      toast.error("Please specify a group name!");
      return;
    }
    setIsSending(true);
    try {
      const res = await fetch("/api/send-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-dashboard-auth": process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send emails");
      }
      toast.success("Emails sent successfully! 📧");
      setForm((prev) => ({
        ...prev,
        subject: "",
        message: "",
        ...(form.to === "group" && { groupName: "" }),
      }));
    } catch (err) {
      console.error("Email sending error:", err);
      toast.error(`❌ ${err.message || "Unable to send emails!"}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-white rounded-xl min-h-screen  relative overflow-hidden"
    >
      <Toaster position="top-right" />
      <div className="relative z-10">
        <div className="flex items-center justify-center min-h-screen px-0 py-0">
          <div className="w-full"> {/* Full width container */}
            <div className="bg-white/5 backdrop-blur-xl rounded-none border-none shadow-purple-900/30 shadow-lg overflow-hidden w-full">
              {/* Header */}
              <div className="px-8 py-6 bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 border-b border-purple-800/60 w-full">
              
                <h1 className="text-2xl font-bold text-white mb-2">Email Sender</h1>
                <p className="text-purple-200 text-sm">Choose recipients and send a mass email to your members.</p>
              </div>
              <form onSubmit={handleSubmit} className="p-8 w-full space-y-7">
                <div>
                  <label className="block text-sm font-medium text-white mb-3">To:</label>
                  <div className="grid grid-cols-2 gap-3 text-white text-sm">
                    {recipientOptions.map(({ label, value, icon }) => (
                      <label key={value}
                        className={`flex items-center space-x-2 bg-white/5 px-4 py-3 rounded-lg border border-white/20 cursor-pointer hover:bg-white/10 transition-all duration-200 ${form.to === value ? "border-purple-400 bg-purple-400/20" : ""}`}
                      >
                        <input
                          type="radio"
                          name="to"
                          value={value}
                          checked={form.to === value}
                          onChange={handleChange}
                          className="text-purple-400 focus:ring-purple-500"
                        />
                        <div className="flex items-center">
                          {icon}
                          <span>{label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {form.to === "group" && (
                    <div className="mt-4 w-full">
                      <label className="block text-sm font-medium text-white mb-2">Group Name</label>
                      <input
                        type="text"
                        name="groupName"
                        value={form.groupName}
                        onChange={handleChange}
                        required
                        placeholder="Enter specific group name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                      />
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-white mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Enter email subject"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-white mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-vertical"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled//={isSending}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold  hover:from-purple-700 hover:to-purple-600 focus:ring-2 focus:ring-purple-500/50 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Email (Locked)
                </button>
              </form>
            </div>
            <p className="text-center text-purple-300/70 text-sm mt-6">
              Email privacy is strictly enforced by your club's dashboard.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
