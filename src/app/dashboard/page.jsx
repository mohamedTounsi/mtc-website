import Link from "next/link";
import {
  Users,
  Calendar,
  AtSign,
  TrendingUp,
  Shield,
  Bell,
  Star,
  Presentation,
} from "lucide-react";

export default function DashboardPage() {
  const cards = [
    {
      icon: Users,
      title: "Members",
      description: "View and manage all registered members",
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
      link: "/dashboard/members", // added link
    },
    {
      icon: Calendar,
      title: "Event Members",
      description: "Track users registered for events",
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      link: "/dashboard/event-members", // added link
    },
    {
      icon: AtSign,
      title: "Email Sender",
      description: "Send mass emails to members with a click",
      gradient: "from-green-500 to-emerald-500",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
      link: "/dashboard/email-sender", // added link
    },
    {
      icon: Star,
      title: "Featured Event",
      description: "Manage the featured event",
      gradient: "from-yellow-500 to-orange-500",
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
      link: "/dashboard/featured-event",
    },
    {
      icon: Presentation,
      title: "Recent Events",
      description: "Manage the recent Events",
      gradient: "from-red-500 to-rose-500",
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
      link: "/dashboard/recentEvents",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="w-[90%] mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Welcome Admin 👋
            </h1>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl">
            Use the sidebar to navigate between different sections of your
            dashboard.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link key={index} href={card.link} className="group relative">
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer overflow-hidden">
                {/* Animated Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className={`${card.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <card.icon className={`w-7 h-7 ${card.iconColor}`} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {card.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {card.description}
                  </p>

                  {/* Arrow Indicator */}
                  <div className="mt-4 flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                    <span className="text-sm font-medium">Explore</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
}
