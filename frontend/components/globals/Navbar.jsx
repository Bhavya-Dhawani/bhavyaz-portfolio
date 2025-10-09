"use client";
import React, { useState } from 'react';
import style from '@/css/components/globals/Navbar.module.css';
import { usePathname } from 'next/navigation';
import PageTransition from '@/helpers/PageTransition';
import { useUser } from '@/helpers/UserContext';
import OtpPopup from '@/helpers/OtpPopup';
import Toast from '@/ui/Toast';
import axios from 'axios';
import sleep from '@/utils/sleep';

const Navbar = () => {

    const path = usePathname();
    const [open, setOpen] = useState(false);
    const { user } = useUser();
    const [otpDisplay, setOtpDisplay] = useState(false);
    const [display, setDisplay] = useState(false);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");

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
        ...(user
            ? (user.isVerified
                ? [{ name: "Dashboard", route: '/dashboard' }]
                : [{ name: "Verify Email", route: '/verify-email' }]
            )
            : [{ name: "Login / Signup", route: '/loginsignup' }]
        )
    ];

    const handleVerification = () => {
        axios
            .post(
                `/api/auth/send-verification`,
                {},
                { withCredentials: true }
            )
            .then((res) => {
                if (res.data.success) {
                    onResendSuccess(res.data.message);
                    setOtpDisplay(true);
                }
            })
            .catch((err) => {
                onOtpError(err.response.data.message);
            });

    }

    const onResendSuccess = async () => {
        setType("Success");
        setMessage("Otp resent Successfully");
        setDisplay(true);
        await sleep(3000);
        setDisplay(false);
        setMessage("");
        setType("");
    }

    const onOtpSuccess = async () => {
        setOtpDisplay(false);
        setType("Success");
        setMessage("User Registered Successfully");
        setDisplay(true);
        await sleep(3000);
        setDisplay(false);
        setMessage("");
        setType("");
    }

    const onOtpError = async (message) => {
        setType("Error");
        setMessage(message);
        setDisplay(true);
        await sleep(3000);
        setDisplay(false);
        setMessage("");
        setType("");
    }

    return (
        <div className={style.nav}>
            <div className={style.logo}>Bhavya's <span>Portfolio</span></div>
            <div className={`${style.links} ${open ? style.open : ''}`}>
                {
                    routes.map((route, i) => {
                        if (route.name == "Verify Email") {
                            return <div onClick={handleVerification} key={i} className={`${style.link} ${route.route == path ? style.active : ""}`}>{route.name}</div>
                        } else {
                            return (
                                <PageTransition key={i} href={route.route} pageName={route.name} setMenu={setOpen} className={`${style.link} ${route.route == path ? style.active : ""}`}> {route.name} </PageTransition>
                            )
                        }
                    })
                }
            </div>
            <div onClick={() => { setOpen(!open) }} className={`${style.hamburger} ${open ? style.open : ''}`}>
                <span className={style.line}></span>
                <span className={style.line}></span>
                <span className={style.line}></span>
            </div>
            <OtpPopup display={otpDisplay} onResendSuccess={onResendSuccess} onClose={onOtpSuccess} onOtpError={onOtpError}></OtpPopup>
            <Toast type={type} Message={message} display={display}></Toast>
        </div>
    )
}

export default Navbar
