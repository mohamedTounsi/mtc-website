"use client";

import { useEffect, useState } from "react";
import { Loader2, Users, Download, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function EventMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);


const handleStatusToggle = async (eventId, currentStatus) => {
  try {
    const response = await fetch(`/api/eventform/${eventId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Status: !currentStatus }),
    });

    if (!response.ok) {
      throw new Error('Failed to toggle status');
    }

    const updatedEvent = await response.json();

    // Add this block to dynamically update the view
    setMembers((prev) =>
      prev.map((m) =>
        m._id === eventId ? { ...m, Status: updatedEvent.Status } : m
      )
    );

    return updatedEvent;
  } catch (error) {
    console.error(error);
    return null;
  }
};



  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/eventform");
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        console.error("Failed to load members:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleExport = () => {
    window.open("/api/export-event-members", "_blank");
  };

  const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete ALL event members? This action cannot be undone.")) {
    return;
  }
  setDeleting(true);
  try {
    const res = await fetch("/api/delete-event-members", {
      method: "DELETE",
    });
    const data = await res.json();

    if (res.ok) {
      alert(`Success: ${data.deletedCount} event members deleted.`);
      setMembers([]); // clear list on success
    } else {
      alert(`Error: ${data.error || "Failed to delete event members."}`);
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while deleting event members.");
  } finally {
    setDeleting(false);
  }
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-white"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-y-3 gap-x-4 mb-10 flex-wrap">
        <div className="hidden p-2 md:flex-wrap rounded-lg bg-gradient-to-tr from-purple-500 to-fuchsia-600 shadow-md shadow-fuchsia-800/40 flex-shrink-0 md:flex items-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent flex-1">
          
          Event Members
        </h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 bg-[#222] hover:bg-[#2a2a2a] transition-colors w-full sm:w-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 bg-red-600 hover:bg-red-700 transition-colors w-full sm:w-auto"
          >
            {deleting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            Reset Event Members
          </button>
        </div>
      </div>


      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-fuchsia-500" />
        </div>
      ) : members.length === 0 ? (
        <p className="text-gray-400 text-center mt-20 text-sm">
          No members have registered yet.
        </p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto bg-gradient-to-b from-[#131318] to-[#0d0d10] rounded-2xl border border-purple-800/50 shadow-lg shadow-purple-900/30 backdrop-blur-sm">
            <table className="min-w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 border-b border-purple-800/60">
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">#</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">First Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">Last Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">Email</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">Phone</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <motion.tr
                    key={member._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-purple-800/40 hover:bg-purple-900/30 hover:shadow-md hover:shadow-fuchsia-800/10 transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-100">{member.firstName}</td>
                    <td className="px-6 py-4 text-gray-200">{member.lastName}</td>
                    <td className="px-6 py-4 text-gray-400">{member.email}</td>
                    <td className="px-6 py-4 text-gray-400">{member.phone}</td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(member.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                          <button
                            onClick={() => handleStatusToggle(member._id,member.Status)}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              member.Status
                                ? "bg-green-900/40 text-green-400"
                                : "bg-red-900/40 text-red-400"
                            }`}
                          >
                            {member.Status ? "Present" : "Absent"}
                          </button>
                        </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden flex flex-col gap-4">
            {members.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="bg-gradient-to-b from-[#131318] to-[#0d0d10] rounded-2xl border border-purple-800/50 shadow-lg shadow-purple-900/30 p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-white">{member.firstName} {member.lastName}</h3>
                  <span className="text-gray-400 text-sm">
                    {new Date(member.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="text-gray-400 text-sm">{member.email}</div>
                <div className="flex justify-between items-center">
                <div className="text-gray-400 text-sm">{member.phone}</div>
                <div className="text-gray-400 text-sm">
                  <button
                            onClick={() => handleStatusToggle(member._id,member.Status)}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              member.Status
                                ? "bg-green-900/40 text-green-400"
                                : "bg-red-900/40 text-red-400"
                            }`}
                          >
                            {member.Status ? "Present" : "Absent"}
                          </button>
                </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
