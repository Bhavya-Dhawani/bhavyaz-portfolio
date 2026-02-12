"use client";
import React, { useRef, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PROJECTS = [
    {
        id: "The portfolio",
        from: 0.02,
        to: 0.24,
        title: "The Og portfolio",
        description: "A creative personal portfolio featuring 3D visuals and smooth animations. Built to showcase projects and skills in a unique, eye-catching way. The design emphasizes motion, interactivity, and modern web effects to create an immersive browsing experience while keeping performance optimized.",
        live: "https://bhavyaz-portfolio.vercel.app/",
        github: "https://github.com/Bhavya-is-great/bhavyaz-portfolio.git",
    },
    {
        id: "Dole Shole A gym website.",
        from: 0.27,
        to: 0.49,
        title: "A website for a cool Gym",
        description: "A bold and energetic website created for a gym and fitness brand. The design highlights strength, motivation, and training services with strong visuals and a dynamic layout. Fully responsive and structured to attract new members, display programs, and provide essential information clearly.",
        live: "https://dole-shole.vercel.app/",
        github: "https://github.com/Bhavya-is-great/dole-shole.git",
    },
    {
        id: "A personal Ai Asistant.",
        from: 0.52,
        to: 0.74,
        title: "Jarvis - The og one!",
        description: "A desktop-based personal AI assistant with an interactive graphical interface. JARVIS can handle tasks, respond to commands, and provide a smart, user-friendly experience. The project combines AI logic with a clean GUI to make interactions feel natural, fast, and visually engaging.",
        github: "https://github.com/Bhavya-is-great/jarvis.git",
        live: null,
        reason: "This is a Python GUI project so there is no live link so please Check github and install the app from there!",
    },
    {
        id: "A website for a financier",
        from: 0.77,
        to: 0.98,
        title: "A Animated cool website for a financer",
        description: "A modern business website built for a finance and loan service company. The site focuses on trust, clarity, and easy navigation so users can quickly understand services like loans, investments, and financial support. Designed with a clean layout, responsive design, and smooth user experience to work well on all devices.",
        live: "https://www.srkfinserv.com/",
        github: null,
        reason: "This website is made for a client so providing the open repo for it is not a good thing!"
    },
];

const DRAG_THRESHOLD = 8;

const Mesh = ({ onProjectClick, setOpen }) => {
    const texture = useTexture("/projects.png");
    const model = useRef();
    const { size } = useThree();

    const imageDataRef = useRef(null);
    const startPos = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);

    useEffect(() => {
        if (!texture.image) return;

        const img = texture.image;
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        imageDataRef.current = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );
    }, [texture]);

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    texture.anisotropy = 16;

    useFrame(() => {
        if (!model.current) return;

        model.current.rotation.y += 0.004;

        const targetScale =
            size.width >= 800
                ? 1
                : THREE.MathUtils.mapLinear(size.width, 320, 800, 0.6, 1);

        model.current.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.1
        );
    });

    const onPointerDown = (e) => {
        startPos.current = { x: e.clientX, y: e.clientY };
        isDragging.current = false;
    };

    const onPointerMove = (e) => {
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;

        if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
            isDragging.current = true;
        }
    };

    const handleClick = (e) => {
        if (isDragging.current) return;

        e.stopPropagation();
        if (!e.uv || !imageDataRef.current) return;

        const uv = e.uv;
        const img = texture.image;

        const x = Math.floor(uv.x * img.width);
        const y = Math.floor((1 - uv.y) * img.height);

        const index = (y * img.width + x) * 4;
        const alpha = imageDataRef.current.data[index + 3];

        if (alpha < 10) return;

        const project = PROJECTS.find(
            (p) => uv.x >= p.from && uv.x <= p.to
        );

        if (!project) return;

        onProjectClick(project);
        setOpen(true);
    };

    return (
        <group rotation={[0, 0, 0.1]}>
            <mesh
                ref={model}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onClick={handleClick}
            >
                <cylinderGeometry args={[1, 1, 1, 80, 1, true]} />
                <meshStandardMaterial
                    map={texture}
                    transparent
                    alphaTest={0.1}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

export default Mesh;
