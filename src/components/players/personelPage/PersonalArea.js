import EditIcon from '@mui/icons-material/Edit';
import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Tab, Tabs} from "react-bootstrap";
import '../playerPage.css'
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {Context} from "../../../index";
import BottomNavigation from "../../bottomNavigation/bottomNavigation";
import Header from "../../header/Header";
import '../../tournament/tournament-page-style.css'


const PersonalArea = () => {
    const { store } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        store.checkAuth().then(() => {
            setIsLoading(false)
        });
    }, []);
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    if (isLoading) {
        return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-3" style={{height: '100vh'}}>
            <h4 className={'text-white'}> загрузка </h4>
            <ClipLoader color={'#4679ef'} />
        </div>
        )
    }
    if (!store.isAuth) {
        return (
            <>
                <div className="d-flex flex-column justify-content-center align-items-center gap-3" style={{height: '100vh'}}>
                    <h3 className={'text-white'}> Вы не авторизованы </h3>
                    <Link to={'/authorization'} style={{textDecoration: "none"}}>
                        <Button variant={'danger'}>Авторизоваться</Button>
                    </Link>
                    <h3 className={'text-white'}> или </h3>
                    <Link to={'/'} style={{textDecoration: "none"}}>
                        <Button variant={'info'}> Назад </Button>
                    </Link>
                
                </div>
            </>
        
        )
    }
    
    
    return (
        <>
            <Helmet>
                <title> Личный Кабинет - PUBG.COM.KG</title>
            </Helmet>
            <Header/>
            <Container>
                <div className="player-information-card">
                    <h4 className={'personal-information-tittle'}>Личная информация</h4>
                    <div className="row">
                        <div className="col-4">
                            <div className="player-avatar">
                                <img src={store.user.image}
                                     alt="player-avatar"
                                     width={'100%'}
                                     style={{borderRadius: '50%'}}/>
                            </div>
                            
                            <Link to={'/player/lc/setting/avatar'} style={{textDecoration: "none"}}>
                                <button className="edit-image-btn">
                                    Изменить аватар
                                </button>
                            </Link>
                        
                        </div>
                        <div className="col-8">
                            <div className="player-information">
                                <div className="information-row">
                                    Имя:
                                    <p className={'info-data'}> {store.user.name}</p>
                                </div>
                                <div className="line"></div>
                                <div className="information-row">
                                    Email:
                                    <p className={'info-data'}> {store.user.email}</p>
                                </div>
                                <div className="line"></div>
                                <div className="information-row">
                                    PUBG НИК:
                                    <p className={'info-data'}> {store.user.pubgNick}</p>
                                </div>
                                <div className="line"></div>
                                <div className="information-row">
                                    PUBG ID:
                                    <p className={'info-data'}> {store.user.pubgId}</p>
                                </div>
                                <div className="line"></div>
                                <div className="information-row">
                                    Телефон:
                                    <p className={'info-data'}> {store.user.phoneNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="editor-box">
                    <Link to={'/player/lc/setting/edit'} style={{textDecoration: "none"}}>
                        <Button variant={'danger'} className={'editor-btn'}>
                            <EditIcon sx={{background: "none", marginRight: "3px"}}/>
                            Редактировать</Button>
                    </Link>
                </div>
                
                <div className="player-information-card">
                    <h4 className={'personal-information-tittle'}>Моя статистика</h4>
                    <Tabs
                        defaultActiveKey="solo"
                        id="player-statistics"
                        className="mb-3 d-flex justify-content-between"
                        fill
                    >
                        <Tab eventKey="solo" title="Соло">
                            <div className={'row'}>
                                <div className="col-6">
                                    <div className="player-information">
                                        {store.user.statistic ? (
                                            <>
                                                <div className="information-row">
                                                    Количество игр :
                                                    <p className={'info-data'}> {store.user.statistic.game} </p>
                                                </div>
                                                <div className="line"></div>
                                                <div className="information-row">
                                                    Количество киллов :
                                                    <p className={'info-data'}>  {store.user.statistic.kill} </p>
                                                </div>
                                                <div className="line"></div>
                                                <div className="information-row">
                                                    Сумма выигранных денег :
                                                    <p className={'info-data'}>  {store.user.statistic.prizeMoney} </p>
                                                </div>
                                            </>
                                        ) : (<p> Статистика не доступна </p>)
                                        }
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="player-information">
                                        {store.user.statistic ? (
                                            <>
                                                <div className="information-row">
                                                    ТОП 1 :
                                                    <p className={'info-data'}> {store.user.statistic.firstPlace} </p>
                                                </div>
                                                <div className="line"></div>
                                                <div className="information-row">
                                                    ТОП 2 :
                                                    <p className={'info-data'}>  {store.user.statistic.secondPlace} </p>
                                                </div>
                                                <div className="line"></div>
                                                <div className="information-row">
                                                    ТОП 3 :
                                                    <p className={'info-data'}>  {store.user.statistic.thirdPlace} </p>
                                                </div>
                                            </>
                                        ) : (<p> Статистика не доступна </p>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                <div className="player-information-card">
                    <h4 className={'personal-information-tittle'}>Мои Турниры</h4>
                    <div className="participation-container">
                        <div className="participation-tag">
                            <div className="place-and-name">
                                <p> Место </p>
                                <p> Название </p>
                            </div>
                            <div className="kill-and-prizeMoney">
                                <p> Килл </p>
                                <p> Выигрыш </p>
                            </div>
                        </div>
                        <div className="participation">
                            {store.user.tournaments.map((e, index) => (
                                <>
                                    <Link to={`/tournament/id/${e.tournamentId}`}>
                                            <div key={e.tournamentId} className="tournament-data">
                                                <div className="tournament-statistic mx-1">
                                                    <div className="place-and-name">
                                                        <p className='mx-3'> {e.tournamentPlace}</p>
                                                        <div className="player-avatar-and-name mx-2">
                                                            <p className='fw-bold'>{e.tournamentName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="kill-and-prizeMoney-data">
                                                        <p>{e.tournamentKill}</p>
                                                        <p>{e.tournamentMoney} com</p>
                                                    </div>
                                                </div>
                                                <div className="line my-1"></div>
                                                <div className="tournament-date">
                                                    <p> Дата: </p> <p> {formatDate(e.tournamentDate)} | {formatTime(e.tournamentDate)} </p>
                                                </div>
                                            </div>
                                    </Link>
                                </>
                            
                            ))}
                        </div>
                    </div>
                </div>
            
            </Container>
            <BottomNavigation/>
        </>
    );
};

export default observer(PersonalArea);