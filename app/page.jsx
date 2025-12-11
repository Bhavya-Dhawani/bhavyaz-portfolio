import Footer from '@/components/gloabls/Footer';
import Navbar from '@/components/gloabls/Navbar'
import About from '@/components/home/About';
import Contact from '@/components/home/Contact';
import Hero from '@/components/home/Hero';
import Myself from '@/components/home/Myself';
import Projects from '@/components/home/Projects';
import Technologies from '@/components/home/Technologies';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Myself />
      <Technologies />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default page
