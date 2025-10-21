"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import TechImg from "@/assets/images/3dnobg.png";
import styles from "@/css/components/home/TechStack.module.css";

// Images for smallest orbit
import python from '@/assets/svg/python.svg';
import ai from '@/assets/svg/ai.svg';
import arduino from '@/assets/svg/arduino.svg';
import clang from '@/assets/svg/clang.svg';

// Images for medium orbit
import html from '@/assets/svg/html-5.svg';
import css from '@/assets/svg/css-3.svg';
import js from '@/assets/svg/js.svg';
import php from '@/assets/svg/php.svg';

//Images for large orbit 
import next from '@/assets/svg/nextjs.svg';
import mysql from '@/assets/svg/mysql.svg';
import mongodb from '@/assets/svg/mongodb.svg';
import react from '@/assets/svg/react.svg';
import node from '@/assets/svg/node-js.svg';

const TechStack = () => {

  const smallOrbit = [python, ai, clang, arduino];
  const medOrbit = [html, css, js, php];
  const largeOrbit = [next, mysql, react, mongodb, node]
  const smallRef = useRef(null);
  const medRef = useRef(null);
  const largeRef = useRef(null);
  const [smallRadius, setSmallRadius] = useState(0);
  const [medRadius, setMedRadius] = useState(0);
  const [largeRadius, setLargeRadius] = useState(0);

  // Small orbit 
  useEffect(() => {
    const updateRadius = () => {
      if (smallRef.current) {
        const { offsetWidth } = smallRef.current;
        setSmallRadius(offsetWidth / 2);
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);

    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Medium orbit 
  useEffect(() => {
    const updateRadius = () => {
      if (medRef.current) {
        const { offsetWidth } = medRef.current;
        setMedRadius(offsetWidth / 2);
      }
    };

    updateRadius(); // initial measure
    window.addEventListener("resize", updateRadius);

    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // large orbit 
  useEffect(() => {
    const updateRadius = () => {
      if (largeRef.current) {
        const { offsetWidth } = largeRef.current;
        setLargeRadius(offsetWidth / 2);
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);

    return () => window.removeEventListener("resize", updateRadius);
  }, []);


  return (
    <section className={styles.techStack}>
      <h2 className={styles.title}>My Tech Stack</h2>
      <div className={styles.imageWrapper}>
        <div ref={smallRef} className={styles.orbit}>
          {smallOrbit.map((ele, i) => {
            const total = smallOrbit.length;
            const angle = (2 * Math.PI * i) / total;
            const x = Math.cos(angle) * smallRadius;
            const y = Math.sin(angle) * smallRadius;

            return (
              <div
                key={i}
                className={styles.orbitItem}
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  width: `${50}px`,
                  height: `${50}px`,
                }}
              >
                <Image
                  src={ele}
                  alt={`Small orbit image ${i}`}
                  className={styles.smallImg}
                  width={50}
                  height={50}
                />
              </div>
            );
          })}
        </div>
        <div ref={medRef} className={styles.orbit}>
          {medOrbit.map((ele, i) => {
            const total = medOrbit.length;
            const angle = (2 * Math.PI * i) / total;
            const x = Math.cos(angle) * medRadius;
            const y = Math.sin(angle) * medRadius;

            return (
              <div
                key={i}
                className={styles.orbitItem}
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  width: `${50}px`,
                  height: `${50}px`,
                }}
              >
                <Image
                  src={ele}
                  alt={`Small orbit image ${i}`}
                  className={styles.medImg}
                  width={50}
                  height={50}
                />
              </div>
            );
          })}
        </div>
        <div ref={largeRef} className={styles.orbit}>
          {largeOrbit.map((ele, i) => {
            const total = largeOrbit.length;
            const angle = (2 * Math.PI * i) / total;
            const x = Math.cos(angle) * largeRadius;
            const y = Math.sin(angle) * largeRadius;

            return (
              <div
                key={i}
                className={styles.orbitItem}
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  width: `${50}px`,
                  height: `${50}px`,
                }}
              >
                <Image
                  src={ele}
                  alt={`Small orbit image ${i}`}
                  className={styles.largeImg}
                  width={50}
                  height={50}
                />
              </div>
            );
          })}
        </div>
        <Image src={TechImg} alt="Tech Stack" className={styles.techImage} />
      </div>
    </section>
  );
};

export default TechStack;
