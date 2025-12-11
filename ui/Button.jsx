"use client";
import React, { useEffect, useRef } from 'react';
import styles from '@/css/ui/Button.module.css';

const Button = React.forwardRef(({ children }, ref) => {
  const cursor = useRef(null);

  useEffect(() => {
    cursor.current = document.querySelector('.cursor');
  }, []);

  return (
    <button ref={ref} className={styles.button}>
      {children}
    </button>
  );
});

export default Button;
