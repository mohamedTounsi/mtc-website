"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";




// Helper Components
const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} *
    </label>
    <input
      type={type}
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      className="w-full text-gray-900 px-4 py-3 border-2 border-gray-300 bg-white rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
      required
    />
  </div>
);

const HighlightCard = ({ emoji, title, desc }) => (
  <div className="text-center p-6 bg-purple-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
      {emoji}
    </div>
    <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

export default function EventFormPage() {
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState("");
  const router = useRouter();

  // Fetch featured event from API with redirect logic
  useEffect(() => {
    const fetchFeaturedEvent = async () => {
      try {
        const res = await fetch("/api/featuredevent");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        if (data && Object.keys(data).length > 0) {
          setFeaturedEvent(data);
          
        } else {
          router.replace("/404");
        }
      } catch (err) {
        console.error("Failed to fetch event:", err);
        router.replace("/404");
      }
    };

    fetchFeaturedEvent();
  }, [router]);



  // Countdown Timer
  useEffect(() => {
    if (!featuredEvent?.eventTime) return;

    const interval = setInterval(() => {
      const eventDate = new Date(featuredEvent.eventTime).getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        setCountdown("Event has started!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [featuredEvent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = { ...formData, eventId: featuredEvent?._id };
      const res = await fetch("/api/eventform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to register");

      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-950">
      {/* Toast Notification */}
      {isSubmitted && (
        <div className="fixed top-6 right-6 bg-purple-700 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-fade-in-out">
          ✓ Registration successful!
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="fixed top-6 left-6 flex items-center gap-2 text-white hover:text-purple-300 transition-colors group z-40"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </button>

      <div className="container mx-auto px-4 py-12 pt-20">
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gray-900/20 backdrop-blur-md">
          {/* Hero Section */}
          <div className="relative h-80 md:h-96 bg-black">
            <img
              src={featuredEvent?.image || "/placeholder-event.jpg"}
              alt="Event"
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700/60 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
                {featuredEvent?.title || "Loading..."}
              </h1>
              <p className="text-purple-200 text-sm md:text-lg mb-4">
                {featuredEvent?.description || ""}
              </p>
              {countdown && (
                <div className="bg-purple-800/70 px-4 py-2 rounded-full text-white font-semibold text-lg shadow-lg">
                  ⏳ {countdown}
                </div>
              )}
            </div>
          </div>

          {/* Event Details Bar */}
          <div className="bg-white/10 backdrop-blur-sm border-t border-white/20 flex flex-wrap justify-center gap-6 py-4 px-6 text-white">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-300" />
              <span className="font-medium">
                {featuredEvent
                  ? new Date(featuredEvent.eventTime).toLocaleDateString([], {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-300" />
              <span className="font-medium">
                {featuredEvent
                  ? new Date(featuredEvent.eventTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "UTC+1",
                    })
                  : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-300" />
              <span className="font-medium">
                {featuredEvent?.location || ""}
              </span>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Register Now
              </h2>
              <p className="text-gray-600">
                Secure your spot at this exciting event!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <InputField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <InputField
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-purple-900 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? "Submitting..." : "Complete Registration"}
              </button>
              
            </form>

            {/* Event Highlights */}
            <div className="mt-12 pt-12 border-t border-gray-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                What to Expect
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <HighlightCard
                  emoji="🎤"
                  title="Keynote Speakers"
                  desc="Industry leaders sharing insights"
                />
                <HighlightCard
                  emoji="🤝"
                  title="Networking"
                  desc="Connect with professionals"
                />
                <HighlightCard
                  emoji="💬"
                  title="Q&A Panels"
                  desc="Ask experts anything about AI and innovation"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-out {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s ease forwards;
        }
      `}</style>
    </div>
  );
}
