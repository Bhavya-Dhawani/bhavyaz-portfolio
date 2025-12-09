"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import styles from "@/css/components/home/Hero.module.css";
import Button from "@/ui/Button";

const Hero = () => {
  const cursorRef = useRef(null);
  const blobRef = useRef(null);
  const threeContainerRef = useRef(null);

  useEffect(() => {
    cursorRef.current = document.querySelector(".cursor");

    const blob = blobRef.current;
    if (!blob) return;

    gsap.timeline({ repeat: -1, repeatRefresh: true }).to(blob, {
      duration: 2,
      ease: "power2.inOut",
      borderRadius: () => {
        const r = () => 20 + Math.random() * 81;
        return `${r()}% ${r()}% ${r()}% ${r()}%`;
      },
    });

    const container = threeContainerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(2, 2, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    const modelRef = { current: null };
    const mouseRef = { current: { x: 0, y: 0 } };

    const updateModelScale = () => {
      if (!container || !modelRef.current) return;
      const w = container.clientWidth;

      const baseWidth = 1200;
      let scale = (w / baseWidth) * 0.07;

      scale = THREE.MathUtils.clamp(scale, 0.08, 0.1);

      modelRef.current.scale.set(scale, scale, scale);
    };

    const loader = new GLTFLoader();
    loader.load(
      "/models/laptop/scene.gltf",
      (gltf) => {
        const model = gltf.scene;

        modelRef.current = model;

        model.position.set(0, -0.5, 0);
        model.rotation.y = Math.PI / 8;
        updateModelScale();

        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      updateModelScale();
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.x = normX;
      mouseRef.current.y = normY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const baseCam = { x: 0, y: 1.8, z: 4 };

    const animate = () => {
      requestAnimationFrame(animate);

      const targetX = baseCam.x + mouseRef.current.x * 1.2;
      const targetY = baseCam.y + mouseRef.current.y * 0.8;

      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        targetX,
        0.05
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        targetY,
        0.05
      );
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        baseCam.z,
        0.05
      );

      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className={styles.hero}>
      {/* <div ref={threeContainerRef} className={styles.modelLeft}></div> */}

      <div className={styles.light1}></div>
      <div className={styles.light2}></div>

      {/* <div ref={blobRef} className={styles.blob} /> */}

      <div className={styles.view1}>
        <h1
          className={styles.heroText}
          onMouseEnter={() => { cursorRef.current?.classList.add("text"); cursorRef.current?.classList.remove("hide") }}
          onMouseLeave={() => { cursorRef.current?.classList.remove("text"); cursorRef.current?.classList.add("hide") }}
        >
          I Only <span className={styles.color}>Create</span> Something That <span className={styles.font}>Really</span> Matters
        </h1>
        <Button children={"Design Your Next Move"} />
      </div>
    </section>
  );
};

export default Hero;
