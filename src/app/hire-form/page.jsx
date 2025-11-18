"use client";
import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  User,
  Phone,
  Briefcase,
  MessageSquare,
  Send,
  Facebook,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function HireForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resumeUrl: "",
    message: "",
    facebook:"",
    wantToPay: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/hireform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      toast.success("Application submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        resumeUrl: "",
        message: "",
        facebook:"",
        wantToPay: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("❌ Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoHome = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-900 relative overflow-hidden">
      <Toaster position="top-right" />

      {/* Background dots */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='0' cy='0' r='1'/%3E%3Ccircle cx='60' cy='0' r='1'/%3E%3Ccircle cx='0' cy='60' r='1'/%3E%3Ccircle cx='60' cy='60' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-700 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Back button */}
        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
          >
            <ArrowLeft className="w-6 h-6 text-white group-hover:text-purple-200" />
          </button>
        </div>

        <div className="flex items-center justify-center min-h-screen px-4 py-20">
          <div className="w-full max-w-2xl">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="px-8 py-6 bg-gradient-to-r from-purple-600/20 to-purple-400/20 border-b border-white/10">
                <h1 className="text-2xl font-bold text-white mb-2">
                  Join Our Team
                </h1>
                <p className="text-purple-200 text-sm">
                  We're looking for talented individuals. Apply now to become
                  part of our growing team.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Phone Number"
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Facebook Profile
                  </label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                    <input
                      type="text"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your Facebook profile URL"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Desired Position
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 appearance-none"
                    >
                      <option className="text-zinc-800" disabled value="">
                        Select a position
                      </option>
                      <option className="text-zinc-800">HR Manager</option>
                      <option className="text-zinc-800">
                        Logistics and Planning Assistant
                      </option>
                      <option className="text-zinc-800">Developer</option>
                      <option className="text-zinc-800">Videomaker</option>
                      <option className="text-zinc-800">
                        Graphic Designer
                      </option>
                      <option className="text-zinc-800">
                        Sponsoring Manager
                      </option>
                      <option className="text-zinc-800">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Tell Us About Yourself
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-purple-300" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Why would you be a great fit for this position?"
                      rows="5"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none"
                    />
                  </div>
                </div>

                

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-600 focus:ring-2 focus:ring-purple-500/50 transition-all transform hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="text-center text-purple-300/70 text-sm mt-6">
              Your application is confidential and will only be used for
              recruitment purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
