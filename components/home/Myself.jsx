import React from "react";
import styles from "@/css/components/home/Myself.module.css";
import Image from "next/image";
import me from "@/assets/images/me.png";

const Myself = () => {
    return (
        <section className={styles.myself}>
            <h1 className={styles.head}>Bhavya Dhanwani</h1>
            <Image src={me} alt="Bhavya" className={styles.myImg} sizes="(max-width:420px) 60vw, (max-width:768px) 40vw, 30vw" priority />
            <div className={styles.light}></div>
        </section>
    );
};

export default Myself;
