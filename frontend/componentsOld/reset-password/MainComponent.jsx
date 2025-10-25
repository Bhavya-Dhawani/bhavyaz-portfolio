"use client";
import React, { useState } from 'react';
import style from '@/css/components/reset-password/MainComponent.module.css';
import Input from '@/ui/Input';
import axios from 'axios';
import Toast from '@/ui/Toast';
import { useRouter } from 'next/navigation';
import sleep from '@/utils/sleep';

const MainComponent = ({ token }) => {

    const [password, setPassword] = useState("");
    const [passwordErorr, setPasswordError] = useState("");
    const [display, setDisplay] = useState(false);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const validateLogin =  () => {
        let isValid = true;

        // Password validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,32}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                "Password must be 8–32 chars with 1 uppercase, 1 lowercase, 1 number, and 1 special character"
            );
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (!isValid) return;

        axios.post(`/api/auth/reset-password/${token}`, { password: password }, { withCredentials: true })
            .then(async (res) => {
                if (res.data.success) {
                    setType("Success");
                    setMessage("Password reset Successfully");
                    setDisplay(true);
                    await sleep(1000);
                    setDisplay(false);
                    setMessage("");
                    setType("");
                    router.push('/');
                }
            })
            .catch(async (err) => {
                console.log(err)
                setType("Error");
                setMessage(err.response.data.message);
                setDisplay(true);
                await sleep(1000);
                setDisplay(false);
                setMessage("");
                setType("");
            })
    };

    return (
        <div className={style.mainBox}>

            <div className={style.head}>
                <h2 className={style.headContent}>Reset Password</h2>
            </div>

            <Input value={password} name={"password"} type={"password"} placeHolder={"*****"} errorMsg={passwordErorr} onChange={setPassword}></Input>

            <button onClick={validateLogin} className={style.resetButton}>Reset Password</button>
            <Toast type={type} Message={message} display={display}></Toast>
        </div>
    )
}

export default MainComponent
