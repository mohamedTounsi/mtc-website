"use client";
import { useEffect, useState } from "react";

import Hero from "./Hero/hero";
import Department from "./Department/Department";
import { AboutUs, Benefits, History } from "./about-us/Aboutus";
import Admin from "./administration/Admin";
import Video from "./components/Video";
import Footer from "./footer/Footer";
import ContactUs from "./contact/ContactUs";
import Gallery from "./gallery/Gallery";
import Events from "./Events/Events";
import WeAreHiring from "./components/WeAreHiring";

export default function Home() {
  const [isHiringOpen, setIsHiringOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchHiringStatus = async () => {
      try {
        const res = await fetch("/api/settings/hiring");
        const data = await res.json();
        console.log('a');
        setIsHiringOpen(data.isOpen);
      } catch (err) {
        console.error("Failed to fetch hiring status", err);
      }
    };
    fetchHiringStatus();
  }, []);

  return (
    <div>
      <Hero />
      {isHiringOpen && <WeAreHiring isOpen={true} />}
      <History />
      <AboutUs />
      <Benefits />
      <Events />
      <Department />
      <Admin />
      <Gallery />
      <ContactUs />
      <Video />
      <Footer />
    </div>
  );
}
