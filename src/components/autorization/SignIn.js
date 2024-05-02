import {observer} from 'mobx-react-lite';
import React, {useContext, useState} from 'react';
import {Alert, Button, Container} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {Link, useNavigate} from "react-router-dom";
import "./authorization..css"
import {ClipLoader} from "react-spinners";

import {Context} from '../../index';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")
    const [loginStatus, setLoginStatus] = useState({
        loading: false,
        success: false,
        error: false
    });

    const { store } = useContext(Context);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        setLoginStatus({ loading: true, success: false, error: false });
        try {
            await store.login(email, password);
            setLoginStatus({loading: false, success: true, error: false})
        } catch (error) {
            setLoginStatus({ loading: false, success: false, error: true })
            setError(error.message);
        }
    };

    const renderAlert = () => {
        if (loginStatus.success) {
            return <Alert variant="success"> Добро пожаловать  </Alert>;
        } else if (loginStatus.error) {
            return <Alert variant="danger" className={'text-center'}>{error}</Alert>;
        }
        return null;
    };
    if (loginStatus.success && store.isAuth) {
        setTimeout(() => {
            navigate("/") ;
                },1000);
    }
    

    return (
        <>
            <Helmet>
                <title> Вход... - PUBG.COM.KG </title>
            </Helmet>
            <Container className="d-flex justify-content-center" >
                
                <div id="login-form" className="form">
                    <div className="title"> Войти в аккаунт </div>
                    <div className="subtitle"> Введите свои данные для входа в аккаунт </div>
                    {renderAlert()}
                    <div className="input-container ic1">
                        <input id="email"
                               className="input"
                               type="email"
                               placeholder=" "
                               value={email}
                               onChange={handleEmailChange}
                               required
                        />
                        <div className="cut cut-short"></div>
                        <label htmlFor="email"
                               className="placeholder">
                            Email
                        </label>
                    </div>
                    <div className="input-container ic2 d-flex">
                        <input id="password"
                               className="input input-password"
                               type={showPassword ? 'text' : 'password'}
                               placeholder=" "
                               value={password}
                               onChange={handlePasswordChange}
                               required
                               />
                        <div className="cut "></div>
                        <label htmlFor="password"
                               className="placeholder">
                            Пароль
                        </label>
                        <Button
                         onClick={() =>setShowPassword(!showPassword)}
                         className={"btn-showPassword"}>
                            {showPassword ? 'Скрыть' : 'Показать'}
                        </Button>
                    </div>
                    <div className="forgot-password">
                        <Link to={'/auth/forgot-password'}>
                            Забыли пароль?
                        </Link>
                    </div>
                    
                    <button type="text"
                            className="submit"
                            onClick={handleLogin}
                    >
                        {loginStatus.loading ?  < ClipLoader color="#fff" size={20} /> : "Войти"}
                    </button>
                
                </div>
            </Container>
        </>
    );
};

export default observer(LoginForm);
