import React from 'react'
import styles from '@/css/components/home/Projects.module.css';
import Button from '@/ui/Button';
import ParallaxScroll from '@/utils/ParallelXScroll';

const Projects = () => {
    return (
        <>
            <ParallaxScroll />
            <section className={styles.projects} id='projects'>
                <h1 className={styles.head}>Projects</h1>
                <button data-scroll-speed="0.05" className={styles.exp}>Enter the Experience</button>
                <div className={styles.light}></div>
            </section>
        </>
    )
}

export default Projects
