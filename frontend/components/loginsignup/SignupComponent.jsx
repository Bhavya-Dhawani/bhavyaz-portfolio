"use client";
import React from 'react';
import { useState } from 'react';
import style from '@/css/components/loginsignup/SignupComponent.module.css';
import { FaEnvelope } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import Input from '@/ui/Input';
import OptionComponent from './OptionComponent';

const SignupComponent = ({ChangeForm}) => {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState('password');
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();


  const SignupInputs = [
    {
      name: "Name", icon: <FaEnvelope />, type: "text", placeHolder: "Jos Buttler", value: name, onChange: setName, errorMsg: nameError
    },
    {
      name: "Email", icon: <FaEnvelope />, type: "number", placeHolder: "982491xxxx", value: phone, onChange: setPhone, errorMsg: phoneError
    },
    {
      name: "Email", icon: <FaEnvelope />, type: "email", placeHolder: "josbuttler@gamil.com", value: email, onChange: setEmail, errorMsg: emailError
    },
    {
      name: "Password", icon: <TbPasswordFingerprint />, type: passwordType, placeHolder: "*****", value: password, onChange: setPassword, errorMsg: passwordError
    },
  ];

  const validate = () => {
    let isValid = true;

    // Name validation
    if (!name.trim()) {
      setNameError("Name cannot be empty");
      isValid = false;
    } else {
      setNameError("");
    }

    // Phone validation (exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Phone number must be exactly 10 digits");
      isValid = false;
    } else {
      setPhoneError("");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

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

    return isValid;
  };



  return (
    <div className={style.LoginComp}>
      <div className={style.head}>
        <h1 className={style.headContent}>Sign up Here</h1>
      </div>
      {
        SignupInputs.map((ele, i) => {
          return (
            <Input errorMsg={ele.errorMsg} key={i} name={ele.name} icon={ele.icon} type={ele.type} placeHolder={ele.placeHolder} value={ele.value} onChange={ele.onChange} />
          )
        })
      }

      <button onClick={() => validate()} className={style.loginButton}>Sign up</button>

      <hr className={style.hr} />

      <div className={style.otherButtons}>
        {/* <button className={style.btn}>Forgot Password?</button> */}
        <button className={style.btn}> Need Help? </button>
      </div>

      <div className={style.change}>ALready have a Account? <button className={style.btn}  onClick={() => ChangeForm("login")}>Login</button></div>
      
      <hr className={style.hr} />

      <OptionComponent></OptionComponent>
    </div>
  )
}

export default SignupComponent
