import React, {useContext} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Context} from "../../index";
import PlayerNameAndAuthButton from "../autorization/AuthButton";
import LogoImg from './assets/pubg.com.png'

import ('./Header.css')


function CollapsibleExample() {
    const {store} = useContext(Context);
    return (
        <>
           <div className="header-container">
             <Container>
               <div className="header">
                 <div className="logo-img">
                   <a href='/'>
                     <img src={LogoImg} alt="Logo-site" width={'100%'} className={'logo'}/>
                   </a>
                 </div>
                 < PlayerNameAndAuthButton />
               </div>
             </Container>
             <div className="line"
                  style={{backgroundColor: "silver",
                    width: "100%",
                    height: "1px",
                    marginBottom: '20px'
                  }}></div>
             <Container>
               <div className="nav-links">
                 <Nav.Link href="/me/personal-area" >Личный Кабинет</Nav.Link>
                 |
                 <Nav.Link href="/tournament/all">Турниры</Nav.Link>
                 |
                 <Nav.Link href="/player/all">Игроки</Nav.Link>
                 |
                 <Nav.Link href="/instruction">Вопросы-Ответы</Nav.Link>
                 |
                 <Nav.Link href="/about-us">О Нас</Nav.Link>
                 |
                 <Nav.Link href="https://t.me/dark_warriorr"  target="_blank">Написать Нам</Nav.Link>
                 |
                 <Nav.Link onClick={() => store.logout()} className={'text-bg-warning'}>Выйти </Nav.Link>
               </div>
             </Container>
           </div>
        </>
    );
}

export default CollapsibleExample;