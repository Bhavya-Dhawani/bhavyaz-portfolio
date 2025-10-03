'use client';
import React from 'react';
import style from '@/css/components/home/Hero.module.css';
import Image from 'next/image';
import MyImg from '@/assets/images/myimgbg.webp';
import TypewriterComponent from 'typewriter-effect';
import GlowBUtton from '@/ui/GlowBUtton';
import NormalButton from '@/ui/NormalButton';
// import Spline from '@splinetool/react-spline';

const Hero = () => {
    return (
        <div className={style.hero}>
            {/* <div className={style.LandingAnimation}>
                <Spline
                    scene="https://prod.spline.design/i3Zt0Nkb5rl3ox3U/scene.splinecode" style={{ pointerEvents: 'none' }}
                />
            </div> */}

            <div className={style.content}>
                <h1 className={style.HeadingText}>I am a</h1>
                <div className={style.ChangingText}>
                    <TypewriterComponent
                        options={{
                            strings: ["Full Stack Developer", "Product Maker", "Problem-Crushing Developer"],
                            autoStart: true,
                            loop: true,
                            delay: 50,
                            deleteSpeed: 30,
                        }}
                    />
                </div>
                <div className={style.text}>I&apos;m a results-driven developer, transforming concepts into seamless applications. With a blend of creativity and technical skill, I craft solutions that leave an impact.</div>
                <div className={style.buttons}>
                    <GlowBUtton> {"</>"} My work </GlowBUtton>
                    <NormalButton>Let's Talk</NormalButton>
                </div>
            </div>

            <div className={style.photo}>
                <Image src={MyImg} className={style.img} alt='My Image'></Image>
            </div>

        </div>
    )
}

export default Hero
