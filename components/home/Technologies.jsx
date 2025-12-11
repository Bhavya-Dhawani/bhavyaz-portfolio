"use client";
import React, { useEffect, useRef, useCallback } from "react";
import styles from "@/css/components/home/Technologies.module.css";
import ai from "@/assets/svg/ai.svg";
import arduino from "@/assets/svg/arduino.svg";
import clang from "@/assets/svg/clang.svg";
import css3 from "@/assets/svg/css-3.svg";
import gsapLogo from "@/assets/svg/gsap.svg";
import html5 from "@/assets/svg/html-5.svg";
import js from "@/assets/svg/js.svg";
import logo from "@/assets/svg/logo.svg";
import mongodb from "@/assets/svg/mongodb.svg";
import mysql from "@/assets/svg/mysql.svg";
import nextjs from "@/assets/svg/nextjs.svg";
import nodejs from "@/assets/svg/node-js.svg";
import php from "@/assets/svg/php.svg";
import python from "@/assets/svg/python.svg";
import react from "@/assets/svg/react.svg";
import threejs from "@/assets/svg/Three.js.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const logos = [
  ai, arduino, clang, css3, gsapLogo, html5, js, logo,
  mongodb, mysql, nextjs, nodejs, php, python, react, threejs
];

export default function Technologies() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const gridRef = useRef(null);
  const originalD = useRef("M 50 100 Q 500 100 950 100");
  const rafRef = useRef(null);

  const addToRefs = useCallback((el) => {
    if (el && !itemsRef.current.includes(el)) itemsRef.current.push(el);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 0.6,
          pin: true,
        },
      });

      tl.from(itemsRef.current, {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      }).to(
        itemsRef.current,
        {
          scale: 0.9,
          opacity: 0.6,
          stagger: 0.02,
          duration: 0.6,
        },
        "+=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const adjustLine = () => {
      if (!gridRef.current || !svgRef.current || !containerRef.current) return;
      const gridRect = gridRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const offset = 40;
      const y = gridRect.bottom - containerRect.top + offset;
      svgRef.current.style.top = `${y}px`;
    };

    adjustLine();
    window.addEventListener("resize", adjustLine);
    return () => window.removeEventListener("resize", adjustLine);
  }, []);

  useEffect(() => {
    const pathEl = pathRef.current;
    if (pathEl) originalD.current = pathEl.getAttribute("d") || originalD.current;
  }, []);

  const mapRange = (inMin, inMax, outMin, outMax, value) =>
    outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);

  const handleMouseMove = (e) => {
    const svgEl = svgRef.current;
    const pathEl = pathRef.current;
    if (!svgEl || !pathEl) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const rect = svgEl.getBoundingClientRect();
    const localX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const localY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    const cx = Math.round(mapRange(0, rect.width, 150, 850, localX));
    const cy = Math.round(mapRange(0, rect.height, 40, 180, localY));
    const newD = `M 50 100 Q ${cx} ${cy} 950 100`;

    rafRef.current = requestAnimationFrame(() => {
      gsap.to(pathEl, {
        attr: { d: newD },
        duration: 0.25,
        ease: "power2.out",
      });
    });
  };

  const handleMouseLeave = () => {
    const pathEl = pathRef.current;
    if (!pathEl) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    gsap.to(pathEl, {
      attr: { d: originalD.current },
      duration: 1.2,
      ease: "elastic.out(1, 0.2)",
    });
  };

  return (
    <section className={styles.tech} ref={containerRef} id="tech">
      <h1 className={styles.head}>
        Things I am <span className={styles.color}>Good</span> at.
      </h1>

      <div className={styles.grid} ref={gridRef}>
        {logos.map((src, i) => (
          <Image
            key={i}
            ref={addToRefs}
            src={src}
            alt="logo"
            className={styles.icon}
            draggable="false"
          />
        ))}
      </div>

      {/* <div
        className={styles.svg}
        ref={svgRef}
        style={{ pointerEvents: "auto" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none">
          <path
            ref={pathRef}
            d={originalD.current}
            stroke="white"
            strokeWidth="4"
            fill="transparent"
            strokeLinecap="round"
          />
        </svg>
      </div> */}
    </section>
  );
}
