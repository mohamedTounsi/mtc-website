"use client";
import { useState, useEffect } from "react";
import { Trash2, Search,Facebook, Download, Users, Briefcase } from "lucide-react";

export default function HiringMembersPage() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosition, setFilterPosition] = useState("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/hireform");
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    }
  };

  const handleExport = async () => {
    try {
      window.open("/api/export-hiring", "_blank");
    } catch (error) {
      console.error("Error exporting applications:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      const res = await fetch(`/api/hireform/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete application");

      setApplications((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Failed to delete application:", err);
    }
  };

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.phone.includes(searchTerm);

    const matchesPosition =
      filterPosition === "all" || application.position === filterPosition;

    return matchesSearch && matchesPosition;
  });

  const stats = {
    total: applications.length,
  };

  const uniquePositions = [...new Set(applications.map((a) => a.position))];
  const [expandedMessages, setExpandedMessages] = useState({});
  const toggleMessage = (id) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100">
      {/* Header */}
      <header className="bg-[#181818] border-b border-gray-700 sticky top-0 z-10">
        <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Job Applications
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                View all submitted job applications
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
        {/* Stats Card */}
        <div className="mb-8">
          <div className="bg-[#1b1b1b] rounded-xl border border-gray-700 p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Total Applications</p>
              <p className="text-3xl font-bold mt-2 text-white">
                {stats.total}
              </p>
            </div>
            <div className="bg-blue-900/40 rounded-full p-3">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#1b1b1b] rounded-xl border border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#121212] border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
              className="w-full px-4 py-2 bg-[#121212] border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Positions</option>
              {uniquePositions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Applications Table / Cards */}
        {filteredApplications.length === 0 ? (
          <div className="bg-[#1b1b1b] rounded-xl border border-gray-700 p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              No Applications Found
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterPosition !== "all"
                ? "Try adjusting your filters"
                : "No applications yet"}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-[#1b1b1b] rounded-xl border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-gray-200">
                  <thead className="bg-[#181818] border-b border-gray-700">
                    <tr>
                      {[
                        "#",
                        "Name",
                        "Email",
                        "Phone",
                        "Position",
                        "Message",
                        "Facebook",
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
                    {filteredApplications.map((app, index) => (
                      <tr key={app._id} className="hover:bg-[#222]">
                        <td className="px-6 py-4 text-sm">{index + 1}</td>
                        <td className="px-6 py-4 font-medium">
                          {app.fullName}
                        </td>
                        <td className="px-6 py-4">{app.email}</td>
                        <td className="px-6 py-4">{app.phone}</td>
                        <td className="px-6 py-4">
                          <span className="bg-purple-900/40 text-purple-300 px-2 py-1 rounded-full text-xs">
                            {app.position}
                          </span>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <p className="text-sm text-gray-300">
                            {expandedMessages[app._id] ||
                            app.message.length <= 100
                              ? app.message
                              : `${app.message.slice(0, 100)}...`}
                            {app.message.length > 100 && (
                              <button
                                onClick={() => toggleMessage(app._id)}
                                className="ml-2 text-blue-400 hover:underline text-xs"
                              >
                                {expandedMessages[app._id]
                                  ? "See Less"
                                  : "See More"}
                              </button>
                            )}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          {app.facebook && (
                            <a
                              href={app.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-500"
                            >
                              <Facebook className="w-4 h-4" />
                            </a>
                          )}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDelete(app._id)}
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

            {/* Mobile Cards */}
            <div className="lg:hidden flex flex-col gap-4">
              {filteredApplications.map((app, index) => (
                <div
                  key={app._id}
                  className="bg-[#1b1b1b] rounded-xl border border-gray-700 p-4 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-white">{app.fullName}</h3>
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="text-red-500 hover:text-red-400 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-gray-400 text-sm">{app.email}</div>
                  <div className="text-gray-400 text-sm">{app.phone}</div>
                  <div className="mt-2">
                    <span className="bg-purple-900/40 text-purple-300 px-2 py-1 rounded-full text-xs">
                      {app.position}
                    </span>
                  </div>
                  <div className="text-gray-300 text-sm mt-2">
                    <p>
                      {expandedMessages[app._id] || app.message.length <= 100
                        ? app.message
                        : `${app.message.slice(0, 100)}...`}
                      {app.message.length > 100 && (
                        <button
                          onClick={() => toggleMessage(app._id)}
                          className="ml-2 text-blue-400 hover:underline text-xs"
                        >
                          {expandedMessages[app._id] ? "See Less" : "See More"}
                        </button>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
