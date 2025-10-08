"use client";
import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  User,
  Phone,
  Home,
  Facebook,
  Send,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function FormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    niveau: "",
    membership: "",
    groupName: "",
    address: "",
    facebook: "",
    payNow: "",
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
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      toast.success("Form submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        niveau: "",
        membership: "",
        groupName: "",
        address: "",
        facebook: "",
        payNow: "",
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 relative overflow-hidden">
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"
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
                  Membership Form
                </h1>
                <p className="text-purple-200 text-sm">
                  Please fill out the form below to complete your registration.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["firstName", "lastName"].map((field, idx) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-white mb-2">
                        {field === "firstName" ? "First Name" : "Last Name"}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                        <input
                          type="text"
                          name={field}
                          value={formData[field]}
                          onChange={handleInputChange}
                          required
                          placeholder={`Enter your ${
                            field === "firstName" ? "first" : "last"
                          } name`}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Email */}
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
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>
                </div>

                {/* Phone */}
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
                      placeholder="Enter your phone number"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>
                </div>

                {/* Niveau d'étude */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Niveau d'étude
                  </label>
                  <div className="grid grid-cols-2 gap-3 text-white text-sm">
                    {[
                      "P-LSI",
                      "D-LSI",
                      "T-LSI",
                      "P-IIM",
                      "P-IITM",
                      "D-IITM",
                      "T-IITM",
                      "MASTER",
                      "OTHER UNI",
                    ].map((n) => (
                      <label
                        key={n}
                        className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded-lg border border-white/20 cursor-pointer hover:bg-white/10"
                      >
                        <input
                          type="radio"
                          name="niveau"
                          value={n}
                          checked={formData.niveau === n}
                          onChange={handleInputChange}
                          className="text-purple-400 focus:ring-purple-500"
                          required
                        />
                        <span>{n}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Membership Type */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Membership Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-white text-sm">
                    {[
                      "New members",
                      "Renewing members",
                      "Group of members",
                    ].map((m) => (
                      <label
                        key={m}
                        className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded-lg border border-white/20 cursor-pointer hover:bg-white/10"
                      >
                        <input
                          type="radio"
                          name="membership"
                          value={m}
                          checked={formData.membership === m}
                          onChange={handleInputChange}
                          className="text-purple-400 focus:ring-purple-500"
                          required
                        />
                        <span>{m}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Group Name */}
                {formData.membership === "Group of members" && (
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Group's Name
                    </label>
                    <input
                      type="text"
                      name="groupName"
                      value={formData.groupName}
                      onChange={handleInputChange}
                      placeholder="Enter your group's name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>
                )}

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Home Address
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>
                </div>

                {/* Facebook */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Facebook Profile Link
                  </label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                    <input
                      type="url"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      placeholder="Enter your Facebook profile link"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>
                </div>

                {/* Pay Now */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Pay Now?
                  </label>
                  <div className="flex gap-4 text-white text-sm">
                    {["Yes", "No"].map((p) => (
                      <label
                        key={p}
                        className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded-lg border border-white/20 cursor-pointer hover:bg-white/10"
                      >
                        <input
                          type="radio"
                          name="payNow"
                          value={p}
                          checked={formData.payNow === p}
                          onChange={handleInputChange}
                          className="text-purple-400 focus:ring-purple-500"
                          required
                        />
                        <span>{p}</span>
                      </label>
                    ))}
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
                      Submit Form
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="text-center text-purple-300/70 text-sm mt-6">
              Your information is confidential and will only be used for
              membership purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
