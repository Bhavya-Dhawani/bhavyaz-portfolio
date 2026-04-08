'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/validation/contact';
import styles from '@/css/components/home/Contact.module.css';

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const response = await fetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitMessage('Thank you! We will contact you soon.');
                reset();
            } else {
                setSubmitMessage(result.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setSubmitMessage('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className={styles.contact} id='contact'>
                <h1 className={styles.head}>Let's Work Together</h1>
                <div className={styles.formWrapper}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <h2 className={styles.head2}>Get a Call</h2>

                        <div className={styles.inputBox}>
                            <input
                                type="text"
                                id='name'
                                className={styles.input}
                                placeholder=' '
                                {...register('name')}
                            />
                            <label htmlFor="name" className={styles.label}>Name</label>
                            {errors.name && (
                                <span className={styles.error}>{errors.name.message}</span>
                            )}
                        </div>

                        <div className={styles.inputBox}>
                            <input
                                type="tel"
                                id='phone'
                                className={styles.input}
                                placeholder=' '
                                {...register('phone')}
                            />
                            <label htmlFor="phone" className={styles.label}>Number</label>
                            {errors.phone && (
                                <span className={styles.error}>{errors.phone.message}</span>
                            )}
                        </div>

                        <div className={styles.inputBox}>
                            <input
                                type="email"
                                id='email'
                                className={styles.input}
                                placeholder=' '
                                {...register('email')}
                            />
                            <label htmlFor="email" className={styles.label}>Email</label>
                            {errors.email && (
                                <span className={styles.error}>{errors.email.message}</span>
                            )}
                        </div>

                        <div className={styles.inputBox}>
                            <input
                                type="text"
                                id='message'
                                className={styles.input}
                                placeholder=' '
                                {...register('message')}
                            />
                            <label htmlFor="message" className={styles.label}>Message</label>
                            {errors.message && (
                                <span className={styles.error}>{errors.message.message}</span>
                            )}
                        </div>

                        <div className={styles.submitBox}>
                            <button
                                type="submit"
                                className={styles.submit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Request Callback'}
                            </button>
                        </div>

                        {submitMessage && (
                            <div className={styles.successMessage}>{submitMessage}</div>
                        )}

                        <div className={styles.head3}>I will be happy to talk to you.</div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Contact;
