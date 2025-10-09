"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddFeaturedEventForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "workshop",
    location: "",
    description: "",
    tags: "",
    eventTime: "",
    image: "",
  });
  const [uploading, setUploading] = useState(false);

  // Upload image to Cloudinary unsigned
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
      setFormData({ ...formData, image: fileData.secure_url });
      toast.success("Image uploaded!");
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("Please upload an image first");
      return;
    }

    try {
      const res = await fetch("/api/featuredevent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Featured event added!");
        router.push("/dashboard/featured-event");
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to add event");
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Error submitting event");
    }
  };

  return (
    <section className="min-h-screen bg-black text-white p-8 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl max-w-lg w-full space-y-4 border border-purple-500/20"
      >
        <h2 className="text-2xl font-bold mb-4">Add Featured Event</h2>

        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
          required
        />

        {/* Category Select */}
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
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
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
          required
        />

        {/* Event Date + Time */}
        <input
          type="datetime-local"
          placeholder="Event Date & Time"
          value={formData.eventTime}
          onChange={(e) =>
            setFormData({ ...formData, eventTime: e.target.value })
          }
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
          required
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
          required
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full p-2 rounded-lg bg-gray-800 border border-purple-500/30"
        />

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
            onClick={() => router.push("/dashboard/featured-event")}
            className="bg-gray-700 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
          >
            Add Event
          </button>
        </div>
      </form>
    </section>
  );
}
