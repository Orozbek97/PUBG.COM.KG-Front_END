import React from 'react';
import {Tab, Tabs} from "react-bootstrap";
import {Helmet} from "react-helmet";
import LogoImg from "../header/assets/pubg.com.png";
import LoginForm from "./SignIn";
import SingUp from "./SignUp";


const Authorization = () => {
    return (
        <>
          <Helmet>
            <title> Авторизация - PUBG.COM.KG </title>
          </Helmet>
            <div className="auth-page-logo">
                <a href='/'>
                    <img src={LogoImg} alt="Logo-site" width={'100%'} className={'logo'}/>
                </a>
            </div>
            <div className="line"
                 style={{backgroundColor: "silver",
                     width: "100%",
                     height: "1px",
                     marginBottom: '30px'
                 }}></div>
            <Tabs
                defaultActiveKey="SignIn"
                id="authorization-form"
                className="my-3 justify-content-center"
            >
                <Tab eventKey="SignIn" title="Вход">
                    <LoginForm />
                </Tab>
                <Tab eventKey="SignUp" title="Регистрация">
                    <SingUp />
                </Tab>
            </Tabs>
        </>
    );
};

export default Authorization;