// app/page.jsx
import React from "react";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/globals/Navbar";
import Journey from "@/components/home/Journey";
import TechStack from "@/components/home/TechStack";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <Journey></Journey>
      <TechStack></TechStack>
    </div>
  );
}
 