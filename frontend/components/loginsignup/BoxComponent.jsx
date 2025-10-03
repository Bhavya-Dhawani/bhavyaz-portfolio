"use client";
import React, { useState } from 'react';
import style from '@/css/components/loginsignup/BoxComponent.module.css';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';


const BoxComponent = () => {

  // const [nameLogin, setNameLogin] = useState("");
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
      {/* <LoginComponent></LoginComponent> */}
      {/* <SignupComponent></SignupComponent> */}
      {formType == 'login' ? <LoginComponent ChangeForm={ChangeForm} /> : <SignupComponent ChangeForm={ChangeForm} />}
    </div>
  )
}

export default BoxComponent