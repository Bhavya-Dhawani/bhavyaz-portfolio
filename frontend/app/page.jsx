// app/page.jsx
import Navbar from "@/components/global/Navbar";
import Hero from "@/components/homne/Hero";
import Journey from "@/components/homne/Journey";
import Timeline from "@/SubCOmponents/journey/Timeline";
import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Journey />
    </div>
  );
}
 