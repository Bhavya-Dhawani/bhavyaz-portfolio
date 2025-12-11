"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/css/components/globals/Navbar.module.css';
import Image from 'next/image';
import logo from '@/assets/svg/logo.svg';
import { useLenis } from "@/utils/LenisContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [goToTop, setGoToTop] = useState(false);

    const { scrollTo } = useLenis();

    useEffect(() => {
        const wheelHandler = (dets) => {
            setGoToTop(dets.deltaY > 0);
        };

        window.addEventListener("wheel", wheelHandler);
        return () => window.removeEventListener("wheel", wheelHandler);
    }, []);

    const handleScroll = (selector) => {
        const el = document.querySelector(selector);
        if (el) {
            scrollTo(el, { duration: 1.4, easing: (t) => t*t });
        }
    };

    return (
        <nav className={`${styles.nav} ${goToTop ? styles.top : ''}`}>
            <div className={styles.imgCont}>
                <Image src={logo} alt='logo' className={styles.img} />
                <p className={styles.text}>Bhavya <br /> Dhanwani</p>
            </div>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
            >
                <span className={styles.line}></span>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
            </div>

            <div className={styles.links}>
                <div className={styles.link} onClick={() => handleScroll("#home")}>
                    Home
                </div>
                <div className={styles.link} onClick={() => handleScroll("#about")}>
                    About
                </div>
                <div className={styles.link} onClick={() => handleScroll("#projects")}>
                    Projects
                </div>
                <div className={styles.link} onClick={() => handleScroll("#tech")}>
                    Technologies
                </div>
                <div className={styles.link} onClick={() => handleScroll("#contact")}>
                    Let's Collab
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
