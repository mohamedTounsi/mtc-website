"use client";
import { useState, useEffect } from "react";
import {
  Trash2,
  Search,
  Download,
  Users,
  TrendingUp,
  DollarSign,
  Facebook,
} from "lucide-react";

export default function DashboardPage() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMembership, setFilterMembership] = useState("all");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/members");
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error("Failed to fetch members:", err);
    }
  };

  const handlePaidToggle = async (id) => {
    const member = members.find((m) => m._id === id);
    const newStatus = !member.paid;

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
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };
  const handleExport = async () => {
    try {
      // This will trigger your backend route to download the file
      window.open("/api/export-members", "_blank");
    } catch (error) {
      console.error("Error exporting members:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      const res = await fetch(`/api/members/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete member");

      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Failed to delete member:", err);
    }
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "paid" && member.paid) ||
      (filterStatus === "unpaid" && !member.paid);

    const matchesMembership =
      filterMembership === "all" || member.membership === filterMembership;

    return matchesSearch && matchesStatus && matchesMembership;
  });

  const stats = {
    total: members.length,
    paid: members.filter((m) => m.paid).length,
    unpaid: members.filter((m) => !m.paid).length,
  };

  const uniqueMemberships = [...new Set(members.map((m) => m.membership))];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100">
      {/* Header */}
      <header className="bg-[#181818] border-b border-gray-700 sticky top-0 z-10">
        <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Members Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                Manage and track all registered members
              </p>
            </div>
            <button
              onClick={handleExport}
              className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 bg-[#222] hover:bg-[#2a2a2a] transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>
      </header>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1b1b1b] rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Members</p>
                <p className="text-3xl font-bold mt-2 text-white">
                  {stats.total}
                </p>
              </div>
              <div className="bg-blue-900/40 rounded-full p-3">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#1b1b1b] rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Paid Members</p>
                <p className="text-3xl font-bold mt-2 text-green-400">
                  {stats.paid}
                </p>
              </div>
              <div className="bg-green-900/30 rounded-full p-3">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#1b1b1b] rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Unpaid Members</p>
                <p className="text-3xl font-bold mt-2 text-red-400">
                  {stats.unpaid}
                </p>
              </div>
              <div className="bg-red-900/30 rounded-full p-3">
                <TrendingUp className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#1b1b1b] rounded-xl border border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#121212] border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 bg-[#121212] border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>

            <select
              value={filterMembership}
              onChange={(e) => setFilterMembership(e.target.value)}
              className="w-full px-4 py-2 bg-[#121212] border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Memberships</option>
              {uniqueMemberships.map((membership) => (
                <option key={membership} value={membership}>
                  {membership}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Members Table */}
        {filteredMembers.length === 0 ? (
          <div className="bg-[#1b1b1b] rounded-xl border border-gray-700 p-12 text-center">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              No Members Found
            </h3>
            <p className="text-gray-500">
              {searchTerm ||
              filterStatus !== "all" ||
              filterMembership !== "all"
                ? "Try adjusting your filters"
                : "Start by adding your first member"}
            </p>
          </div>
        ) : (
          <div className="bg-[#1b1b1b] rounded-xl border border-gray-700 overflow-hidden">
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-gray-200">
                <thead className="bg-[#181818] border-b border-gray-700">
                  <tr>
                    {[
                      "#",
                      "Name",
                      "Contact",
                      "Level",
                      "Membership",
                      "Group",
                      "Social",
                      "Payment",
                      "Status",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredMembers.map((member, index) => (
                    <tr key={member._id} className="hover:bg-[#222]">
                      <td className="px-6 py-4 text-sm">{index + 1}</td>
                      <td className="px-6 py-4 font-medium">
                        {member.firstName} {member.lastName}
                      </td>
                      <td className="px-6 py-4">
                        <div>{member.email}</div>
                        <div className="text-gray-400 text-sm">
                          {member.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-900/40 text-blue-300 px-2 py-1 rounded-full text-xs">
                          {member.niveau}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-purple-900/40 text-purple-300 px-2 py-1 rounded-full text-xs">
                          {member.membership}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {member.groupName || (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {member.facebook && (
                          <a
                            href={member.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-500"
                          >
                            <Facebook className="w-4 h-4" />
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4">{member.payNow}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handlePaidToggle(member._id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            member.paid
                              ? "bg-green-900/40 text-green-400"
                              : "bg-red-900/40 text-red-400"
                          }`}
                        >
                          {member.paid ? "Paid" : "Unpaid"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="text-red-500 hover:text-red-400 p-2"
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

      {/* Footer */}
      <footer className="bg-[#181818] border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Members Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
