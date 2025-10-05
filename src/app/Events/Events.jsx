"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowRight,
  Code,
  Cpu,
  Rocket,
  Heart,
  Sparkles,
  Terminal,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";
import FeaturedMarquee from "../components/FeaturedMarquee";

export default function Events() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/eventform"); // navigate to the page named 'eventform'
  };
  const [expandedEvent, setExpandedEvent] = useState(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [liked, setLiked] = useState(false);

  // Countdown timer for main event
  useEffect(() => {
    const eventDate = new Date("2025-10-08T15:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const featuredEvents = [
    {
      id: 1,
      title: "Twin Tech Talk",
      category: "workshop",
      date: "October 8, 2025",
      location: "SC2 ISIMS",
      image: "/event1.jpg",
      featured: true,
      tags: ["AI"],
      description:
        "A session on the fundamentals and real-world applications of Artificial Intelligence, showing how AI is transforming industries and inspiring innovation.",
    },
  ];
  const upcomingEvents = [
    {
      id: 2,
      title: "404: CAREER NOT FOUND",
      category: "workshop",
      date: "October 1, 2025",
      location: "SI 1 ISIMS",
      image: "/event1.jpg",
      featured: false,
      tags: ["Career"],
      description:
        "An interactive session that guided participants in discovering their ideal career paths, exploring strengths, interests, and opportunities to make informed career choices..",
    },
    {
      id: 3,
      title: "DX V1.0",
      category: "hackathon",
      date: "December 21,22 2024 ",
      location: "IIT Sfax",
      image: "/dxlogo.jpg",
      featured: false,
      tags: ["Hackathon"],
      description:
        "DX v1.0 was an innovative two-day hackathon dedicated to exploring the future of Industry 4.0 — the fusion of digital technologies with industrial systems. The event brought together passionate developers, engineers, and innovators to design smart solutions that bridge the gap between automation, data, and connectivity.",
    },
    {
      id: 4,
      title: "React-Native Bootcamp",
      category: "bootcamp",
      date: "March 2,8,9 2025 ",
      location: "Olivium Club",
      image: "/reactnative.jpg",
      featured: false,
      tags: ["React-Native"],
      description:
        "An intensive hands-on program where participants learned to build mobile apps using React Native, covering fundamentals, components, and real-world project development.",
    },
  ];

  const categories = [
    { id: "all", label: "All Events", icon: Sparkles },
    { id: "workshop", label: "Workshops", icon: Code },
    { id: "bootcamp", label: "Bootcamps", icon: Terminal },
    { id: "hackathon", label: "Hackathons", icon: Rocket },
  ];

  const filteredEvents =
    selectedCategory === "all"
      ? upcomingEvents
      : upcomingEvents.filter((event) => event.category === selectedCategory);

  const featuredEvent = featuredEvents[0];

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-purple-900/0 via-purple-950/10 to-black text-white">
      {/* Hero Section with Featured Event */}
      <div className="relative w-full overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 md:pb-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-600/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-800/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 md:w-[600px] h-64 sm:h-96 md:h-[600px] bg-purple-600/10 rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px]" />
        </div>

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FeaturedMarquee />

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-gradient-to-br from-purple-950/40 via-black/60 to-purple-950/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Gradient Overlay Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-purple-500/20 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem]" />

            <div className="relative grid lg:grid-cols-5 gap-6 sm:gap-8 p-6 sm:p-8 lg:p-12">
              {/* Left Content - 3 columns */}
              <div className="lg:col-span-3 flex flex-col justify-center space-y-6 sm:space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                      {featuredEvent.title}
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                    {featuredEvent.description}
                  </p>
                </motion.div>

                {/* Countdown Timer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 sm:p-6"
                >
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">
                      Event Starts In
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:gap-4">
                    {[
                      { label: "Days", value: timeLeft.days },
                      { label: "Hours", value: timeLeft.hours },
                      { label: "Minutes", value: timeLeft.minutes },
                      { label: "Seconds", value: timeLeft.seconds },
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <div className="bg-gradient-to-br from-purple-600/30 to-purple-900/30 border border-purple-500/30 rounded-xl sm:rounded-2xl p-2 sm:p-4 mb-1 sm:mb-2">
                          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                            {String(item.value).padStart(2, "0")}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Info Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="grid sm:grid-cols-2 gap-3 sm:gap-4"
                >
                  <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all hover:scale-105 hover:border-purple-500/50">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-900/50 flex-shrink-0">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                          Date
                        </p>
                        <p className="text-sm sm:text-base text-white font-semibold truncate">
                          {featuredEvent.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all hover:scale-105 hover:border-purple-500/50">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center shadow-lg shadow-purple-900/50 flex-shrink-0">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                          Location
                        </p>
                        <p className="text-sm sm:text-base text-white font-semibold truncate">
                          {featuredEvent.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
                >
                  <Link href="/eventform" className="flex-1 sm:flex-initial">
                    <motion.button
                      onClick={handleClick}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 40px rgba(168, 85, 247, 0.6)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-600 px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg text-white flex items-center justify-center gap-3 shadow-xl shadow-purple-900/50 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                      <span className="relative">Register Now</span>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="flex flex-wrap gap-2 sm:gap-3"
                >
                  {featuredEvent.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-gray-300 backdrop-blur-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Right Image - 2 columns */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-2 relative"
              >
                <div className="relative h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[600px]">
                  {/* Image Container */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                    <Image
                      src="/twin-talk.png"
                      alt="Featured Event"
                      fill
                      className="object-cover"
                    />
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-purple-800/20 mix-blend-overlay" />
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 opacity-40 blur-2xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-purple-800 to-purple-600 opacity-40 blur-2xl"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Event Categories Filter */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className=" text-center font-dreams text-[4px] py-2 md:text-[10px]  mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
          previous & Events
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/50"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-900/30 transition-all"
            >
              {/* Event Image */}
              <div className="relative h-[320px] overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {event.tags.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  {event.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  {expandedEvent === event.id
                    ? event.description
                    : event.description.length > 100
                    ? event.description.slice(0, 100) + "..."
                    : event.description}
                  {event.description.length > 100 && (
                    <button
                      onClick={() =>
                        setExpandedEvent(
                          expandedEvent === event.id ? null : event.id
                        )
                      }
                      className="text-purple-400 ml-1 hover:underline"
                    >
                      {expandedEvent === event.id ? "Show less" : "Show more"}
                    </button>
                  )}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
