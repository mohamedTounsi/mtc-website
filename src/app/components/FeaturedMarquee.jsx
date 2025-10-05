import { Sparkles, Star, Zap } from "lucide-react";

export default function FeaturedMarquee() {
  // Simulate marquee with CSS animation
  const marqueeItems = Array(15).fill("FEATURED EVENT");

  return (
    <div className="relative w-full mb-8">
      {/* Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-purple-400/20 to-purple-600/20 blur-xl"></div>

      <div className="relative backdrop-blur-xl bg-gradient-to-r from-black/80 via-purple-950/50 to-black/80 border-2 border-purple-500/50 rounded-2xl shadow-2xl shadow-purple-900/50 overflow-hidden">
        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>

        {/* Bottom border glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>

        <div className="flex items-center py-4 sm:py-5 px-4">
          {/* Left Icon Group */}
          <div className="flex items-center gap-2 mr-4">
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            <Star
              className="w-5 h-5 text-purple-300 animate-spin"
              style={{ animationDuration: "3s" }}
            />
          </div>

          {/* Marquee Container */}
          <div className="flex-1 overflow-hidden relative">
            {/* Left gradient fade */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none"></div>

            {/* Right gradient fade */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none"></div>

            {/* Animated Marquee */}
            <div className="flex animate-marquee hover:pause">
              {marqueeItems.map((item, index) => (
                <div key={index} className="flex items-center flex-shrink-0">
                  <span className="mx-8 text-lg sm:text-2xl font-black bg-gradient-to-r from-purple-300 via-purple-100 to-purple-400 bg-clip-text text-transparent drop-shadow-lg whitespace-nowrap tracking-wider">
                    {item}
                  </span>
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 animate-pulse" />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {marqueeItems.map((item, index) => (
                <div
                  key={`dup-${index}`}
                  className="flex items-center flex-shrink-0"
                >
                  <span className="mx-8 text-lg sm:text-2xl font-black bg-gradient-to-r from-purple-300 via-purple-100 to-purple-400 bg-clip-text text-transparent drop-shadow-lg whitespace-nowrap tracking-wider">
                    {item}
                  </span>
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Icon Group */}
          <div className="flex items-center gap-2 ml-4">
            <Star
              className="w-5 h-5 text-purple-300 animate-spin"
              style={{ animationDuration: "3s", animationDirection: "reverse" }}
            />
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
        </div>

        {/* Particle effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-50 animate-ping"></div>
          <div
            className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-300 rounded-full opacity-50 animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-purple-500 rounded-full opacity-50 animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 12s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 9s linear infinite;
          }
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
