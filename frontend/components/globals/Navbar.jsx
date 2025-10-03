"use client";
import React, { useState } from 'react';
import style from '@/css/components/globals/Navbar.module.css';
import { usePathname } from 'next/navigation';
import PageTransition from '@/helpers/PageTransition';

const Navbar = () => {

    const path = usePathname();
    const [open, setOpen] = useState(false);

    const routes = [
        {
            name: "Home", route: '/',
        },
        {
            name: "About", route: '/about',
        },
        {
            name: "Contact", route: '/contact',
        },
        {
            name: "Work", route: '/work',
        },
        {
            name: "Login / Signup", route: '/loginsignup',
        },
    ];

    return (
        <div className={style.nav}>
            <div className={style.logo}>Bhavya's <span>Portfolio</span></div>
            <div className={`${style.links} ${open ? style.open : ''}`}>
                {
                    routes.map((route, i) => {
                        return (
                            <PageTransition key={i} href={route.route} pageName={route.name} setMenu={setOpen} className={`${style.link} ${route.route == path ? style.active : ""}`}> {route.name} </PageTransition>
                        )
                    })
                }
            </div>
            <div onClick={() => { setOpen(!open) }} className={`${style.hamburger} ${open ? style.open : ''}`}>
                <span className={style.line}></span>
                <span className={style.line}></span>
                <span className={style.line}></span>
            </div>
        </div>
    )
}

export default Navbar
