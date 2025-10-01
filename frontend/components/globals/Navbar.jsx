"use client";
import React, { useState } from 'react';
import style from '@/css/components/globals/Navbar.module.css';
import { usePathname } from 'next/navigation';

const Navbar = () => {

    const path = usePathname();
    const [open, setOpen] = useState(false);

    const routes = [
        {
            name: "Home", route: '/', hover: 'Home'
        },
        {
            name: "About", route: '/about', hover: 'About'
        },
        {
            name: "Contact", route: '/contact', hover: 'Contact'
        },
        {
            name: "Work", route: '/work', hover: 'Work'
        },
        {
            name: "Login / Signup", route: '/login', hover: 'Login / Signup'
        },
    ];

    return (
        <div className={style.nav}>
            <div className={style.logo}>Bhavya's <span>Portfolio</span></div>
            <div className={`${style.links} ${open ? style.open : ''}`}>
                {
                    routes.map((route, i) => {
                        return (
                            <div key={i} className={`${style.link} ${route.route == path ? style.active : ""}`}> {route.name} </div>
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
