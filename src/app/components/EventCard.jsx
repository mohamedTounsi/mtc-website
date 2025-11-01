import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ChevronDown } from "lucide-react";

export default function EventCard({
  event = {
    _id: "1",
    title: "Tech Summit 2025",
    description:
      "Join us for an amazing tech conference with industry leaders and innovators from around the world.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178f50002e4f?w=500&h=550&fit=crop",
    date: "Mar 15, 2025",
    location: "San Francisco, CA",
    category: "hackathon",
    tags: ["Web3", "AI", "Networking"],
    duration: "2 days",
    difficulty: "Intermediate",
    attendees: "500+",
  },
}) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const categoryColors = {
    workshop: "from-blue-500 to-blue-600",
    bootcamp: "from-green-500 to-green-600",
    hackathon: "from-orange-500 to-orange-600",
    conference: "from-purple-500 to-purple-600",
  };

  const categoryBg =
    categoryColors[event.category] || categoryColors.conference;

  return (
    <motion.div layout className="w-full max-w-sm mx-auto">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl hover:border-white/20"
      >
        {/* Image Container - 1.1 Aspect Ratio */}
        <div
          className="relative w-full overflow-hidden bg-gray-900"
          style={{ aspectRatio: "1.1" }}
        >
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Category Badge - Positioned at Top Right */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 z-10"
          >
            <div
              className={`px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryBg} shadow-lg`}
            >
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </div>
          </motion.div>

          {/* Hover State - "See More" Overlay */}
          <AnimatePresence>
            {hovered && !expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20 cursor-pointer"
                onClick={() => setExpanded(true)}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-center"
                >
                  <div className="text-white text-lg font-bold mb-2">
                    See More
                  </div>
                  <ChevronDown className="w-6 h-6 text-white/80 mx-auto animate-bounce" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card Content */}
        <motion.div layout className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300">
            {event.title}
          </h3>

          {/* Meta Info */}
          <div className="space-y-2 mb-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags?.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full text-xs text-purple-300 font-medium hover:border-purple-400/60 transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Learn More Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setExpanded(!expanded)}
            className="w-full py-2.5 px-4  border border-white font-thin text-white  rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm"
          >
            {expanded ? "Show Less" : "Learn More"}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </motion.div>
          </motion.button>

          {/* Expanded Content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                {/* Full Description */}
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                  {event.description}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Duration", value: event.duration },
                    { label: "Level", value: event.difficulty },
                    { label: "Attendees", value: event.attendees },
                    {
                      label: "Type",
                      value:
                        event.category.charAt(0).toUpperCase() +
                        event.category.slice(1),
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="text-xs text-gray-400 font-medium mb-1">
                        {item.label}
                      </div>
                      <div className="text-sm text-white font-semibold">
                        {item.value}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Action Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full mt-4 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium rounded-lg transition-all duration-300 text-sm"
                >
                  Register Now
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
