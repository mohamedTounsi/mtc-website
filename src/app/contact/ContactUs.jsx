"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import StarsCanvas from "../components/canvas/Stars";

export default function ContactUs() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-white px-6 py-16 overflow-hidden">
      {/* Background stars canvas */}
      <StarsCanvas />

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center relative z-10">
        LET'S{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          TALK.
        </span>
      </h2>

      {/* Mockup Image */}
      <div className="relative w-full max-w-2xl flex justify-center mb-12 z-10">
        <Image
          src="/mockups.png"
          alt="Contact Mockup"
          width={1500}
          height={1500}
          className="object-contain"
          priority
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-8 mt-6 z-10">
        {/* Call Button */}
        <a
          href="tel:+21655281375"
          aria-label="Call us"
          className="rounded-2xl text-[6px] font-semibold tracking-wide shadow-lg transition-transform duration-300"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="relative text-center py-5 px-8 backdrop-blur-sm rounded-3xl font-dreams text-white overflow-hidden transition-all duration-300 group"
          >
            <span className="relative z-10 flex items-center gap-2">
              CALL US
            </span>
            <span className="absolute inset-0 rounded-3xl border-2 border-purple-400/50 pointer-events-none group-hover:border-purple-300 transition-colors duration-300"></span>
          </motion.button>
        </a>

        {/* Instagram Button */}
        <a
          href="https://www.instagram.com/mtc.isims"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on Instagram"
          className="rounded-2xl text-[6px] font-semibold tracking-wide shadow-lg transition-transform duration-300"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="relative text-center py-5 px-8 backdrop-blur-sm rounded-3xl font-dreams text-white overflow-hidden transition-all duration-300 group bg-gradient-to-r from-purple-500 to-indigo-500"
          >
            <span className="relative z-10 flex items-center group-hover:text-black transition-all duration-300 ease-in-out gap-2">
              LET'S CHAT
            </span>
          </motion.button>
        </a>
      </div>
    </section>
  );
}
