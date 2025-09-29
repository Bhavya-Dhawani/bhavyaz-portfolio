// app/page.jsx
import React from "react";
import GlowBUtton from "@/ui/GlowBUtton";

export default function Home() {
  return (
    <main className="landing-page">
      <div className="landing-content">
        {/* <h1>Hello, I&apos;m Bhavya</h1>
        <h2>Full Stack Developer | React | Node.js | PHP</h2>
        <div className="btn-group">
          <button className="btn">View Projects</button>
          <button className="btn">Contact Me</button>
        </div> */}
          <GlowBUtton> Hello this is button </GlowBUtton>
      </div>
    </main>
  );
}
 