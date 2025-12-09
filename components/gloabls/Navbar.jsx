import React from 'react';
import styles from '@/css/components/globals/Navbar.module.css';
import Image from 'next/image';
import logo from '@/assets/svg/logo.svg';


const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.imgCont}>
                <Image src={logo} alt='logo' className={styles.img} />
                <p className={styles.text}>Bhavya <br /> Dhanwani</p>
            </div>

            <div className={styles.links}>
                <div className={styles.link}>
                    Home
                </div>
            </div>
        </nav>
    )
}

export default Navbar
