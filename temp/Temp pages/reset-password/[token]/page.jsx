import React from 'react';
import MainComponent from '@/components/reset-password/MainComponent';
import style from '@/css/components/reset-password/resetPasswrod.module.css'

const page = async ({ params }) => {

    const { token } = await params;

    return (
        <div className={style.resetPassword}>
            <MainComponent token={token} ></MainComponent>
        </div>
    )
}

export default page
