"use client";
import { createContext, useRef, useEffect } from "react";
import gsap from "gsap";
import useRealMobile from "@/utils/MobileChecker";
import * as THREE from 'three';

export const CursorContext = createContext();

export default function CursorProvider({ children }) {
  const cursorRef = useRef(null);
  const isMobile = useRealMobile();

  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isMobile]);

  return (
    <CursorContext.Provider value={cursorRef}>
      {!isMobile && <div ref={cursorRef} className="cursor hide" />}
      {children}
    </CursorContext.Provider>
  );
}
