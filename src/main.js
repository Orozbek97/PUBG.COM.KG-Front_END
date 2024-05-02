import React from 'react';
import {Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import BottomNavigationBar from "./components/bottomNavigation/bottomNavigation";
import FactsPubg from "./components/factsAboutPubgMobile/FactsPubg";
import FooterPage from "./components/footer/Footer";
import Header from "./components/header/Header";
import Players from "./components/players/Players";
import ActualTournaments from "./components/tournament/ActualTornaments";

const Main = () => {
    return (
        <div>
          <Helmet>
            <title> PUBG.COM.KG - Ежедневные турниры по PUBG Mobile</title>
          </Helmet>
            <Header />
            <ActualTournaments />
            <Container>
                <div className="row row-cols-lg-4 row-cols-md-3  row-cols-1 my-auto">
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col">
                        <Link to={'/tournament/all'}>
                            <Button variant={'success'}
                                    className={'text-uppercase'}
                                    size={'lg'}
                                    style={{width: '100%',
                                            borderRadius:'15px',
                                            marginBottom: "30px",
                                            marginTop: '5px'
                                    }}> все туниры </Button></Link>
                    </div>
                </div>
            </Container>
            <div className="line"
                 style={{backgroundColor: "silver",
                     width: "100%",
                     height: "1px",
                     marginBottom: '30px'
                 }}></div>
            <Players />
            <Container>
                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col">
                        <Link to={'/player/all'}>
                            <Button variant={'success'}
                                    className={'text-uppercase'}
                                    size={'lg'}
                                    style={{width: '100%',
                                            borderRadius:'15px',
                                            marginBottom: "30px",
                                            marginTop: '5px'
                                    }}> все игроки </Button>
                        </Link>
                    </div>
                </div>
            </Container>
            <div className="line"
                 style={{backgroundColor: "silver",
                     width: "100%",
                     height: "1px",
                     marginBottom: '30px'
                 }}></div>
            <FactsPubg />
            <FooterPage />
            <BottomNavigationBar />
        </div>
    );
};

export default Main;