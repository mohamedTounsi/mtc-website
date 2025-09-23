"use client";
import React from "react";
import { ExternalLink, Github, Linkedin, Globe, ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BackArrow from "../components/BackArrow";
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

export default function DepartmentPage() {
  const teamMembers = [
    {
      name: "Mohamed Yassin Ghorbel",
      role: "Manager",
      image: "/ghorbel1.png",
      linktree: "https://linktr.ee/ysn.ghrbl",
      socialLinks: [
        { icon: Github, url: "#", color: "hover:bg-gray-800" },
        { icon: Linkedin, url: "#", color: "hover:bg-blue-600" },
        { icon: Globe, url: "#", color: "hover:bg-emerald-600" },
      ],
    },
    {
      name: "Mohamed Tounsi",
      role: "Developer",
      image: "/mohamed1.png",
      linktree: "https://linktr.ee/ROU8E",
      socialLinks: [
        { icon: Github, url: "#", color: "hover:bg-gray-800" },
        { icon: Linkedin, url: "#", color: "hover:bg-blue-600" },
        { icon: Globe, url: "#", color: "hover:bg-emerald-600" },
      ],
    },
  ];

  return (
    <div className="relative pt-[63px] md:pt-0 min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <BackArrow />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse"></div>
      </div>

      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/8 to-teal-500/8 rounded-full blur-2xl animate-pulse delay-500"></div>

      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-blue-900/10"></div>

      <div className="max-w-7xl mx-auto relative z-10 p-8">
        <div className="text-center mb-16 ">
          <div className="relative mb-6">
            <h1 className="text-[10px] md:text-[18px] py-4 md:py-6 font-dreams bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-4 tracking-tight">
              DEV TEAM
            </h1>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative w-48 h-1 mx-auto mb-6 rounded-full overflow-hidden bg-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-purple-400/50 animate-pulse rounded-full"></div>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto font-light">
            Meet the visionaries crafting the future of technology. Our elite
            development team transforms ambitious ideas into groundbreaking
            digital experiences.
          </p>

          <div className="flex justify-center mt-6 space-x-4">
            <div className="w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-bounce delay-100"></div>
            <div className="w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={member.name} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/8 to-purple-500/0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-700 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-105"></div>

              <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-2xl rounded-2xl border border-white/5 group-hover:border-purple-400/20 transition-all duration-500 overflow-hidden shadow-xl shadow-black/40">
                <div className="relative p-6 pb-0">
                  <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 bg-gradient-to-r from-purple-500/70 to-pink-500/70 backdrop-blur-xl rounded-full border border-white/10">
                      <span className="text-xs font-bold text-white uppercase tracking-widest">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative mx-6 mb-6 rounded-xl overflow-hidden shadow-xl group-hover:shadow-purple-500/10 transition-all duration-500">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />

                    <div className="absolute top-3 left-3 z-20">
                      <a
                        href={member.linktree}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-xl border border-white/20 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 hover:scale-105 transition-all duration-300 text-white text-sm font-medium"
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
                  </div>
                </div>

                <div className="px-6 pb-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                    {member.name}
                  </h3>

                  <div className="relative w-16 h-0.5 mx-auto mb-3 rounded-full overflow-hidden bg-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/60 to-pink-400/60 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/[0.02] backdrop-blur-xl rounded-full border border-white/5">
            <div className="w-1.5 h-1.5 bg-emerald-400/60 rounded-full animate-pulse"></div>
            <span className="text-gray-500 text-sm font-medium">
              Building the future, one line of code at a time
            </span>
            <div className="w-1.5 h-1.5 bg-emerald-400/60 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
