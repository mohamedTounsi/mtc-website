"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Code,
  Terminal,
  Rocket,
  Sparkles,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ModernMarquee from "../components/ModernMarquee";

export default function Events() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/eventform");
  };

  const [expandedEvent, setExpandedEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch featured event
  useEffect(() => {
    const fetchFeaturedEvent = async () => {
      try {
        const res = await fetch("/api/featuredevent");
        const data = await res.json();
        if (data) setFeaturedEvent(data);
      } catch (error) {
        console.error("Failed to fetch featured event:", error);
      }
    };
    fetchFeaturedEvent();
  }, []);

  // Countdown for featured event
  useEffect(() => {
    if (!featuredEvent?.eventTime) return;

    const eventDateTime = new Date(featuredEvent.eventTime);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDateTime.getTime() - now;

      setTimeLeft({
        days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: Math.max(
          0,
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        ),
        minutes: Math.max(
          0,
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        ),
        seconds: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000)),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [featuredEvent]);

  // Fetch the 6 latest recent events
  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const res = await fetch("/api/recentevent");
        let data = await res.json();
        if (Array.isArray(data)) {
          setRecentEvents(data.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to fetch recent events:", error);
      }
    };
    fetchRecentEvents();
  }, []);

  // Categories
  const categories = [
    {
      id: "all",
      label: "All Events",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "workshop",
      label: "Workshops",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "bootcamp",
      label: "Bootcamps",
      icon: Terminal,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "hackathon",
      label: "Hackathons",
      icon: Rocket,
      color: "from-orange-500 to-red-500",
    },
  ];

  // Filtering for grid
  const filteredEvents =
    activeFilter === "all"
      ? recentEvents
      : recentEvents.filter((event) => event.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900/20 via-purple-900/20 to-violet-900/20 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-dreams text-[6px] md:text-[10px]">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Featured Event
                </span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Featured Event Section */}
        {featuredEvent ? (
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative bg-gradient-to-br from-gray-800/50 to-purple-900/30 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent rotate-45" />
                </div>

                <div className="relative grid lg:grid-cols-2 gap-8 p-8">
                  {/* Content */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-900/20 rounded-full text-sm font-semibold text-white mb-4">
                        Featured Event
                      </span>
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {featuredEvent.title}
                      </h2>
                      <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                        {featuredEvent.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
                        <Calendar className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-sm text-gray-400">Date</p>
                          <p className="text-white font-semibold">
                            {new Date(featuredEvent.eventTime).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
                        <MapPin className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="text-white font-semibold">
                            {featuredEvent.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <span className="text-sm font-semibold text-gray-300">
                          Starts In
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { label: "Days", value: timeLeft.days },
                          { label: "Hours", value: timeLeft.hours },
                          { label: "Minutes", value: timeLeft.minutes },
                          { label: "Seconds", value: timeLeft.seconds },
                        ].map((item, index) => (
                          <div key={index} className="text-center">
                            <div className="bg-black/30 border border-purple-500/30 rounded-xl p-3 mb-2">
                              <span className="text-2xl font-bold text-white">
                                {String(item.value).padStart(2, "0")}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      onClick={handleClick}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative bg-gradient-to-r from-purple-600 to-purple-600 hover:from-purple-500 hover:to-purple-700/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:shadow-purple-500/25"
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>Register Now</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </div>

                  {/* Image */}
                  <div className="relative">
                    <div className="relative h-80 lg:h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <Image
                        src={featuredEvent.image}
                        alt={featuredEvent.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        ) : (
          <ModernMarquee />
        )}

        {/* Events Grid Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className=" text-white mb-4 font-dreams text-[6px] md:text-[10px]">
                Recent Events
              </h2>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(category.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeFilter === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Events Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event._id || event.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group bg-gradient-to-br from-gray-800/50 to-purple-900/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
                  >
                    {/* Event Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                            event.category === "workshop"
                              ? "bg-blue-500/80"
                              : event.category === "bootcamp"
                              ? "bg-green-500/80"
                              : event.category === "hackathon"
                              ? "bg-orange-500/80"
                              : "bg-purple-500/80"
                          }`}
                        >
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}

                        </span>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {event.title}
                      </h3>

                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Event Meta */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                          <span className="text-gray-600">•</span>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags &&
                          event.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="inline-flex items-center space-x-1 px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-300 border border-white/10"
                            >
                              <Tag className="w-3 h-3" />
                              <span>{tag}</span>
                            </span>
                          ))}
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          setExpandedEvent(
                            expandedEvent === (event._id || event.id)
                              ? null
                              : event._id || event.id
                          )
                        }
                        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                      >
                        {expandedEvent === (event._id || event.id)
                          ? "Show Less"
                          : "Learn More"}
                      </motion.button>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {expandedEvent === (event._id || event.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-white/10"
                          >
                            <div className="space-y-2 text-sm text-gray-300">
                              <p>{event.description}</p>
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                  <strong>Duration:</strong> {event.duration}
                                </div>
                                <div>
                                  <strong>Level:</strong> {event.difficulty}
                                </div>
                                <div>
                                  <strong>Attendees:</strong> {event.attendees}
                                </div>
                                <div>
                                  <strong>Type:</strong> {event.category.charAt(0).toUpperCase() + event.category.slice(1)}

                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 text-lg mb-4">
                  No events found for this category
                </div>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="text-purple-400 hover:text-purple-300 font-semibold"
                >
                  View all events
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
