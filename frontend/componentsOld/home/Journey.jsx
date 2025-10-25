"use client";
import React from "react";
import styles from "@/css/components/home/Journey.module.css";
import { motion } from "framer-motion";

const Journey = () => {
  return (
    <section className={styles.journeySection}>
      <motion.div
        className={styles.contentWrapper}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className={styles.title}>My Journey</h2>

        <p className={styles.paragraph}>
          My journey in technology has been a story of curiosity, persistence, and creation. 
          What started as an interest in understanding how digital experiences are built gradually turned into a deep passion for crafting them.
        </p>

        <p className={styles.paragraph}>
          Today, I proudly serve as the <span className={styles.highlight}>Senior Frontend Developer</span> at <span className={styles.brand}>Code Demons</span>, 
          where I lead the design and development of modern, interactive, and performance-driven user interfaces.
        </p>
      </motion.div>
    </section>
  );
};

export default Journey;
