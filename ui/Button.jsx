"use client";
import React, { useEffect, useRef } from 'react';
import styles from '@/css/ui/Button.module.css';

const Button = ({children}) => {

    const cursor = useRef(null);

    useEffect(()=>{
        cursor.current = document.querySelector('.cursor');
    },[])

  return (
    <button className={styles.button}>
        {children}
    </button>
  )
}

export default Button
