"use client";

import { useState } from "react";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";

export default function EventFormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send data to your backend API
      const res = await fetch("/api/eventform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to register");

      // Clear form immediately
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });

      // Show toast
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
        <div className="max-w-5xl mx-auto">
          {/* Event Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-t-2xl overflow-hidden shadow-2xl">
            <div className="relative h-64 bg-black">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h1 className=" text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                    Twin Tech Talk
                  </h1>
                  <p className="text-purple-200 text-sm md:text-lg">
                    Press Start To AI
                  </p>
                </div>
              </div>
            </div>

            {/* Event Details Bar */}
            <div className="bg-white/10 backdrop-blur-sm border-t border-white/20">
              <div className="flex flex-wrap justify-center gap-6 py-4 px-6 text-white">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-300" />
                  <span className="font-medium">Oct 8, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-300" />
                  <span className="font-medium">15:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-300" />
                  <span className="font-medium">SC2 ISIMS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white/90 rounded-b-2xl shadow-2xl p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Register Now
              </h2>
              <p className="text-gray-600">
                Secure your spot at the most anticipated tech event of the year
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full text-black bg-white/10 px-4 py-3 border-2 border-gray-500 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full text-black px-4 py-3 border-2 border-gray-500 bg-white/10 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-black px-4 py-3 border-2 border-gray-500 bg-white/10 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full text-black px-4 py-3 border-2 border-gray-500 bg-white/10 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full  bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-purple-900 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? "Submitting..." : "Complete Registration"}
              </button>

              <p className="text-sm text-gray-500 text-center">
                By registering, you agree to receive event updates and
                communications
              </p>
            </form>

            {/* Event Highlights */}
            <div className="mt-12 pt-8 border-t border-gray-500 bg-white/10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What to Expect
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎤</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Keynote Speakers
                  </h4>
                  <p className="text-sm text-gray-600">
                    Industry leaders sharing insights
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Networking
                  </h4>
                  <p className="text-sm text-gray-600">
                    Connect with professionals
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Q&A Panels
                  </h4>
                  <p className="text-sm text-gray-600">
                    Ask experts anything about AI and innovation
                  </p>
                </div>
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
