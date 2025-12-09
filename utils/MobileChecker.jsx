"use client";
import { useEffect, useState } from "react";

export default function useRealMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() {
      const ua = navigator.userAgent || navigator.vendor || window.opera;

      const realMobile =
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(ua) ||
        navigator.maxTouchPoints > 0;

      setIsMobile(realMobile);
    }

    check();
  }, []);

  return isMobile;
}
