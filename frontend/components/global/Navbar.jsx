"use client";
import React, { useRef, useState } from 'react';
import styles from '@/css/components/global/Navbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { timeline } from '@/gsap/Maintimeline';

const Navbar = () => {

    const routePath = usePathname();
    const logoRef = useRef(null);
    const [sidebar, setSidebar] = useState(false);
    const { contextSafe } = useGSAP();

    const handleClick = contextSafe(() => {

        const sideBArValue = sidebar;
        setSidebar(!sidebar);

        if (!sidebar) {
            gsap.from(`.${styles.item}`, {
                x: -100,
                opacity: 0,
                duration: 0.5,
                stagger: 0.15,
                delay: 0.5
            })
        }

    })


    useGSAP(() => {

        timeline.from(logoRef.current.children, {
            y: -100,
            duration: 0.5,
            delay: 0.1,
            stagger: 0.1
        });

        timeline.from(`.${styles.item}`, {
            y: -100,
            duration: 0.5,
            stagger: 0.1
        }, "Animation 1")
    }, [])

    const routes = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "About",
            path: "/about"
        },
        {
            name: "Cotact",
            path: "/contact"
        },
        {
            name: "ADMIN",
            path: "/admin"
        },
    ]

    return (
        <div className={styles.nav}>
            <div className={styles.logo} ref={logoRef}><span>Bhavya&apos;s</span> <span>PortFolio</span></div>
            <div className={`${styles.items} ${sidebar ? styles.open : styles.close}`}>
                {
                    routes.map((route, i) => {
                        return (
                            <Link href={route.path} key={i} className={`${styles.item} ${route.path == '/admin' ? styles.admin : ''} ${route.path == routePath ? styles.active : ''}`}>
                                {
                                    route.name.split("").map((word, i) => {
                                        return (
                                            <span key={i}>{word}</span>
                                        )
                                    })
                                }
                            </Link>
                        )
                    })
                }
            </div>
            <div className={`${styles.hamburger} ${sidebar ? styles.open : ''}`} onClick={handleClick} >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Navbar
