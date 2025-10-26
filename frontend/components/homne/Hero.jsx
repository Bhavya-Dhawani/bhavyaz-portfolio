"use client";
import React, { useRef, useEffect } from "react";
import styles from "@/css/components/home/Hero.module.css";
import Image from "next/image";
import myImage from "@/assets/images/myimgnobg.png";
import { timeline } from "@/gsap/Maintimeline";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const wrapperRef = useRef(null);
  const extraRef = useRef(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const el = extraRef.current;
    const texts = wrapper.querySelectorAll(`.${styles.text}`);

    const heroTL = gsap.timeline();

    heroTL
      .from(`.${styles.hero} h2 span`, { y: 20, opacity: 0, duration: 0.25, stagger: 0.05 })
      .from(`.${styles.hero} h1 span`, { y: 20, opacity: 0, duration: 0.25, stagger: 0.05 })
      .from(`.${styles.myImage}`, { opacity: 0, duration: 0.5 }, "-=0.5")
      .from(`.${styles.extraDetails}`, { opacity: 0, y: 30, duration: 0.3 });

    const lineHeight = parseFloat(getComputedStyle(texts[0]).lineHeight) || 60;
    const loopTL = gsap.timeline({ repeat: -1, defaults: { duration: 1, ease: "power2.inOut" } });

    for (let i = 1; i < texts.length; i++) {
      loopTL.to(wrapper, {
        y: -lineHeight * i,
        delay: 1,
        onStart: () => {
          const currentText = texts[i];
          gsap.fromTo(
            currentText.querySelectorAll("span"),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: "power2.out" }
          );
        },
      });
    }

    // heroTL.add(loopTL, "+=0.3");
    timeline.add(heroTL);

    const onEnter = () => loopTL.pause();
    const onLeave = () => loopTL.resume();

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      loopTL.kill();
    };
  });

  return (
    <div className={styles.hero}>
      <h2>
        {"Hi, I am".split("").map((ch, i) => (
          <span key={i} className={ch === " " ? styles.space : ""}>
            {ch}
          </span>
        ))}
      </h2>
      <h1>
        {"Bhavya Dhanwani".split("").map((ch, i) => (
          <span key={i} className={ch === " " ? styles.space : ""}>
            {ch}
          </span>
        ))}
      </h1>

      <div className={styles.myImagecont}>
        <Image className={styles.myImage} alt="My Image" src={myImage} />
      </div>

      <div className={styles.extraDetails} ref={extraRef}>
        <div className={styles.header}>I Create</div>

        {/* Animation container */}
        <div className={styles.textAnim}>
          <div className={styles.textContainer}>
            <div className={styles.textWrapper} ref={wrapperRef}>
              {[
                "Art with purpose",
                "Ideas that connect",
                "Impactful web products",
                "Art with purpose",
              ].map((line, i) => (
                <span key={i} className={styles.text}>
                  {line.split("").map((ch, j) => (
                    <span key={j} className={ch === " " ? styles.space : ""}>
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;
