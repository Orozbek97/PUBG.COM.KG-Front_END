import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from 'react';
import {Container, Tab, Tabs} from "react-bootstrap";
import {Helmet} from "react-helmet";
import {Link, useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import UserService from "../../services/UserService";
import BottomNavigationBar from "../bottomNavigation/bottomNavigation";
import Header from "../header/Header";

const PlayerPage = () => {
    const { playerId } = useParams();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await UserService.fetchPlayerById(playerId);
                setPlayer(response.data);
            } catch (error) {
                console.error('Найти игрока не удалось:', error);
            }
        };

        fetchPlayer()
    }, [playerId]);
    
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

    if (!player) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center gap-2" style={{height: '30vh'}}>
                <ClipLoader color={'#299cff'}/>
                <h3 className={'text-white'}> Заружается данные </h3>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title> Информацио о игроке {player.name} </title>
            </Helmet>
            <Header />
            <Container>
                <div className="player-information-card">
                    <h4 className={'personal-information-tittle'}>Информация о {player.name}</h4>
                    <div className="row">
                        <div className="col-3">
                            <div className="player-avatar">
                                <img src={player.image}
                                     alt="player-avatar"
                                     width={'100%'}
                                     style={{borderRadius: '15px'}}/>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="player-information">
                                <div className="information-row">
                                    Имя:
                                    <p className={'info-data'}> {player.name}</p>
                                </div>
                                <div className="line"></div>
                                <div className="information-row">
                                    PUBG НИК:
                                    <p className={'info-data'}> {player.pubgNick}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="player-information-card">
                    <h4 className={'personal-information-tittle'}>Статистика {player.name}</h4>
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
                                        <div className="information-row">
                                            Количество игр :
                                            <p className={'info-data'}>{player.statistic.game}</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="information-row">
                                            Количество киллов :
                                            <p className={'info-data'}> {player.statistic.kill}</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="information-row">
                                            Сумма выигранных денег :
                                            <p className={'info-data'}> {player.statistic.prizeMoney} </p>
                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="player-information">
                                        <div className="information-row">
                                            Количество ТОП 1 :
                                            <p className={'info-data'}> {player.statistic.firstPlace}</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="information-row">
                                            Количество ТОП 2 :
                                            <p className={'info-data'}> {player.statistic.secondPlace}</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="information-row">
                                            Количество ТОП 3 :
                                            <p className={'info-data'}>{player.statistic.thirdPlace}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                <div className="player-information-card">
                    <h4 className={'personal-information-tittle'}> Турниры {player.name}</h4>
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
                            {player.tournaments.map((e, index) => (
                                <>
                                    <Link to={`/tournament/id/${e.tournamentId}`}>
                                        <div key={e._id} className="tournament-data">
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
                                                <p> Дата: </p>
                                                <p> {formatDate(e.tournamentDate)} | {formatTime(e.tournamentDate)} </p>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
            <BottomNavigationBar/>
        </>
    );
};

export default observer(PlayerPage);