"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import styles from "@/css/components/home/Hero.module.css";
import Button from "@/ui/Button";
import ParallaxScroll from "@/utils/ParallelXScroll";

export default function Hero() {
  const cursorRef = useRef(null);
  const firstPartRef = useRef(null);
  const restRef = useRef(null);
  const btnWrapRef = useRef(null);
  const btnRef = useRef(null);
  const statsRefs = useRef([]);
  const statsContainerRef = useRef(null);

  useEffect(() => {
    cursorRef.current = document.querySelector(".cursor");
  }, []);

  useEffect(() => {
    const el = firstPartRef.current;
    if (!el) return;

    el.style.opacity = "1";

    const text = "I Only ";
    let i = 0;
    const speed = 90;
    const blinkRate = 800;

    el.classList.add(styles.typingCursor);
    const blink = () => el.classList.toggle(styles.cursorVisible);
    const blinkInterval = setInterval(blink, blinkRate);

    const typer = setInterval(() => {
      i++;
      const partial = text.slice(0, i);
      el.innerHTML = `${partial}<span class="${styles.color}">Create</span>`;

      if (i >= text.length) {
        clearInterval(typer);
        clearInterval(blinkInterval);

        el.classList.remove(styles.typingCursor);
        el.classList.remove(styles.cursorVisible);

        gsap.to(el, { opacity: 1, duration: 0.35 });

        gsap.to(statsContainerRef.current, { opacity: 1, duration: 0.02, delay: 0.2 });

        gsap.fromTo(
          restRef.current,
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", delay: 0.35 }
        );

        gsap.fromTo(
          btnWrapRef.current,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.55,
            onComplete: () => {
              if (btnRef.current) {
                gsap.to(btnRef.current, {
                  opacity: 1,
                  duration: 0.4,
                  ease: "power2.out",
                });
              }
            },
          }
        );

        gsap.from(statsRefs.current, {
          y: 28,
          opacity: 0,
          stagger: 0.18,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.75,
        });
      }
    }, speed);

    return () => {
      clearInterval(typer);
      clearInterval(blinkInterval);
    };
  }, []);

  const addStatRef = (el) => {
    if (el && !statsRefs.current.includes(el)) statsRefs.current.push(el);
  };

  return (
    <>
      <ParallaxScroll />
      <div className={styles.light3}></div>

      <section className={styles.hero} id="home">
        <div className={styles.light1}></div>
        <div className={styles.light2}></div>

        <div></div>

        <div className={styles.view1}>
          <h1
            className={styles.heroText}
            onMouseEnter={() => {
              cursorRef.current?.classList.add("text");
              cursorRef.current?.classList.remove("hide");
            }}
            onMouseLeave={() => {
              cursorRef.current?.classList.remove("text");
              cursorRef.current?.classList.add("hide");
            }}
          >
            <span ref={firstPartRef} className={styles.firstPart} aria-hidden="false"></span>

            <span ref={restRef} className={styles.rest} aria-hidden="false">
              {" Something That "}
              <span className={styles.font}>Really</span>
              {" Matters"}
            </span>
          </h1>

          <div ref={btnWrapRef} className={styles.btnWrap}>
            <Button ref={btnRef}>Design Your Next Move</Button>
          </div>
        </div>

        <div className={styles.stats} ref={statsContainerRef}>
          <div data-scroll-speed="-0.07" className={styles.stat} ref={addStatRef}>
            <span className={styles.count}>100%</span>
            <span className={styles.detail}>SEO on websites</span>
          </div>
          <div data-scroll-speed="-0.05" className={styles.stat} ref={addStatRef}>
            <span className={styles.count}>15+</span>
            <span className={styles.detail}>Technologies Known</span>
          </div>
          <div data-scroll-speed="-0.07" className={styles.stat} ref={addStatRef}>
            <span className={styles.count}>2x</span>
            <span className={styles.detail}>Faster Websites</span>
          </div>
        </div>
      </section>
    </>
  );
}
