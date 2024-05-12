import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from 'react';
import {Alert, Container,} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import PhoneInput from "react-phone-input-2";
import {Navigate} from 'react-router-dom';
import {ClipLoader} from "react-spinners";
import {Context} from "../../index";
import './authorization..css';
import 'react-phone-input-2/lib/style.css';
import './phoneNumberStyle.css';


const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [image , setImage] = useState('https://thumb.cloud.mail.ru/weblink/thumb/xw1/DLQD/DrzQ82XbZ')
    const [email, setEmail] = useState('');
    const [pubgNick, setPubgNick] = useState('');
    const [pubgId, setPubgId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [registrationStatus, setRegistrationStatus] = useState({
        loading: false,
        success: false,
        error: false
    });
    
    const [error, setError] = useState("")
    const { store } = useContext(Context);



    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePubgNickChange = (e) => {
        setPubgNick(e.target.value);
    };
    
    const handlePubgIdChange = (e) => {
        const value = e.target.value;
        const lastChar = value.slice(-1); // Получаем последний введенный символ
        if (!/\d/.test(lastChar)) { // Проверяем, является ли последний символ цифрой
            // Если символ не является цифрой, убираем его из введенной строки
            setPubgId(value.slice(0, -1));
        } else {
            setPubgId(value);
        }
    };
    
    
    
    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };


    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        setPasswordsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    const handleRegistration = async () => {
        setRegistrationStatus({ loading: true, success: false, error: false });
        try {
            await store.registration(name, image, email, pubgNick, pubgId, phoneNumber, password);
            setRegistrationStatus({ loading: false, success: true, error: false });
        } catch (error) {
            setRegistrationStatus({ loading: false, success: false, error: true })
            setError(error.message)
        }
    };

    const renderAlert = () => {
        if (registrationStatus.success) {
            return <Alert variant="success">Регистрация прошла успешно!</Alert>;
        } else if (registrationStatus.error) {
            return <Alert variant="danger" className={'text-center'}>{error}</Alert>;
        }
        return null;
    };
    if (registrationStatus.success && store.isAuth) {
        return <Navigate to="/auth/registration/newUser/success" />;
    }
    



    return (
        <>
            <Helmet>
                <title> Регистрация... - PUBG.COM.KG </title>
            </Helmet>
            
            <Container className={"d-flex justify-content-center"}>
                <div id="signUp" className="form">
                    <div className="title"> Регистрация нового пользователя</div>
                    <div className="subtitle"> Заполните все поля для регистрации</div>
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
                        <div className="cut "></div>
                        <label htmlFor="email"
                               className="placeholder">
                            Email
                        </label>
                    </div>
                    <div className="input-container ic2">
                        <input id="name"
                               className="input"
                               type="text"
                               placeholder=" "
                               value={name}
                               onChange={handleNameChange}
                               required
                        />
                        <div className="cut cut-short"></div>
                        <label htmlFor="name"
                               className="placeholder">
                            Имя
                        </label>
                    </div>
                    <div className="input-container ic2">
                        <input id="pubgName"
                               className="input"
                               type="text"
                               placeholder=" "
                               value={pubgNick}
                               onChange={handlePubgNickChange}
                               required
                        />
                        <div className=" cut cut-pubgName "></div>
                        <label htmlFor="pubgName"
                               className="placeholder">
                            Никнейм в PUBG
                        </label>
                    </div>
                    <div className="input-container ic2">
                        <input id="pubgId"
                               className="input"
                               type="tel"
                               placeholder=" "
                               value={pubgId}
                               onChange={handlePubgIdChange}
                               required
                        />
                        <div className="cut cut-id "></div>
                        <label htmlFor="pubgId"
                               className="placeholder">
                            ID в PUBG
                        </label>
                    </div>
                    <div className="input-container ic2">
                        <PhoneInput
                                    onlyCountries={['ru', 'kg']}
                                    countryCodeEditable={false}
                                    country={'kg'}
                                    autofocus={true}
                                    localization={{ru: 'RU', kg: 'KG'}}
                                    value={phoneNumber}
                                    placeholder={''}
                                    onChange={handlePhoneNumberChange} />
                        <div className="cut cut-pubgNumber ">  Номер телефона <WhatsAppIcon color="success" sx={{background: "none"}}/> </div>
                    </div>
                    <div className="input-container ic2">
                        <input id="password"
                               className="input"
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
                    </div>
                    <div className="input-container ic2">
                        <input id="confirmPassword"
                               className="input"
                               type={showPassword ? 'text' : 'password'}
                               placeholder=" "
                               value={confirmPassword}
                               onChange={handleConfirmPasswordChange}
                               required
                        />
                        <div className=" cut cut-confirmPass "></div>
                        <label htmlFor="confirmPassword"
                               className="placeholder">
                            Подтвердите пароль
                        </label>
                    </div>
                    {!passwordsMatch && (
                        <Alert variant="danger" style={{marginTop: '5px'}}>
                            Пароли не совпадают!
                        </Alert>
                    )}
                    <div className="input-container ic2 input-showPassword">
                        <label className="switch">
                            <input type="checkbox"
                                   onChange={handleTogglePassword}/>
                            <span className="slider round"></span>
                        </label>
                        <p className="showPassword"> Показать пароль </p>
                    </div>
                    <button className="submit"
                            onClick={handleRegistration}
                            disabled={!passwordsMatch || registrationStatus.loading}
                            style={{marginTop: '15px'}}>
                        {registrationStatus.loading ? <ClipLoader color="#fff" size={20}/> : 'Зарегистрироваться'}
                    </button>
                
                </div>
            </Container>
        </>
    );
};

export default observer(RegistrationForm);
