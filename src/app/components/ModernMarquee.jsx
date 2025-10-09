import React from "react";

export default function ModernMarquee() {
  return (
    <div className="relative overflow-hidden my-6">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950 via-black to-purple-950 animate-pulse"></div>

      {/* Glowing top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>

      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-purple-500/10"></div>

      {/* Main content container */}
      <div className="relative py-6 px-2 sm:py-8 sm:px-4">
        {/* Marquee wrapper */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="inline-flex items-center mx-6 sm:mx-12">
              {/* Star burst effect */}
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-purple-500/30 animate-pulse"></div>
                <span className="relative text-3xl sm:text-5xl"></span>
              </div>

              {/* Main text */}
              <span className="mx-4 sm:mx-6 text-3xl sm:text-5xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] sm:drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                  New Event Coming Soon
                </span>
              </span>

              {/* Star burst effect */}
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-purple-500/30 animate-pulse"></div>
                <span className="relative text-3xl sm:text-5xl"></span>
              </div>

              {/* Separator dots */}
              <div className="mx-4 sm:mx-8 flex gap-1 sm:gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-150"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Glowing bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>

      {/* Corner accent lights */}
      <div className="absolute top-0 left-0 w-20 h-20 sm:w-32 sm:h-32 bg-purple-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-purple-500/20 blur-3xl rounded-full"></div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 3s linear infinite; /* faster on default (mobile) */
        }

        @media (min-width: 640px) {
          .animate-marquee {
            animation-duration: 15s; /* slower on larger screens */
          }
        }

        .delay-75 {
          animation-delay: 75ms;
        }

        .delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
}
