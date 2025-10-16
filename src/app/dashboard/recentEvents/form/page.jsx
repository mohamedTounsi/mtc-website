"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

// Utility: format date & time for display and DB from datetime-local value
function formatDateTimeLocal(value) {
  const dateObj = new Date(value);
  if (isNaN(dateObj)) return { date: "", time: "" };
  const date = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date, time };
}

export default function RecentEventForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");
  const [formData, setFormData] = useState({
    title: "",
    category: "workshop",
    date: "",
    time: "",
    location: "",
    image: "",
    tags: "",
    description: "",
    attendees: "",
    duration: "",
    difficulty: "Beginner",
    eventTime: "",
  });
  const [uploading, setUploading] = useState(false);
  const isEdit = !!eventId;

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/recentevent/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            ...data,
            tags: data.tags?.join(", ") || "",
            eventTime: data.eventTime
              ? new Date(data.eventTime).toISOString().slice(0, 16)
              : "",
          });
        })
        .catch(() => toast.error("Could not load event"));
    }
    // eslint-disable-next-line
  }, [eventId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );
      if (!res.ok) throw new Error("Cloudinary upload failed");
      const fileData = await res.json();
      setFormData((prev) => ({ ...prev, image: fileData.secure_url }));
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDateTimeChange = (e) => {
    const val = e.target.value;
    const { date, time } = formatDateTimeLocal(val);
    setFormData((prev) => ({
      ...prev,
      date,
      time,
      eventTime: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // REQUIRE IMAGE
    if (!formData.image) {
      toast.error("Please upload an image first");
      return;
    }
    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      attendees: Number(formData.attendees),
      eventTime: new Date(formData.eventTime),
    };
    try {
      const url = isEdit ? `/api/recentevent/${eventId}` : "/api/recentevent";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success(isEdit ? "Event updated!" : "Event added!");
        router.push("/dashboard/recentEvents");
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to submit event");
      }
    } catch (error) {
      toast.error("Error submitting event");
    }
  };

  return (
    <section className="min-h-screen bg-black text-white p-8 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl max-w-lg w-full space-y-4 border border-purple-500/20"
      >
        <h2 className="text-2xl font-bold mb-4">
          {isEdit ? "Edit" : "Add"} Recent Event
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
          required
        />
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
          required
        >
          <option value="workshop">Workshop</option>
          <option value="bootcamp">Bootcamp</option>
          <option value="hackathon">Hackathon</option>
          <option value="talk">Talk</option>
          <option value="other">Other</option>
        </select>
        <input
          type="datetime-local"
          placeholder="Event Date & Time"
          value={formData.eventTime}
          onChange={handleDateTimeChange}
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, location: e.target.value }))
          }
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, tags: e.target.value }))
          }
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
        />
        <input
          type="number"
          placeholder="Attendees"
          value={formData.attendees}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, attendees: e.target.value }))
          }
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
          required
        />
        <input
          type="text"
          placeholder="Duration (e.g., 3 hours)"
          value={formData.duration}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, duration: e.target.value }))
          }
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
          required
        />
        <select
          value={formData.difficulty}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, difficulty: e.target.value }))
          }
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
          required
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Event Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
          />
          {uploading && <p className="text-sm text-purple-400">Uploading...</p>}
          {formData.image && (
            <img
              src={formData.image}
              alt="Uploaded preview"
              className="w-full h-40 object-cover rounded-lg mt-2"
            />
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push("/dashboard/recentEvents")}
            className="bg-gray-700 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
          >
            {isEdit ? "Update Event" : "Add Event"}
          </button>
        </div>
      </form>
    </section>
  );
}
