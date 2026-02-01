"use client";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Sparkles, Target, Users, Zap, Globe, Award } from "lucide-react";
import { useRouter } from "next/navigation";

const WeAreHiring = ({ isOpen }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [speed, setSpeed] = useState(30); // default speed
  const [isHiringOpen, setIsHiringOpen] = useState(isOpen ?? false);
  const [loadingHiring, setLoadingHiring] = useState(isOpen === undefined);
  const router = useRouter();

  useEffect(() => {
    // only runs on client
    const handleResize = () => {
      if (window.innerWidth < 480) setSpeed(80);
      else if (window.innerWidth < 768) setSpeed(50);
      else setSpeed(30);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    const fetchHiringStatus = async () => {
      if (isOpen !== undefined) return;
      
      try {
        const res = await fetch("/api/settings/hiring");
        const data = await res.json();
        setIsHiringOpen(data.isOpen);
      } catch (err) {
        console.error("Failed to fetch hiring status", err);
      } finally {
        setLoadingHiring(false);
      }
    };
    fetchHiringStatus();

    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handleJoinUs = () => {
    router.push("/hire-form");
  };

  const features = [
    {
      icon: Zap,
      title: "Innovative Projects",
      description:
        "Work on cutting-edge technologies and challenging projects that push boundaries",
    },
    {
      icon: Target,
      title: "Career Growth",
      description:
        "Continuous learning opportunities and clear paths for professional development",
    },
    {
      icon: Users,
      title: "Great Culture",
      description:
        "Collaborative environment with supportive and talented team members",
    },
    {
      icon: Globe,
      title: "Flexible Work",
      description:
        "Remote-friendly options with flexible working hours and arrangements",
    },
    {
      icon: Award,
      title: "Competitive Benefits",
      description:
        "Comprehensive health, wellness, and financial benefits package",
    },
    {
      icon: Sparkles,
      title: "Modern Tools",
      description:
        "Access to the latest technologies and tools to do your best work",
    },
  ];

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 overflow-hidden"
      style={{
        backgroundImage: "url('/gallery10.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Top Marquee */}
      <div className="relative z-10 py-4 border-b border-white/10">
        <Marquee gradient={false} speed={speed} pauseOnHover={false}>
          {[
            "✦ Join Our Team",
            "✦ Innovate Together",
            "✦ Shape the Future",
            "✦ Be Part of Something Great",
          ].map((text, i) => (
            <span key={i} className="text-lg font-light text-white/70 mx-16">
              {text}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
        <h1
          className="text-7xl md:text-8xl lg:text-9xl font-bold mb-4 leading-tight tracking-tighter"
          style={{
            fontFamily: "'Playfair Display', serif",
            backgroundImage:
              "linear-gradient(135deg, #ffffff 0%, #e5d9fa 40%, #b497e9 70%, #1a1a1a 100%)",
            backgroundSize: "100%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            fontStyle: "italic",
            letterSpacing: "-0.02em",
          }}
        >
          We Are Hiring
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
          Join a visionary team shaping the future. We're seeking passionate
          talents ready to innovate, grow, and make a lasting impact.
        </p>

        {loadingHiring ? (
          <div className="text-white/70 animate-pulse">Checking availability...</div>
        ) : isHiringOpen ? (
          <button
            onClick={handleJoinUs}
            className="group relative px-10 py-3 text-lg font-light text-white border border-white/70 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-transparent"
          >
            <span className="relative flex items-center justify-center gap-2 tracking-wide">
              Explore Open Positions
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[1.5]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>
        ) : (
          <button
            disabled
            className="group relative px-10 py-3 text-lg font-light text-white border border-white/70 rounded-xl overflow-hidden bg-transparent opacity-70 cursor-not-allowed"
          >
            <span className="relative flex items-center justify-center gap-2 tracking-wide">
              Hiring Closed
            </span>
          </button>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap');

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default WeAreHiring;
