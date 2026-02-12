"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import styles from '@/css/components/projects/Canva.module.css';
import { OrbitControls } from '@react-three/drei';
import Mesh from './Mesh';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import Image from 'next/image';
import people from "@/assets/images/people.png";
import Link from 'next/link';

const Canva = () => {

    const [projectClicked, onProjectClicked] = useState(null);
    const explainRef = useRef(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            explainRef.current.remove();
        }, 3700);
    }, []);

    return (
        <>
            <div className={styles.explain} ref={explainRef}>Click on the Project for Details</div>
            <Link href={"/"} className={styles.back}>Home</Link>
            <div className={styles.box}>
                <Canvas dpr={[1, 2]} flat camera={{ zoom: 3 }} className={styles.canvas}>
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        rotateSpeed={0.6}
                        minPolarAngle={Math.PI / 2}
                        maxPolarAngle={Math.PI / 2}
                    />

                    <ambientLight />
                    <ambientLight />
                    <ambientLight />
                    <Mesh onProjectClick={onProjectClicked} setOpen={setOpen} />
                    <EffectComposer>
                        <Bloom
                            mipmapBlur
                            intensity={0.2}
                            luminanceThreshold={0.9}
                            luminanceSmoothing={0.1}
                        />
                    </EffectComposer>
                </Canvas>
            </div>
            <Image src={people} alt='People watching projects' className={styles.people} />
            <div className={`${styles.detail} ${open ? "" : styles.close}`}>
                <div onClick={() => {setOpen(false)}} className={styles.CrossIcon}>
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                </div>

                <div className={styles.Content}>
                    <h1 className={styles.head}> {projectClicked !== null ? projectClicked.title : ""} </h1>
                    <div className={styles.Desc}> {projectClicked !== null ? projectClicked.description : ""} </div>
                    <div className={styles.buttons}>
                        {
                            projectClicked !== null ? (
                                projectClicked.github !== null ? <a href={projectClicked.github} className={styles.btnn}> github </a> : <p className={styles.reason}> {projectClicked.reason} </p>
                            ) : ""
                        }
                        {
                            projectClicked !== null ? (
                                projectClicked.live !== null ? <a href={projectClicked.live} className={styles.btnn}> Live Link </a> : <p className={styles.reason}> {projectClicked.reason} </p>
                            ) : ""
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Canva
