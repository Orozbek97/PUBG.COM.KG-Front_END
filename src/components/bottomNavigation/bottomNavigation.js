import React, {useContext, useEffect, useState} from 'react';
import {Button, Offcanvas} from 'react-bootstrap';
import './index.css';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {Context} from "../../index";

const BottomNavigationBar = () => {
    const {store} = useContext(Context);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const currentLocation = useLocation();
    const [activeIcon, setActiveIcon] = useState('home');

    useEffect(() => {
        const iconFromPath = currentLocation.pathname.replace('/', '');
        setActiveIcon(iconFromPath);
    }, [currentLocation.pathname]);

    return (
        <>
            <div className={'spacing'}></div>
            <div className="bottom-bar">
                <NavLink to="/" >
                    <i className={`icon ion-home ${activeIcon === '' ? 'activee' : ''}`}>
                        <p>Главная</p>
                    </i>
                </NavLink>
                <NavLink to="/player/all">
                    <i className={`icon ion-android-people ${activeIcon.includes('player')  ? 'activee' : ''}`} >
                        <p>Игроки</p>
                    </i>
                </NavLink>
                <NavLink to="/tournament/all">
                    <i className={`icon ion-trophy ${activeIcon.includes('tournament') ? 'activee' : ''}`}>
                        <p>Турниры</p>
                    </i>
                </NavLink>
                <NavLink to="/me/personal-area">
                    <i className={`icon ion-person  ${activeIcon.includes('me/') ? 'activee' : ''}`} >
                        <p>Кабинет</p>
                    </i>
                </NavLink>
                <Button onClick={handleShow} style={{
                        background: 'none',
                        borderColor: 'silver',
                        padding: '1px 3px'
                }}>
                    <i className={'icon ion-android-menu'} >
                        <p>Меню</p>
                    </i>
                </Button>
            </div>
            <Offcanvas show={show} onHide={handleClose} style={{width: '60%'}}>
                <Offcanvas.Header closeButton style={{color: 'white'}}>
                    <Offcanvas.Title>Меню</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body  className={'canvas-body'}>
                    <Link to="/me/personal-area"> Личный кабинет</Link>
                    <Link to="/tournament/all"> Все турниры</Link>
                    <Link to="/player/all"> Рейтинг Игроков</Link>
                    <div className="line my-2"></div>
                    <Link to="https://www.instagram.com/pubg_com_kg"> Наш Instagram</Link>
                    <Link to="https://t.me/pubg_com_kg"> Наш Telegram</Link>
                    
               
                    <Button onClick={() => {
                        store.logout();
                        handleClose()
                    }}
                            className={'logout-button btn-danger'}
                    > Выйти из аккаунта </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default BottomNavigationBar;
