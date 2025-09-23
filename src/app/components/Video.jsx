"use client";

export default function Video() {
  return (
    <div className="w-full h-[70vh] overflow-hidden">
      <video
        src="/mtcvid.mp4"
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}
