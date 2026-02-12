"use client"
import React from 'react'
import styles from '@/css/components/home/Projects.module.css';
import ParallaxScroll from '@/utils/ParallelXScroll';
import Link from 'next/link';

const Projects = () => {
    return (
        <>
            <ParallaxScroll />
            <section className={styles.projects} id='projects'>
                <h1 className={styles.head}>Projects</h1>
                <Link className={styles.exp} href={'/projects'}>Enter the Experience</Link>
                <div className={styles.light}></div>
            </section>
        </>
    )
}

export default Projects
