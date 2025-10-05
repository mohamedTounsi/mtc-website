// src/app/dashboard/page.jsx
"use client";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Trash2, Eye, EyeOff, Lock, Shield , Download} from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [members, setMembers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const DASHBOARD_PASSWORD =
    process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || "admin123";

  // Persist login across refreshes
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchMembers();
    }
  }, []);


  

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/members");
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      toast.error("Failed to fetch members");
      console.error(err);
    }
  };

  const handleExport = async () => {
  try {
    // Trigger the download by opening the API route in a new window
    window.open('/api/export-members', '_blank');
  } catch (error) {
    console.error('Error exporting members:', error);
    // Handle any errors here
  }
};

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (password === DASHBOARD_PASSWORD) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true"); // persist login
        toast.success("Access granted! Welcome to the dashboard 🎉");
        fetchMembers();
      } else {
        toast.error("Incorrect password. Access denied! 🔒");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    localStorage.removeItem("isAuthenticated"); // clear persisted login
    toast.success("Logged out successfully 👋");
  };

  const handlePaidToggle = async (id) => {
    const member = members.find((m) => m._id === id);
    const newStatus = member.paid ? false : true;

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to mark ${member.firstName} ${member.lastName} as ${
        newStatus ? "Paid" : "Unpaid"
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/members/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paid: newStatus }),
        });
        if (!res.ok) throw new Error("Failed to update paid status");

        setMembers((prev) =>
          prev.map((m) => (m._id === id ? { ...m, paid: newStatus } : m))
        );

        Swal.fire(
          "Updated!",
          `Member is now marked as ${newStatus ? "Paid ✅" : "Unpaid ❌"}`,
          "success"
        );
      } catch (err) {
        Swal.fire("Error!", "Failed to update status", "error");
        console.error(err);
      }
    }
  };

  const handleDelete = async (id) => {
    const member = members.find((m) => m._id === id);

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you really want to delete ${member.firstName} ${member.lastName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#22c55e",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/members/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete member");

        setMembers((prev) => prev.filter((m) => m._id !== id));

        Swal.fire(
          "Deleted!",
          `${member.firstName} ${member.lastName} has been deleted 🗑️`,
          "success"
        );
      } catch (err) {
        Swal.fire("Error!", "Failed to delete member", "error");
        console.error(err);
      }
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-purple-600/20 backdrop-blur-sm border border-purple-400/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Secure Dashboard
            </h1>
            <p className="text-purple-200">
              Enter your password to access the members dashboard
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Dashboard Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-black/30 backdrop-blur-sm border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter password..."
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !password}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  "Access Dashboard"
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-purple-500/20">
              <p className="text-xs text-purple-300 text-center">
                🔒 This dashboard is protected by password authentication
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard (same as your original code)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="bg-black/40 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Members Dashboard
              </h1>
              <p className="text-purple-200">
                Manage and view all registered members
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="bg-purple-600/20 backdrop-blur-sm border border-purple-400/30 rounded-xl px-4 py-2">
                <span className="text-purple-300 text-sm font-medium">
                  Total Members
                </span>
                <div className="text-2xl font-bold text-white">
                  {members.length}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleExport}
                  className="bg-violet-600/20 hover:bg-violet-600/30 backdrop-blur-sm border border-violet-400/30 text-violet-300 hover:text-violet-200 px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600/20 hover:bg-red-600/30 backdrop-blur-sm border border-red-400/30 text-red-300 hover:text-red-200 px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {members.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Members Found
            </h3>
            <p className="text-purple-200">
              Start by adding your first member to see them here.
            </p>
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-lg border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="block lg:hidden">
              <div className="p-6 space-y-4">
                {members.map((member, index) => (
                  <div
                    key={member._id}
                    className={`backdrop-blur-sm border rounded-xl p-4 space-y-3 ${
                      member.paid
                        ? "bg-green-900/20 border-green-400/20"
                        : "bg-red-900/20 border-red-400/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-purple-600/30 text-purple-200 text-xs font-medium px-2 py-1 rounded-full">
                        #{index + 1}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span
                          onClick={() => handlePaidToggle(member._id)}
                          className={`cursor-pointer px-2 py-1 rounded-full text-xs font-medium ${
                            member.paid
                              ? "bg-green-500/20 text-green-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {member.paid ? "✅ Paid" : "❌ Unpaid"}
                        </span>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {member.firstName} {member.lastName}
                      </h3>
                      <p className="text-purple-200 text-sm">{member.email}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-purple-300">Phone:</span>
                        <p className="text-white">{member.phone}</p>
                      </div>
                      <div>
                        <span className="text-purple-300">Level:</span>
                        <p className="text-white">{member.niveau}</p>
                      </div>
                      <div>
                        <span className="text-purple-300">Membership:</span>
                        <p className="text-white">{member.membership}</p>
                      </div>
                      <div>
                        <span className="text-purple-300">Group:</span>
                        <p className="text-white">
                          {member.groupName || "Not assigned"}
                        </p>
                      </div>
                      <div>
                        <span className="text-purple-300">Payment:</span>
                        <p className="text-white">{member.payNow}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-purple-300 text-sm">Address:</span>
                      <p className="text-white text-sm">{member.address}</p>
                    </div>

                    {member.facebook && (
                      <div className="pt-2">
                        <a
                          href={member.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                          <span className="underline">
                            View Facebook Profile
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-black/40 backdrop-blur-sm">
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider border-b border-purple-500/20">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider border-b border-purple-500/20">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider border-b border-purple-500/20">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider border-b border-purple-500/20">
                      Level
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider border-b border-purple-500/20">
                      Membership
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider border-b border-purple-500/20">
                      Group
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider border-b border-purple-500/20">
                      Address
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider border-b border-purple-500/20">
                      Social
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider border-b border-purple-500/20">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider border-b border-purple-500/20">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider border-b border-purple-500/20">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/10">
                  {members.map((member, index) => (
                    <tr
                      key={member._id}
                      className={`backdrop-blur-sm hover:bg-purple-600/20 transition-colors duration-200 ${
                        member.paid
                          ? "bg-green-900/10 border-l-4 border-green-500"
                          : "bg-red-900/10 border-l-4 border-red-500"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-purple-600/30 text-purple-200 text-xs font-medium px-2 py-1 rounded-full">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">
                            {member.firstName} {member.lastName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white">{member.email}</div>
                        <div className="text-sm text-purple-200">
                          {member.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded-full">
                          {member.niveau}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                          {member.membership}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {member.groupName || (
                          <span className="text-purple-400 italic">
                            Not assigned
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-white max-w-xs truncate">
                        {member.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {member.facebook ? (
                          <a
                            href={member.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="underline text-xs">Profile</span>
                          </a>
                        ) : (
                          <span className="text-purple-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {member.payNow}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handlePaidToggle(member._id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 hover:scale-105 ${
                            member.paid
                              ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                              : "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                          }`}
                        >
                          {member.paid ? "✅ Paid" : "❌ Unpaid"}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="bg-black/40 backdrop-blur-lg border-t border-purple-500/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-purple-200 text-sm">
            © 2024 Secure Members Dashboard. Protected by password
            authentication 🔒
          </p>
        </div>
      </div>
    </div>
  );
}
