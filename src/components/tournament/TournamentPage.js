import CachedIcon from '@mui/icons-material/Cached';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import SavingsIcon from '@mui/icons-material/Savings';
import {Avatar} from "@mui/material";
import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {Helmet} from "react-helmet";
import {Link, useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import GetTournaments from "../../services/GetTournaments";
import BottomNavigationBar from "../bottomNavigation/bottomNavigation";
import Header from "../header/Header";
import ThirdPlaceIcon from './images/bronza.svg';
import ErrorImage from './images/error.png'
import FirstPlaceIcon from './images/gold.svg';
import SecondPlaceIcon from './images/silver.svg';
import Timer from "./Timer";

import  ('./tournaments.css')
import ('./tournament-page-style.css')


const TournamentPage = () => {
    const { tournamentId } = useParams();
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tournamentNotFound, setTournamentNotFound] = useState(false);
    const [registrationDeadline, setRegistrationDeadline] = useState("");
    
    const calculateRegistrationDeadline = (startDate) => {
        const deadline = new Date(startDate);
        deadline.setMinutes(deadline.getMinutes() - 20);
        setRegistrationDeadline(deadline.toLocaleString().slice(0, -3));
    };
    const parseDate = (dateString) => {
        const parts = dateString.split(/[,.: ]+/);
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        const hours = parseInt(parts[3], 10);
        const minutes = parseInt(parts[4], 10);
        return new Date(year, month, day, hours, minutes);
    };

    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const response = await GetTournaments.fetchTournamentById(tournamentId);
                setTournament(response.data);
                calculateRegistrationDeadline(response.data.startDate);
            } catch (error) {
                console.error('Error fetching tournament:', error);
                setTournamentNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchTournament();
    }, [tournamentId]);

    
    useEffect(() => {
        const checkDeadlineAndMaxPlayers = () => {
            if (!registrationDeadline || !tournament) {
                return;
            }
            
            const deadlineDate = parseDate(registrationDeadline);
            const currentDate = new Date(); // Текущая дата
            
            if (tournament.participants.length >= tournament.maxPlayers && tournament.tourState !== false) {
                console.log('Максимальное количество участников достигнуто');
                setTournament(prevTournament => ({ ...prevTournament, tourState: false }));
            }
            
            if (currentDate >= deadlineDate && tournament.tourState !== false) {
                console.log('Дедлайн регистрации наступил');
                setTournament(prevTournament => ({ ...prevTournament, tourState: false }));
            }
        };
        
        checkDeadlineAndMaxPlayers();
    }, [tournament, registrationDeadline]);
    
    
    
    
    
    
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
    ///Prize Money Calculating ////
    
    const prizeMoney = tournament ? ((tournament.fee / 100) * 75) * tournament.participants.length : 0;
    const firstPlaceMoney = (prizeMoney / 100) * 55
    const secondPlaceMoney = (prizeMoney / 100) * 30
    const thirdPlaceMoney = (prizeMoney / 100) * 15
    
    
    ///////////////////////////////
    
    
    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center gap-2 text-white" style={{ height: '100vh' }}>
                <ClipLoader color={'#299cff'} />
                <h3> Заружается данные </h3>
            </div>
        );
    }
    
    if (tournamentNotFound) {
        
        setTimeout(() => {
            setTournamentNotFound(true);
        }, 2000);
        
        return (
            <div className="d-flex flex-column justify-content-center align-items-center gap-2 text-white" style={{ height: '100vh' }}>
                <img src={ErrorImage} alt={'errorImage'}/>
                <h3> UPPSSS...
                    Турнир не найден </h3>
                <Link to='/'> <Button variant={'primary'}>На главную</Button></Link>
            </div>
        );
    }
    
    return (
       <>
           <Helmet>
             <title> {tournament.name} - Pubg.Com.Kg</title>
           </Helmet>
           <Header />
           <Container>
               <div className="tournament-page-title">
                   <h1>{tournament.name} </h1>
               </div>
               <div className="row">
                   <div className="col-6">
                       <div className="cover-img">
                           <img src={tournament.image}
                                alt="cover-tournament"
                                width={'100%'}/>
                           <div className="deadline-time-and-add-button left_side">
                               <div className="deadline-time">
                                   <ReportGmailerrorredIcon
                                       sx={{background: 'none',
                                            marginRight: '3px'}} />
                                   Регистрация до:
                                   <p> {registrationDeadline} </p>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="col-6">
                       <div className="info-box">
                           <div className="tournament-info left-page">
                               Дата :
                               <h4>
                                   {formatDate(tournament.startDate)}
                                   |
                                    {formatTime(tournament.startDate)}
                               </h4>
                           </div>
                           <div className="tournament-info left-page">
                               Карта:
                               <h4> {tournament.map}  </h4>
                           </div>
                           <div className="tournament-info left-page">
                               Формат :
                               <h4>  {tournament.tournamentType} </h4>
                           </div>
                           <div className="tournament-info left-page">
                               Взнос :
                               <h4> {tournament.fee} сом  </h4>
                           </div>
                           <div className="tournament-info left-page">
                               макс.число участников :
                               <h4> {tournament.maxPlayers}  </h4>
                           </div>
                           <div className="tournament-info left-page">
                               мин.число участников :
                               <h4> {tournament.minPlayers}  </h4>
                           </div>
                       </div>
                       <div className="deadline-time-and-add-button">
                           <div className="deadline-time-right-side">
                               <ReportGmailerrorredIcon sx={{background: 'none',
                                                             marginRight: '3px'}} />
                               Регистрация до:
                               <p>
                                   {registrationDeadline}
                               </p>
                           </div>
                           <div className="add-button">
                               <Button  variant={'success'}
                                        disabled={!tournament.tourState || tournament.endState}
                                        role="status"
                                        style={{cursor: "auto"}}>
                                   <CachedIcon  sx={{background: 'none',
                                                     marginRight: '3px'}} />
                                   {tournament.tourState ? "Идет набор" : "Набор закрыто"}
                                   
                               </Button>
                                   <Button variant={'danger'}
                                           disabled={tournament.tourState === false }>
                                       <ControlPointIcon
                                           sx={{background: 'none',
                                               marginRight: '3px'}}/>
                                       <Link to={`/tournament/${tournament._id}/participate`} style={{ background: "none", color: "white"}}>
                                           {tournament.tourState  ? "Участвовать" : "Закрыто"}
                                       </Link>
                                   </Button>
                              
                           </div>
                       </div>
                   </div>
               </div>
               <div className="timer">
                   <h3> Осталось:  </h3> <h3> <Timer deadline={tournament.startDate} /> </h3>
               </div>
               <div className="prize-found">
                   <SavingsIcon  fontSize={'large'}  sx={{background: 'none',
                                        marginRight: '3px'}}/>
                   Призовой фонд :
                   <span> {prizeMoney} сом </span>
                   <p className={'ps-prize-money'}>
                       * Призовой фонд зависит от количество участников </p>
               </div>
               <div className="line"
                    style={{backgroundColor: "silver",
                        width: "100%",
                        height: "1px",
                        marginBottom: '15px'
                    }}></div>
               <div className="tournament-page-title">
                   <h1> Призы </h1>
               </div>
               <div className="places d-flex justify-content-around">
                           <div className="prize-place">
                               <p>2 Место</p>
                               <img src={SecondPlaceIcon}
                                    alt="SecondPlaceIcon"/>
                               <p className={'win-money'}> {secondPlaceMoney} сом</p>
                           </div>
                           <div className="prize-place ">
                               <p>1 место </p>
                               <img src={FirstPlaceIcon}
                                    alt="FirstPlaceIcon"/>
                               <p className={'win-money'}>{firstPlaceMoney} сом</p>
                           </div>
                           <div className="prize-place">
                               <p> 3 место </p>
                               <img src={ThirdPlaceIcon}
                                    alt="ThirdPlaceIcon"/>
                               <p className={'win-money'}>{thirdPlaceMoney} сом</p>
                           </div>
               </div>
               <div className="line"
                    style={{backgroundColor: "silver",
                        width: "100%",
                        height: "1px",
                        marginBottom: '15px',
                        marginTop: '15px'
                    }}></div>
               <div className="tournament-page-title">
                   <h1> Участники </h1>
                   <h2> # {tournament.participants.length} / {tournament.maxPlayers}</h2>
               </div>
               <div className="participation-container">
                   <div className="participation-tag">
                       <div className="place-and-name">
                           <p> Место </p>
                           <p> Ник </p>
                       </div>
                       <div className="kill-and-prizeMoney">
                           <p> Килл </p>
                           <p> Выигрыш </p>
                       </div>
                   </div>
                   <div className="participation">
                       {tournament.participants.map((e) => (
                           <>
                               <Link to={`/player/${e.userId}`}>
                                   <div key={e.userId} className="participation-data">
                                       <div className="place-and-name">
                                           <p> {e.place}</p>
                                           <div className="player-avatar-and-name">
                                               <Avatar
                                                   alt="player-avatar"
                                                   src={e.avatar}
                                                   sx={{width: 40, height: 40}}
                                               ></Avatar>
                                               <p>{e.pubgNick}</p>
                                           </div>
                                       </div>
                                       <div className="kill-and-prizeMoney-data">
                                           <p>{e.kill}</p>
                                           <p>{e.prizeMoney} com</p>
                                       </div>
                                   </div>
                               </Link>
                           </>
                       
                       ))}
                   </div>
               </div>
           </Container>
           <BottomNavigationBar />
       </>
    );
};

export default TournamentPage;