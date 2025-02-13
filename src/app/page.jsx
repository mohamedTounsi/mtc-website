"use client";
import Hero from './Hero/hero';
import Department from './Department/Department';
import Starfield from 'react-starfield';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <Starfield
          starCount={3500}
          starColor={[255, 255, 255]}
          speedFactor={0.1}
        />
      <Hero />
      <Department />
    </div>
  );
}
