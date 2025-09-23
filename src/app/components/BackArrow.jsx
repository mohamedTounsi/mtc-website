"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function BackArrow() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const section = document.getElementById("departments");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const section = document.getElementById("departments");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-6 left-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 z-[9999]"
    >
      <ArrowLeft className="w-6 h-6 text-white" />
    </button>
  );
}
