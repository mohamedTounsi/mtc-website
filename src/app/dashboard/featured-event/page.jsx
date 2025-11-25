"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Calendar, MapPin, Trash2, Clock, Edit } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function FeaturedEventDashboard() {
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchFeaturedEvent();
  }, []);

  const fetchFeaturedEvent = async () => {
    try {
      const res = await fetch("/api/featuredevent");
      const data = await res.json();
      setFeaturedEvent(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch featured event");
    }
  };

  const handleDelete = async () => {
    if (!featuredEvent) return;

    const confirm = window.confirm(
      "Are you sure you want to delete this featured event?"
    );
    if (!confirm) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/featuredevent/${featuredEvent._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Featured event deleted successfully");
        setFeaturedEvent(null);
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to delete event");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting event");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-950 via-black to-purple-950/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Featured Event
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Manage your spotlight event
            </p>
          </div>
        </motion.div>

        {/* Event Card */}
        {featuredEvent ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10"
          >
            {/* Image Section */}
            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 group">
              <Image
                src={featuredEvent.image}
                alt={featuredEvent.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="p-2.5 sm:p-3 bg-red-600/90 hover:bg-red-700 backdrop-blur-sm rounded-xl transition-all hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Featured Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-purple-400/30 shadow-lg">
                  ⭐ FEATURED
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Title */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                  {featuredEvent.title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {featuredEvent.description}
                </p>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <Calendar size={20} className="text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-1">Date</p>
                    <p className="text-sm font-medium text-white truncate">
                      {featuredEvent
                  ? new Date(featuredEvent.eventTime).toLocaleDateString([], {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <Clock size={20} className="text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-1">Time</p>
                    <p className="text-sm font-medium text-white truncate">
                      {new Date(featuredEvent.eventTime).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "UTC+1",
                        }
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors sm:col-span-2 lg:col-span-1">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <MapPin size={20} className="text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-1">Location</p>
                    <p className="text-sm font-medium text-white truncate">
                      {featuredEvent.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {featuredEvent.tags && featuredEvent.tags.length > 0 && (
                <div>
                  <p className="text-sm text-gray-400 mb-3 font-medium">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {featuredEvent.tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="px-3 py-1.5 bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 rounded-lg text-xs font-medium border border-purple-500/30 hover:border-purple-500/50 transition-all cursor-default"
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

              {/* Stats or Additional Info */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-400">Active Event</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">ID:</span>
                  <code className="px-2 py-1 bg-white/5 rounded text-purple-300 text-xs font-mono">
                    {featuredEvent._id?.slice(0, 8)}...
                  </code>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 px-4"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-900/20 rounded-full flex items-center justify-center mb-6">
              <Calendar
                size={40}
                className="text-purple-500/50 sm:w-12 sm:h-12"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-2 text-center">
              No Featured Event Yet
            </h3>
            <p className="text-gray-500 mb-6 text-center max-w-md text-sm sm:text-base">
              Create your first featured event to showcase it on the main page
            </p>
            <Link
              href="/dashboard/featured-event/form"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105"
            >
              <Plus size={20} /> Create Event
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
