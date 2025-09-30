"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const PageTransition = () => {
    const router = useRouter();

    useEffect(()=>{
        console.log(router)
    },[router.pathname])

  return (
    <div>
      
    </div>
  )
}

export default PageTransition
