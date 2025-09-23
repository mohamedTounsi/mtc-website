"use client";
import { useEffect } from "react";
import Starfield from "react-starfield";

import Hero from "./Hero/hero";
import Department from "./Department/Department";
import { AboutUs, Benefits, History } from "./about-us/Aboutus";
import Admin from "./administration/Admin";
import Video from "./components/Video";
import Footer from "./footer/Footer";
import ContactUs from "./contact/ContactUs";
import Gallery from "./gallery/Gallery";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Starfield starCount={1} starColor={[255, 255, 255]} speedFactor={0.1} />
      <Hero />
      <History />
      <AboutUs />
      <Benefits />
      <Department />
      <Admin />
      <Gallery />
      <ContactUs />
      <Video />
      <Footer />
    </div>
  );
}
