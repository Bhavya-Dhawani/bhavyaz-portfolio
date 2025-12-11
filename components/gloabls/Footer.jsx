import React from 'react';
import styles from '@/css/components/globals/Footer.module.css';

const Footer = () => {
  return (
    <section className={styles.footer}>
        <h3 className={styles.head}> &copy; {new Date().getFullYear()} &bull; All rights reserved &bull; Made with 💖 by Bhavya Dhanwani</h3>
    </section>
  )
}

export default Footer
