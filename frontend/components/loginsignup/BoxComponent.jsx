"use client";
import React, { useEffect, useState } from 'react';
import style from '@/css/components/loginsignup/BoxComponent.module.css';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import { useUser } from '@/helpers/UserContext';
import { useRouter } from 'next/navigation';


const BoxComponent = () => {

  // const [nameLogin, setNameLogin] = useState("");

  const {user} = useUser();
  const router = useRouter();

  useEffect(()=>{
    if (user != null) {
      router.push('/')
    }
  },[])

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  const [formType, setFormType] = useState("login");
  const [changeType, setChangeType] = useState(false);

  const ChangeForm = async (type) => {
    setChangeType(true);
    await sleep(500);
    setFormType(type);
    await sleep(2000);
    setChangeType(false);
  }

  return (
    <div className={`${style.box} ${changeType ? style.close : ''}`}>
      {formType == 'login' ? <LoginComponent ChangeForm={ChangeForm} /> : <SignupComponent ChangeForm={ChangeForm} />}
    </div>
  )
}

export default BoxComponent