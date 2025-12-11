import React from 'react';
import styles from '@/css/components/home/Contact.module.css';

const Contact = () => {
    return (
        <>
            <section className={styles.contact} id='contact'>
                <h1 className={styles.head}>Let's Work Together</h1>
                <div className={styles.formWrapper}>
                    <div className={styles.form}>
                        <h2 className={styles.head2}>Get a Call</h2>
                        <div className={styles.inputBox}>
                            <input type="text" id='name' className={styles.input} placeholder=' ' />
                            <label htmlFor="name" className={styles.label}>Name </label>
                        </div>
                        <div className={styles.inputBox}>
                            <input type="number" id='contact' className={styles.input} placeholder=' ' />
                            <label htmlFor="contact" className={styles.label}>Number </label>
                        </div>
                        <div className={styles.inputBox}>
                            <input type="email" id='name' className={styles.input} placeholder=' ' />
                            <label htmlFor="email" className={styles.label}>Email </label>
                        </div>
                        <div className={styles.inputBox}>
                            <input type="text" id='message' className={styles.input} placeholder=' ' />
                            <label htmlFor="message" className={styles.label}>Message </label>
                        </div>
                        <div className={styles.submitBox}>
                            <button className={styles.submit}>Request Callback</button>
                        </div>
                        <div className={styles.head3}>I will be happy to talk to you.</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
