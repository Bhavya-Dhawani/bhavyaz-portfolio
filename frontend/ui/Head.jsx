"use client";
import React, { useRef } from "react";
import styles from "@/css/ui/Head.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Head = ({ children }) => {
  const containerRef = useRef(null);
  const { contextSafe } = useGSAP();

  useGSAP(() => {
    const el = containerRef.current;
    const spans = el.querySelectorAll("span");

    // Set initial state - invisible
    gsap.set(spans, { y: 30, opacity: 0 });

    // Check if mobile and if trigger point is already reached
    const isMobile = window.innerWidth <= 768;
    const triggerPosition = el.getBoundingClientRect().top;
    const triggerThreshold = window.innerHeight * 0.83;
    const isAlreadyInView = triggerPosition < triggerThreshold;
    
    // If mobile and already in view, use delayed animation without ScrollTrigger
    if (isMobile && isAlreadyInView) {
      gsap.to(spans, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.07,
        ease: "power3.out",
        delay: 2, // 2 second delay for mobile
      });
    } else {
      // Normal ScrollTrigger animation
      const headTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          invalidateOnRefresh: true,
          toggleActions: "play none none none",
          refreshPriority: 1,
        },
      });

      headTimeline.to(spans, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.07,
        ease: "power3.out",
      });
    }
  }, []);

  const handleMouseEnter = contextSafe((e) => {
    gsap.to(e.target, {
      y: "-0.2rem",
      color: "#555",
      duration: 0.3,
      ease: "power1.out",
    });
  });

  const handleMouseLeave = contextSafe((e) => {
    gsap.to(e.target, {
      y: 0,
      color: "#f1f5f9",
      duration: 0.3,
      ease: "power1.inOut",
    });
  });

  return (
    <div ref={containerRef} className={styles.head}>
      {children.split("").map((char, i) => (
        <span
          key={i}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={char === " " ? styles.space : ""}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default Head;