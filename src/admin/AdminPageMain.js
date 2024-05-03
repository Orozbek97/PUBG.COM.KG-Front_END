import React, {useContext, useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import './adminStyle.css'
import {Link, useNavigate} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {Context} from "../index";
import AdminPageActualTournament from "./Tournament/AdminPage-ActualTournament";

const AdminPageMain = () => {
    const { admin } = useContext(Context)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    
    
    
    useEffect(() => {
        admin.checkAuth().then(() => {
            setIsLoading(false);
        });
    }, [admin.isAuth]);
    
    if (isLoading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center gap-3" style={{height: '100vh'}}>
                <h4 className={'text-white'}> загрузка </h4>
                <ClipLoader color={'#4679ef'} />
            </div>
        )
    }
    
    if (!admin.isAuth) {
        return (
           navigate('/admin-panel/pubg/www/auth')
        );
    }
   
    
    
    
    return (
        <>
            <Container>
                <div className={'admin-header'}>
                    <h1> Админ Панель </h1>
                    <div className="admin-login-logout">
                        <h3> {admin.admin.login}  </h3>
                        <div className="admin-logout-button">
                            <Link to='/admin-panel/pubg/www/auth'>
                                <Button variant={'danger'}
                                        onClick={() => admin.logout()}> Выйти
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="line my-5"></div>
                <div className="admin-page-button-box">
                    <div className="admin-page-button">
                        <Link to='/admin-panel/pubg/www/tournament/create-tournament'>
                            <Button variant={'danger'}>
                                Создать новый турнир
                            </Button>
                        </Link>
                    </div>
                    <div className="admin-page-button">
                        <Link to='/admin-panel/pubg/www/tournament/all'>
                            <Button variant={'primary'}>
                                Все Турниры
                            </Button>
                        </Link>
                    </div>
                    <div className="admin-page-button">
                        <Link to='/admin-panel/pubg/www/player/all'>
                            <Button variant={'success'}>
                                Все Игроки
                            </Button>
                        </Link>
                    </div>
                </div>
                
                {/*ActualTournament*/}
                <AdminPageActualTournament/>
                
                <div className="line my-5"></div>
            
            </Container>
        </>
    );
};

export default AdminPageMain;