import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Avatar} from '@mui/material';
import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import {Link} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import UserService from '../../services/UserService';
import './playerPage.css';

const Players = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await UserService.fetchUsers();
                const shuffledUsers = response.data.sort(() => Math.random() - 0.5); // Перемешиваем массив
                const firstTenUsers = shuffledUsers.slice(0, 10); // Выбираем первые 10 элементов
                setUsers(firstTenUsers);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };
        
        getUsers();
    }, []);
    
    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center gap-2" style={{height: '30vh'}}>
                <ClipLoader color={'#299cff'}/>
                <h3> Заружается данные </h3>
            </div>
        );
        
    }
    
    return (
        <>
            <div className="player-page-title">
                <h3> Игроки </h3>
            </div>
            <Container>
                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">
                    {users.map((user, index) => (
                        <div key={user.email} className="col my-1">
                            <Link to={`/player/${user._id}`}>
                                <div className="player-card">
                                    <div className="player-number-avatar">
                                        <div className="number-player">
                                            <p>{ index + 1 }</p>
                                        </div>
                                        <div className="player-avatar">
                                            <Avatar
                                                alt="player-avatar"
                                                src={user.image}
                                                sx={{ width: 40, height: 40 }}
                                            ></Avatar>
                                        </div>
                                    </div>
                                    <div className="player-name-nick">
                                        <h5 className="player-name">{user.name}</h5>
                                        <p className={'player-pubgNick'}>{user.pubgNick}</p>
                                    </div>
                                    <div className="player-win-money-next-icon">
                                        <div className="player-win-money">
                                            <p style={{color: 'silver'}}>Призовые:</p> <p>{user.statistic.prizeMoney} com </p>
                                        </div>
                                        <NavigateNextIcon sx={{background: 'none',
                                            color: 'white' }} />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default observer(Players);
