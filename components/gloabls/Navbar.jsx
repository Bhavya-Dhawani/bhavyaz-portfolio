"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/css/components/globals/Navbar.module.css';
import Image from 'next/image';
import logo from '@/assets/svg/logo.svg';


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [goToTop, setGoToTop] = useState(false);

    useEffect(()=>{
        window.addEventListener('wheel',(dets)=>{
            if (dets.deltaY > 0) {
                setGoToTop(true);
            }else {
                setGoToTop(false);
            }
        })
    },[])

    return (
        <nav className={`${styles.nav} ${goToTop ? styles.top : ''}`}>
            <div className={styles.imgCont}>
                <Image src={logo} alt='logo' className={styles.img} />
                <p className={styles.text}>Bhavya <br /> Dhanwani</p>
            </div>

            <div onClick={()=>{setIsOpen(!isOpen)}} className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
            </div>

            <div className={styles.links}>
                <div className={styles.link}>
                    Home
                </div>
                <div className={styles.link}>
                    About
                </div>
                <div className={styles.link}>
                    Projects
                </div>
                <div className={styles.link}>
                    Testimonials
                </div>
                <div className={styles.link}>
                    let's Collab
                </div>
            </div>
        </nav>
    )
}

export default Navbar
