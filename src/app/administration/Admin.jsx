"use client";
import React from "react";
import { Github, Linkedin, Globe, Sparkles, Crown } from "lucide-react";

// Mock Image component for Next.js
const Image = ({ src, alt, fill, className, style }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    style={
      fill
        ? { ...style, objectFit: "cover", width: "100%", height: "100%" }
        : style
    }
  />
);

export default function Admin() {
  const admins = [
    {
      name: "Oussema Mahfoudhi",
      role: "President",
      image: "/oussema.jpeg",
      linktree: "https://linktr.ee/wookie264",
      gradient: "from-purple-600 to-pink-600",
      socialLinks: [
        { icon: Github, url: "#", color: "hover:bg-gray-800" },
        { icon: Linkedin, url: "#", color: "hover:bg-blue-600" },
        { icon: Globe, url: "#", color: "hover:bg-emerald-600" },
      ],
    },
    {
      name: "Eya Jaoua",
      role: "Vice President",
      image: "/eya2.jpeg",
      linktree: "https://linktr.ee/eya_jaoua",
      gradient: "from-pink-600 to-purple-600",
      socialLinks: [
        { icon: Github, url: "#", color: "hover:bg-gray-800" },
        { icon: Linkedin, url: "#", color: "hover:bg-blue-600" },
        { icon: Globe, url: "#", color: "hover:bg-emerald-600" },
      ],
    },
  ];

  return (
    <div className="relative pt-[63px] md:pt-0 min-h-screen overflow-hidden ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-600/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-4 md:py-12 lg:py-20">
        {/* Header */}
        <div className="text-center mb-5 md:mb-16 lg:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-6 tracking-tight">
            ADMINISTRATION
          </h1>

          <div className="relative w-32 sm:w-48 h-1 mx-auto mb-8 rounded-full overflow-hidden bg-gradient-to-r from-transparent via-purple-500/30 to-transparent">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-shimmer"></div>
          </div>

          <p className="text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Meet our exceptional leadership team driving innovation and
            excellence in everything we do.
          </p>

          <div className="flex justify-center mt-8 space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        {/* Admin Cards */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {admins.map((admin, index) => (
            <div
              key={admin.name}
              className="group relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Glow Effect */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${admin.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-700`}
              ></div>

              {/* Card Container */}
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-purple-400/30 transition-all duration-500 overflow-hidden shadow-2xl">
                {/* Top Gradient Bar */}
                <div
                  className={`h-1.5 bg-gradient-to-r ${admin.gradient}`}
                ></div>

                {/* Role Badge with Icon */}
                <div className="absolute top-6 right-6 z-20">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${admin.gradient} rounded-full border border-white/20 shadow-lg backdrop-blur-sm`}
                  >
                    <Crown className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {admin.role}
                    </span>
                  </div>
                </div>

                {/* Image Section */}
                <div className="relative p-6 pb-0">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500">
                    {/* Image Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${admin.gradient} opacity-0 group-hover:opacity-20 z-10 transition-all duration-700`}
                    ></div>

                    {/* Image */}
                    <Image
                      src={admin.image}
                      alt={admin.name}
                      fill
                      className="transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-110"
                    />

                    {/* Linktree Button */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <a
                        href={admin.linktree}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 backdrop-blur-xl border border-white/30 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/50 hover:scale-105 transition-all duration-300 text-white text-sm font-semibold"
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M7.953 15.066c-.08-.08-.08-.207 0-.287l2.68-2.68a2.5 2.5 0 0 1 3.536 0l2.68 2.68c.08.08.08.207 0 .287-.08.08-.207.08-.287 0l-2.68-2.68a2 2 0 0 0-2.828 0l-2.68 2.68c-.08.08-.207.08-.287 0z" />
                          <path d="M16.047 8.934c.08.08.08.207 0 .287l-2.68 2.68a2.5 2.5 0 0 1-3.536 0l-2.68-2.68c-.08-.08-.08-.207 0-.287.08-.08.207-.08.287 0l2.68 2.68a2 2 0 0 0 2.828 0l2.68-2.68c.08-.08.207-.08.287 0z" />
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <span>Linktree</span>
                      </a>
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg"></div>
                  </div>
                </div>

                {/* Name and Info Section */}
                <div className="p-8 pt-6 text-center space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-pink-200 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {admin.name}
                    </h3>

                    <div className="relative w-20 h-1 mx-auto mb-4 rounded-full overflow-hidden bg-white/10">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${admin.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Bottom Decorative Line */}
                <div
                  className={`h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent group-hover:via-purple-400 transition-all duration-500`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:border-purple-400/30 transition-all duration-300">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400 text-sm sm:text-base font-medium">
              Building the future, one decision at a time
            </span>
            <div
              className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
}
