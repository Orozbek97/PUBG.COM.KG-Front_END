import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import React from 'react';
import './footer.css'
import {Container} from "react-bootstrap";
import LogoImg from '.././header/assets/pubg.com.png'


const FooterPage = () => {
    return (
        <>
            <Container>
                <div className="row row-cols-lg-2 row-cols-md-2 row-cols-2 mb-4">
                    <div className="col">
                        <div className="info-side">
                            <div className="logo-rules">
                                <div className="logo">
                                    <img src={LogoImg} alt="logo"/>
                                </div>
                                <div className="rules">
                                   <p>2024© PUBG.COM.KG</p>
                                    <a href="#">   Политики конфиденциальности  </a>
                                    <a href="#">   Пользовательское соглашение</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="footer-links">
                            <div className="soc-links">
                                <a href="https://www.instagram.com/pubg_com_kg"> <InstagramIcon fontSize={'large'}/></a>
                                <a href="https://t.me/pubg_com_kg"> <TelegramIcon sx={{fontSize: 40}}/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default FooterPage;