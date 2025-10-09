"use client";
import Navbar from '@/components/globals/Navbar';
import { useUser } from '@/helpers/UserContext';
import Toast from '@/ui/Toast';
import sleep from '@/utils/sleep';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = () => {
    const [display, setDisplay] = useState(false);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const { setUser, user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user == null || user.isVerified == false) {
            router.push('/');
        }
    }, [])

    const handleLogout = async () => {
        axios.post('/api/auth/logout', {}, { withCredentials: true })
            .then(async (res) => {
                setType("Success");
                setMessage(res.data.message);
                setDisplay(true);
                await sleep(3000);
                setUser(null)
                setDisplay(false);
                setMessage("");
                setType("");
                router.push('/');
            })
            .catch(async (err) => {
                setType("Error");
                setMessage(err.response.data.message);
                setDisplay(true);
                await sleep(3000);
                setDisplay(false);
                setMessage("");
                setType("");
            })
    }

    return (
        <div>
            <Navbar></Navbar>
            <button onClick={handleLogout}>Logout</button>
            <Toast type={type} Message={message} display={display}></Toast>
        </div>
    )
}

export default page
