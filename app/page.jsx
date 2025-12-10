import Navbar from '@/components/gloabls/Navbar'
import About from '@/components/home/About'
import Hero from '@/components/home/Hero'
import Myself from '@/components/home/Myself'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Myself />
    </div>
  )
}

export default page
