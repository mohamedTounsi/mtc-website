"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, Edit, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function RecentEventsDashboard() {
  const [recentEvents, setRecentEvents] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchRecentEvents();
  }, []);

  const fetchRecentEvents = async () => {
    try {
      const res = await fetch("/api/recentevent");
      const data = await res.json();
      setRecentEvents(data);
    } catch {
      toast.error("Failed to fetch recent events");
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Delete this event?")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/recentevent/${_id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Event deleted");
        setRecentEvents(events => events.filter(e => e._id !== _id));
      } else {
        toast.error("Failed to delete event");
      }
    } catch {
      toast.error("Error deleting event");
    }
    setIsDeleting(false);
  };

  return (
    <section className="min-h-screen p-8 bg-black text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recent Events</h1>
        <Link
          href="/dashboard/recentEvents/form"
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-lg flex gap-2 items-center"
        >
          <Plus size={20} /> Add Event
        </Link>
      </div>
      {recentEvents.length === 0 ? (
        <div className="text-gray-400 text-center py-16">
          No events yet. <br />
          <Link href="/dashboard/recentEvents/form" className="underline text-purple-400">Add one?</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {recentEvents.map(event => (
            <div
              key={event._id}
              className="p-6 bg-gray-900 rounded-xl border border-purple-500/20 shadow group"
            >
              <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded mb-3" />
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-purple-300 text-sm mb-2 font-medium">{event.category}</p>
              <p className="text-sm mb-2">{event.date} | {event.time}</p>
              <p className="text-sm mb-3">{event.location}</p>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{event.description}</p>
              <div className="flex gap-2 mb-4">
                {event.tags && event.tags.map((tag, i) => (
                  <span key={i} className="bg-purple-800 text-purple-200 px-2 py-1 rounded text-xs">#{tag}</span>
                ))}
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/recentEvents/form?id=${event._id}`}
                  className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded"
                >
                  <Edit size={16}/> Edit
                </Link>
                <button
                  onClick={() => handleDelete(event._id)}
                  disabled={isDeleting}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  <Trash2 size={16}/> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
