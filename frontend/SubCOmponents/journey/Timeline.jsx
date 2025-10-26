"use client";
import React, { useRef, useEffect } from "react";
import styles from "@/css/subcomponents/journey/Timeline.module.css";
import journey1 from "@/assets/images/journey1.png";
import journey2 from "@/assets/images/journey2.png";
import journey3 from "@/assets/images/journey3.png";
import journey4 from "@/assets/images/journey4.png";
import journey5 from "@/assets/images/journey5.png";
import journey6 from "@/assets/images/journey6.png";
import Card from "@/ui/Card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);

  const cards = [
    {
      title: "Starting on a Phone",
      image: journey1,
      body: "I began coding on my mother's phone, learning basic HTML, CSS, and JS. Small experiments sparked my passion.",
    },
    {
      title: "First PC",
      image: journey2,
      body: "My parents gifted me a ₹2,000 second-hand PC. I learned advanced HTML, CSS, JS, Python, and responsive design—even with its slow performance.",
    },
    {
      title: "Second PC",
      image: journey3,
      body: "After the first PC broke, I got a better one. I explored React, Next.js, PHP, MySQL, animations, Python apps, and AI projects.",
    },
    {
      title: "First Job & Freelancing",
      image: journey4,
      body: "After 12th, I had my first job with a small salary. Soon, I started freelancing, gaining practical experience and confidence.",
    },
    {
      title: "First Laptop & Hackathons",
      image: journey5,
      body: "I bought my first laptop with my own money (₹90,000). I participated in hackathons, learned a lot, and improved my skills.",
    },
    {
      title: "Today",
      image: journey6,
      body: "From coding on a phone to building web apps, animations, and Python projects, I've grown a lot. This portfolio shows my journey and work.",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const horizontal = horizontalRef.current;

    const setupAnimation = () => {
      // Kill only timeline-related ScrollTriggers
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) {
          st.kill();
        }
      });
      gsap.killTweensOf(horizontal);

      const totalScrollWidth = horizontal.scrollWidth;
      const viewportWidth = window.innerWidth;

      // offset ensures the last card is fully visible
      const extraOffset = viewportWidth * 0.2;

      gsap.to(horizontal, {
        x: () => -(totalScrollWidth - viewportWidth + extraOffset),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScrollWidth - viewportWidth + extraOffset}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          // This prevents interfering with other ScrollTriggers
          anticipatePin: 1,
          // Refresh after other animations settle
          refreshPriority: -1,
        },
      });
    };

    // Delay setup slightly to let other ScrollTriggers initialize first
    const timer = setTimeout(() => {
      setupAnimation();
    }, 100);

    // re-run when resized (for responsive recalculation)
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timer);
      setTimeout(setupAnimation, 100);
    });
    resizeObserver.observe(horizontal);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section className={styles.timelineSection} ref={sectionRef}>
      <div className={styles.timeline} ref={horizontalRef}>
        {cards.map((card, i) => (
          <Card
            key={i}
            src={card.image}
            alt={card.title}
            title={card.title}
            body={card.body}
          />
        ))}
      </div>
    </section>
  );
};

export default Timeline;