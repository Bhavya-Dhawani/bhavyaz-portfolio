"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import styles from "@/css/components/home/About.module.css";
import ParallaxScroll from "@/utils/ParallelXScroll";

export default function About() {
    const [age, setAge] = useState(null);
    const canvasRef = useRef(null);
    const rafRef = useRef(null);
    const modelRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const roRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    const headRef = useRef(null);
    const textRefs = useRef([]);
    const centerRef = useRef(null);

    useEffect(() => {
        const today = new Date();
        const birthDate = new Date(2008, 3, 27);
        let years = today.getFullYear() - birthDate.getFullYear();
        const hasBirthdayPassed =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() &&
                today.getDate() >= birthDate.getDate());
        if (!hasBirthdayPassed) years -= 1;
        setAge(years);

        const canvas = canvasRef.current;
        if (!canvas) return;

        let cancelled = false;
        let scene, camera, renderer, loader, pmremGenerator, model, controls;

        const getScaleForWidth = (w) => {
            if (w < 420) return 0.5;
            if (w < 768) return 0.72;
            if (w < 1200) return 0.9;
            return 1.0;
        };

        (async () => {
            const THREE = await import("three");
            const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader");
            const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls");

            loader = new GLTFLoader();

            scene = new THREE.Scene();
            sceneRef.current = scene;

            const width = Math.max(200, canvas.clientWidth || 400);
            const height = Math.max(200, canvas.clientHeight || 400);

            camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 2000);
            cameraRef.current = camera;

            renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
            });

            renderer.setClearColor(0x000000, 0);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.05;
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(width, height, true);
            rendererRef.current = renderer;

            const hemi = new THREE.HemisphereLight(0xffffff, 0x222222, 0.8);
            scene.add(hemi);

            const key = new THREE.DirectionalLight(0xffffff, 1.0);
            key.position.set(4, 6, 6);
            scene.add(key);

            pmremGenerator = new THREE.PMREMGenerator(renderer);
            pmremGenerator.compileEquirectangularShader();

            const fakeCanvas = document.createElement("canvas");
            fakeCanvas.width = 32;
            fakeCanvas.height = 16;
            const ctx = fakeCanvas.getContext("2d");
            ctx.fillStyle = "#6f8fbf";
            ctx.fillRect(0, 0, 32, 16);
            const gradient = ctx.createLinearGradient(0, 0, 32, 16);
            gradient.addColorStop(0, "#9fb6d6");
            gradient.addColorStop(1, "#3f587f");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 32, 16);

            const tex = new THREE.CanvasTexture(fakeCanvas);
            tex.encoding = THREE.sRGBEncoding;
            const envMap = pmremGenerator.fromEquirectangular(tex).texture;
            scene.environment = envMap;

            tex.dispose?.();
            pmremGenerator.dispose?.();

            const fitModelToView = () => {
                if (!model || !cameraRef.current) return;
                const box = new THREE.Box3().setFromObject(model);
                if (box.isEmpty()) return;

                const size = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);

                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = cameraRef.current.fov * (Math.PI / 180);
                let cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2)) * 1.2;

                if (!isFinite(cameraZ)) cameraZ = 5;

                cameraRef.current.position.set(0, 0, cameraZ);
                cameraRef.current.near = Math.max(0.01, cameraZ / 1000);
                cameraRef.current.far = cameraZ * 100;
                cameraRef.current.updateProjectionMatrix();
                cameraRef.current.lookAt(0, 0, 0);
            };

            loader.load(
                "/models/earth2/scene.gltf",
                (gltf) => {
                    if (cancelled) return;

                    model = gltf.scene || gltf.scenes?.[0];
                    if (!model) return;

                    model.traverse((node) => {
                        if (node.isMesh) {
                            if (node.material?.map) node.material.map.encoding = THREE.sRGBEncoding;
                            if (node.material?.emissiveMap)
                                node.material.emissiveMap.encoding = THREE.sRGBEncoding;
                        }
                    });

                    scene.add(model);
                    modelRef.current = model;

                    fitModelToView();

                    const scale = getScaleForWidth(window.innerWidth || width);
                    model.scale.setScalar(scale);

                    setLoaded(true);
                },
                undefined,
                (err) => console.error("GLTF load error:", err)
            );

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.07;

            controls.enableZoom = false;
            controls.enableRotate = true;
            controls.enablePan = true;

            controls.rotateSpeed = 0.6;
            controls.panSpeed = 0.4;

            const animate = () => {
                rafRef.current = requestAnimationFrame(animate);

                if (modelRef.current) {
                    modelRef.current.rotation.y += 0.002;
                }

                controls.update();
                renderer.render(scene, camera);
            };
            animate();

            const resizeHandler = () => {
                const w = Math.max(1, canvas.clientWidth);
                const h = Math.max(1, canvas.clientHeight);
                const dpr = Math.min(window.devicePixelRatio || 1, 2);

                cameraRef.current.aspect = w / h;
                cameraRef.current.updateProjectionMatrix();

                rendererRef.current.setPixelRatio(dpr);
                rendererRef.current.setSize(w, h, true);

                if (modelRef.current) {
                    const newScale = getScaleForWidth(window.innerWidth || w);
                    modelRef.current.scale.setScalar(newScale);
                    fitModelToView();
                }
            };

            const ro = new ResizeObserver(resizeHandler);
            roRef.current = ro;
            ro.observe(canvas);
            resizeHandler();
        })();

        return () => {
            cancelled = true;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (roRef.current) roRef.current.disconnect();
            rendererRef.current?.dispose?.();
        };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headRef.current, {
                y: -18,
                autoAlpha: 0,
                duration: 0.9,
                ease: "power3.out",
            });

            gsap.from(textRefs.current, {
                y: 18,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.14,
                ease: "power3.out",
                delay: 0.18,
            });

            gsap.from(centerRef.current, {
                scale: 0.98,
                autoAlpha: 0,
                duration: 0.9,
                ease: "power3.out",
                delay: 0.35,
            });
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!loaded) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                canvasRef.current,
                { scale: 0.98, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 0.9, ease: "power3.out" }
            );

            if (modelRef.current) {
                gsap.fromTo(
                    modelRef.current.rotation,
                    { y: modelRef.current.rotation.y - 0.4 },
                    { y: modelRef.current.rotation.y, duration: 0.9, ease: "power3.out" }
                );
            }
        });

        return () => ctx.revert();
    }, [loaded]);

    const addTextRef = (el) => {
        if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
    };

    return (
        <>
            <ParallaxScroll />
            <section className={styles.about} id="about">
                <h1 ref={headRef} data-scroll-speed="-0.01" className={styles.head}>
                    WHO AM I?
                </h1>

                <div className={styles.content}>
                    <div ref={addTextRef} className={styles.text1}>
                        A <span className={styles.color}>{age}</span> Years old Man Surviving from{" "}
                        <span className={styles.color}>Day 0</span> When i was born on this planet named{" "}
                        <span className={styles.color}>Earth</span>
                    </div>

                    <div ref={centerRef} className={styles.center}>
                        <div ref={addTextRef} data-scroll-speed="-0.01" className={styles.txt}>
                            converting <span className={styles.color}>CAFFEINE</span> to CODE
                        </div>

                        <div className={styles.canvasWrapper}>
                            <div style={{ marginBottom: 8, fontSize: 13 }}>{loaded ? "" : "Loading model..."}</div>
                            <canvas ref={canvasRef} className={styles.canvas} />
                        </div>

                        <div ref={addTextRef} data-scroll-speed="-0.03" className={styles.txt}>
                            With some high dreams. Coz my name itself says{" "}
                            <span className={`${styles.color} ${styles.font}`}>Big Money</span>
                        </div>
                    </div>

                    <div ref={addTextRef} className={styles.text2}>
                        As my <span className={styles.color}>NAME</span> is...
                    </div>
                </div>
            </section>
        </>
    );
}
