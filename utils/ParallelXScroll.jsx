"use client";
import React, { useEffect, useRef } from "react";

export default function ParallaxScroll() {
  const itemsRef = useRef([]);
  const rafRef = useRef(null);
  const ioRef = useRef(null);

  useEffect(() => {
    const isMobileDevice = () => {
      if (typeof window === "undefined") return false;
      const ua = navigator.userAgent || "";
      const smallScreen = window.innerWidth <= 768; // change breakpoint if you want
      const coarsePointer =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches;
      const uaMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
      return uaMobile || coarsePointer || smallScreen;
    };

    const getLenisFromWindow = () =>
      (typeof window !== "undefined" &&
        (window.lenis ||
          window.__lenis ||
          (typeof window.getLenis === "function" && window.getLenis()))) ||
      null;

    const els = Array.from(document.querySelectorAll("[data-scroll-speed]"));
    // Early: if mobile, remove any transform and do nothing else
    if (isMobileDevice()) {
      els.forEach((el) => {
        el.style.transform = "";
      });
      // make sure cleanup isn't trying to cancel anything that was never started
      return () => {
        els.forEach((el) => {
          el.style.transform = "";
        });
      };
    }

    // --- desktop behavior (unchanged logic, copied from your original) ---
    itemsRef.current = els.map((el) => {
      const speed = parseFloat(el.getAttribute("data-scroll-speed")) || 0;
      const direction = el.getAttribute("data-scroll-direction") || "vertical";
      return {
        el,
        speed,
        direction,
        bounds: null,
        visible: false,
        entered: false,
        extra: 1,
        initialRelative: 0,
      };
    });

    const statsParents = new Map();
    itemsRef.current.forEach((item) => {
      const p = item.el.parentElement;
      if (!p) return;
      if (!statsParents.has(p)) statsParents.set(p, []);
      statsParents.get(p).push(item);
    });
    statsParents.forEach((arr) => {
      const mid = Math.floor(arr.length / 2);
      arr.forEach((it, idx) => {
        it.extra = idx === mid ? 1.6 : 1;
      });
    });

    const onIntersection = (entries) => {
      const docTop = window.scrollY || window.pageYOffset;
      const wh = window.innerHeight;
      entries.forEach((entry) => {
        const item = itemsRef.current.find((i) => i.el === entry.target);
        if (!item) return;
        if (entry.isIntersecting) {
          item.visible = true;
          if (!item.entered) {
            const r = item.el.getBoundingClientRect();
            const top = r.top + docTop;
            const height = r.height;
            item.bounds = { top, height };
            item.initialRelative = (docTop + wh / 2) - (top + height / 2);
            item.entered = true;
          }
        } else {
          item.visible = false;
        }
      });
    };

    ioRef.current = new IntersectionObserver(onIntersection, { threshold: 0 });
    itemsRef.current.forEach((i) => ioRef.current.observe(i.el));

    const updateBounds = () => {
      const docTop = window.scrollY || window.pageYOffset;
      const wh = window.innerHeight;
      itemsRef.current.forEach((i) => {
        const r = i.el.getBoundingClientRect();
        const top = r.top + docTop;
        const height = r.height;
        i.bounds = { top, height };
        if (i.entered) {
          i.initialRelative = (docTop + wh / 2) - (top + height / 2);
        }
      });
    };

    window.addEventListener("resize", updateBounds);

    const loop = () => {
      const lenisInstance = getLenisFromWindow();
      const scrollY =
        lenisInstance && typeof lenisInstance.scroll === "number"
          ? lenisInstance.scroll
          : window.scrollY || window.pageYOffset;
      const wh = window.innerHeight;
      itemsRef.current.forEach((item) => {
        if (!item.bounds || !item.entered || !item.visible) return;
        const currentRelative =
          scrollY + wh / 2 - (item.bounds.top + item.bounds.height / 2);
        const delta = currentRelative - item.initialRelative;
        const move = delta * item.speed * item.extra;
        if (item.direction === "horizontal") {
          item.el.style.transform = `translate3d(${move}px,0,0)`;
        } else {
          item.el.style.transform = `translate3d(0,${move}px,0)`;
        }
      });
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (ioRef.current) ioRef.current.disconnect();
      window.removeEventListener("resize", updateBounds);
      itemsRef.current.forEach((item) => {
        if (item && item.el) item.el.style.transform = "";
      });
    };
  }, []);

  return null;
}
