'use client';
import React from 'react';
import style from '@/css/components/home/Hero.module.css';
import Spline from '@splinetool/react-spline';

const Hero = () => {
    return (
        <div className={style.hero}>
            <div className={style.LandingAnimation}>
                <Spline
                    scene="https://prod.spline.design/i3Zt0Nkb5rl3ox3U/scene.splinecode" style={{ pointerEvents: 'none' }}
                />
            </div>
        </div>
    )
}

export default Hero
