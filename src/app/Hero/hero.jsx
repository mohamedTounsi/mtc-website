"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import StarsCanvas from "../components/canvas/Stars";

export default function Hero() {
  const router = useRouter();

  const featureCount = 4;
  const floatingDots = [
    { left: "15%", top: "20%" },
    { left: "25%", top: "70%" },
    { left: "65%", top: "40%" },
    { left: "80%", top: "85%" },
    { left: "45%", top: "30%" },
    { left: "10%", top: "60%" },
  ];

  return (
    <div className="relative h-screen w-full pt-[40px] md:pt-10 overflow-hidden bg-gradient-to-br from-black via-black to-purple-900 flex flex-col items-center">
      <StarsCanvas />

      {/* Background Blurs */}
      <div className="absolute top-10 left-4 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-purple-700/40 rounded-full blur-[80px] md:blur-[120px] z-0" />
      <div className="absolute bottom-20 right-4 md:right-20 w-64 md:w-96 h-64 md:h-96 bg-purple-500/30 rounded-full blur-[100px] md:blur-[150px] z-0" />
      <div className="absolute top-1/2 right-1/4 w-40 md:w-64 h-40 md:h-64 bg-purple-400/20 rounded-full blur-[80px] md:blur-[120px] z-0" />
      <div className="absolute top-1/3 left-1/3 w-32 md:w-48 h-32 md:h-48 bg-white/10 rounded-full blur-[60px] md:blur-[100px] z-0" />

      {/* Top Navigation */}
      <div className="mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-4 w-[95%] md:w-[80%] lg:w-[79%] bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl z-20 relative">
        <div className="absolute inset-0 rounded-full bg-white/5 blur-sm"></div>
        <div className="relative z-10 flex items-center justify-between w-full">
          {/* Club Info */}
          <div className="flex flex-col items-start">
            <h1 className="text-sm md:text-xl lg:text-2xl font-black tracking-widest text-white whitespace-nowrap font-mono">
              MICROSOFT
            </h1>
            <h2 className="text-xs md:text-sm lg:text-base font-light tracking-wider text-white/70 whitespace-nowrap font-mono -mt-1">
              TECH CLUB ISIM-SFAX
            </h2>
          </div>

          {/* Nav Links */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 text-white/80 text-sm lg:text-base font-mono">
            {["Home", "Benefits", "Departments", "Contact"].map((link) => (
              <li
                key={link}
                className="hover:text-purple-400 cursor-pointer transition-all duration-300 hover:scale-105 relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex gap-2 md:gap-3">
            <button className="px-3 md:px-5 py-2 rounded-xl text-white border border-white/20 hover:bg-white/10 hover:border-white/40 hover:shadow-lg hover:shadow-white/25 transition-all duration-300 text-xs md:text-sm lg:text-base font-mono hover:scale-105 relative overflow-hidden group">
              <span className="relative z-10">About us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <button
              onClick={() => router.push("/form")}
              className="px-3 md:px-5 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-xs md:text-sm lg:text-base font-mono hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Join us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 -mt-16 md:mt-0 gap-2 md:gap-0">
        {/* Feature Icons */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="mb-6 md:mb-8"
        >
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {Array.from({ length: featureCount }).map((_, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.5, rotate: -15 },
                  show: {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: { duration: 0.6, delay: i * 0.1 },
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.4 },
                }}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-2xl relative overflow-hidden cursor-pointer group"
              >
                <div className="absolute inset-0 rounded-lg border-2 border-white/30 group-hover:border-white/60 transition-all duration-300 pointer-events-none shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
                <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-md"></div>
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                      "linear-gradient(225deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
                      "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                  className="absolute inset-0 rounded-lg"
                />
                <motion.div
                  animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-80"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-wide text-center px-2 relative"
        >
          LAUNCH INTO THE TECH{" "}
          <span className="font-tommyOutline relative">UNIVERSE</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 40, scaleX: 0.5 }}
          animate={{ opacity: 1, y: 0, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{ transformOrigin: "center" }}
          className="mt-4 text-gray-300 max-w-xs sm:max-w-sm md:max-w-xl mx-auto text-xs sm:text-sm text-center md:text-base px-4 leading-relaxed"
        >
          Join Microsoft Tech Club ISIM Sfax and explore a cosmos where every
          idea shines, and innovation knows no limits.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          className="mt-6 md:mt-8"
        >
          <a href="#" className="group relative block mx-auto">
            <span className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-purple-500/20 to-white/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-70 pointer-events-none"></span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative text-center border-3 py-5 px-8 backdrop-blur-sm rounded-3xl font-dreams text-[5px] text-white overflow-hidden transition-all duration-300 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                GET STARTED
              </span>
              <span className="absolute inset-0 rounded-3xl border-2 border-purple-400/50 pointer-events-none group-hover:border-purple-300 transition-colors duration-300"></span>
            </motion.button>
          </a>
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="w-full px-2 pb-2 flex items-center justify-between text-xs text-gray-400 z-10">
        <div>
          <h3 className="text-start font-tommy text-md md:text-xl">
            Based in Sfax, Tunisia
          </h3>
          <p className="font-dreams text-[3px] md:text-[4px] opacity-60">
            2012 4:04 GMT+1404C
          </p>
        </div>
        <span className="text-xs">
          <h3 className="text-end font-tommy text-md md:text-[20px] opacity-60">
            Work availability
          </h3>
          <p className="font-dreams text-end text-[4px] mt-1">
            UNLIMITED HOURS
          </p>
        </span>
      </div>

      {/* Floating Dots */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingDots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{ left: dot.left, top: dot.top }}
            animate={{ y: [-20, -100], opacity: [0, 1, 0] }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
