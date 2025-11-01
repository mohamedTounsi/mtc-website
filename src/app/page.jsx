"use client";
import { useEffect } from "react";

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <WeAreHiring />
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
