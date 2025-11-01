"use client";

import { motion } from "framer-motion";
import { Camera, Users, Code, Handshake } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Department() {
  const router = useRouter();

  const departments = [
    {
      icon: <Camera />,
      title: "Media",
      subtitle: "Department",
      gradient: "Purple-600 to Purple-400",
      slug: "mediaDepartment",
    },
    {
      icon: <Handshake />,
      title: "Sponsoring",
      subtitle: "Department",
      gradient: "Purple-700 to Purple-500",
      slug: "sponsoringDepartment",
    },
    {
      icon: <Users />,
      title: "HR & Logistics",
      subtitle: "Department",
      gradient: "Purple-500 to Purple-300",
      slug: "hrDepartment",
    },
    {
      icon: <Code />,
      title: "Dev",
      subtitle: "Department",
      gradient: "Purple-800 to Purple-600",
      slug: "devDepartment",
    },
  ];

  return (
    <section
      id="departments"
      className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 text-white py-16 lg:py-24 overflow-hidden"
    >
      {/* Background Image with Enhanced Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/gallery10.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Gradient Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>

        {/* Blur Effect on Edges */}
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent mb-8 drop-shadow-2xl">
            OUR DEPARTMENTS
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full mx-auto shadow-lg shadow-purple-500/50"></div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-100 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mt-8 mx-auto font-light drop-shadow-lg"
          >
            At MTC, our departments work hand in hand to bring ideas to life.
            Explore each team's unique role:
          </motion.p>
        </motion.div>

        {/* Department Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative cursor-pointer"
              onClick={() => router.push(`/${dept.slug}`)}
            >
              {/* Glow Effect */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${dept.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-700`}
              ></div>

              {/* Card */}
              <div className="relative h-72 sm:h-80 rounded-3xl bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border-2 border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/30 group-hover:shadow-2xl shadow-black/50">
                {/* Top Gradient Bar */}
                <div className={`h-2 bg-gradient-to-r ${dept.gradient}`}></div>

                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${dept.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                ></div>

                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-500"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/30 transition-all duration-500"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`mb-8 p-6 rounded-2xl bg-gradient-to-br ${dept.gradient} shadow-2xl group-hover:shadow-purple-500/60 transition-all duration-500 ring-2 ring-white/20 group-hover:ring-white/40`}
                  >
                    <div className="w-16 h-16 text-white flex items-center justify-center">
                      {dept.icon}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:via-white group-hover:to-pink-200 group-hover:bg-clip-text transition-all duration-300 drop-shadow-lg">
                      {dept.title}
                    </h3>
                    <p className="text-gray-300 text-sm font-medium tracking-wider uppercase group-hover:text-purple-200 transition-colors duration-300">
                      {dept.subtitle}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-purple-200 text-sm font-semibold drop-shadow-lg">
                      Explore
                    </span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="w-2 h-2 bg-purple-300 rounded-full shadow-lg shadow-purple-400/50"></div>
                    </motion.div>
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg group-hover:border-white/50 transition-colors duration-300"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg group-hover:border-white/50 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom gradient line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 lg:mt-20 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-lg shadow-purple-500/50"
        />
      </div>
    </section>
  );
}
