"use client";
import React, { useRef, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PROJECTS = [
    {
        id: "The Og portfolio",
        from: 0.02,
        to: 0.24,
        title: "The Portfolio",
        description: "High-end design and branding websites.",
        live: "https://bhavyaz-portfolio.vercel.app/",
        github: "https://github.com/Bhavya-is-great/bhavyaz-portfolio.git",
    },
    {
        id: "Dole Shole A gym website.",
        from: 0.27,
        to: 0.49,
        title: "A website for a cool Gym",
        description: "Modern fitness and body transformation website.",
        live: "https://dole-shole.vercel.app/",
        github: "https://github.com/Bhavya-is-great/dole-shole.git",
    },
    {
        id: "Jarvis - The og one!",
        from: 0.52,
        to: 0.74,
        title: "A personal Ai Asistant.",
        description: "Interactive WebGL orb animation project.",
        github: "https://github.com/Bhavya-is-great/jarvis.git",
        live: null,
        reason: "This is a Python GUI project so there is no live link so please Check github and install the app from there!",
    },
    {
        id: "A website for a financier",
        from: 0.77,
        to: 0.98,
        title: "A Animated cool website for a financer",
        description: "Clean fintech platform with dashboards.",
        live: "https://www.srkfinserv.com/",
        github: null,
        reason: "This website is made for a client so providing the open repo for it is not a good thing!"
    },
];

const DRAG_THRESHOLD = 8;

const Mesh = ({ onProjectClick }) => {
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
