"use client";

import { useEffect, useState } from "react";
import { Loader2, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function EventMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-white"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-tr from-purple-500 to-fuchsia-600 shadow-md shadow-fuchsia-800/40">
          <Users className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
          Event Members
        </h1>
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
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">
                    #
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">
                    First Name
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">
                    Last Name
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-200">
                    Date
                  </th>
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
                    <td className="px-6 py-4 font-medium text-gray-100">
                      {member.firstName}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {member.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-400">{member.email}</td>
                    <td className="px-6 py-4 text-gray-400">{member.phone}</td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(member.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
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
                  <h3 className="font-semibold text-white">
                    {member.firstName} {member.lastName}
                  </h3>
                  <span className="text-gray-400 text-sm">
                    {new Date(member.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="text-gray-400 text-sm">{member.email}</div>
                <div className="text-gray-400 text-sm">{member.phone}</div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
