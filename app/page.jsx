import Navbar from '@/components/gloabls/Navbar'
import About from '@/components/home/About'
import Hero from '@/components/home/Hero'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
    </div>
  )
}

export default page
