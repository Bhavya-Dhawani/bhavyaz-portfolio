// app/page.jsx
import React from "react";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/globals/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
    </div>
  );
}
 