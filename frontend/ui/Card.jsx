import React from 'react'
import styles from '@/css/ui/Card.module.css';
import Image from 'next/image';

const Card = ({ src, alt, title, body }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.image}>
                <Image src={src} alt={alt} />
            </div>
            <h4 className={styles.body}>{body}</h4>
        </div>
    )
}

export default Card
