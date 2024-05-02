import React, {useContext, useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";

import './admin-player-page-style.css'
import {Link, useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {Context} from "../../index";
import AdminService from "../../services/AdminService";
import UserService from "../../services/UserService";

const AdminPagePLayer = () => {
	const {admin} = useContext(Context)
	const {playerId} = useParams()
	const [player, setPlayer] = useState(null);
	const [buttonLoading, setButtonLoading] = useState(false)
	const [newFirstPlace, setNewFirstPlace] = useState(0);
	const [newSecondPlace, setNewSecondPlace] = useState(0);
	const [newThirdPlace, setNewThirdPlace] = useState(0)
	
	
	const handleFirstPlaceChange = (e) => {
	setNewFirstPlace(Number(e.target.value))
}
	const handleSecondPlaceChange = (e) => {
		setNewSecondPlace(Number(e.target.value))
	}
	const handleThirdPlaceChange = (e) => {
		setNewThirdPlace(Number(e.target.value))
	}
	
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
	
	const updatedPlayerTopPlace = async () => {
		setButtonLoading(true)
		try {
				await AdminService.updatePlayerTopPlace(
						playerId,
						newFirstPlace,
						newSecondPlace,
						newThirdPlace
				)
			const response = await UserService.fetchPlayerById(playerId);
			setPlayer(response.data);
			setButtonLoading(false)
		} catch (e) {
			console.log(e)
		}
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
			 <Container>
				 <div className={'admin-header'}>
					 <h1> Админ Панель </h1>
					 <div className="admin-login-logout">
						 <h3>  {admin.admin.login}  </h3>
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
				 <h3 className={'text-white'}>Информация о игрока </h3>
				 <div className="admin-panel-player-page-container">
					 <div className="admin-page-player-box">
						 <div className="admin-page-player-name">
							 <h4> {player.name}</h4>
						 </div>
						 <div className="admin-page-player-name">
							 <p>Ник: </p> <p> {player.pubgNick}</p>
						 </div>
						 <div className="admin-page-player-name">
							 <p>Pubg ID: </p> <p> {player.pubgId}</p>
						 </div>
						 <div className="admin-page-player-name">
							 <p>Телефон: </p> <p> {player.phoneNumber}</p>
						 </div>
						 <div className="admin-page-player-name">
							 <p>Email: </p> <p> {player.email}</p>
						 </div>
						 <div className="admin-page-player-avatar">
							 <img src={player.image} alt={'player-avatar'}/>
						 </div>
						 <div className="row">
							 <div className="col-6 ">
								 <div className="admin-page-player-statistic-box">
									 <div className="admin-page-player-statistic-data">
										 <p>Игры: </p> <p> {player.statistic.game}</p>
									 </div>
									 <div className="admin-page-player-statistic-data">
										 <p>Килл: </p> <p> {player.statistic.kill}</p>
									 </div>
									 <div className="admin-page-player-statistic-data">
										 <p>Деньги: </p> <p> {player.statistic.prizeMoney}</p>
									 </div>
								 </div>
							 </div>
							 <div className="col-6">
								 <div className="admin-page-player-statistic-box">
									 <div className="admin-page-player-statistic-data">
										 <p>ТОП 1: </p>
										 <p> {player.statistic.firstPlace}
											 <input type={'number'}
											        value={newFirstPlace}
											        onChange={handleFirstPlaceChange}/>
										 </p>
									 </div>
									 <div className="admin-page-player-statistic-data">
										 <p>ТОП 2: </p>
										 <p> {player.statistic.secondPlace}
											 <input type={'number'}
											        value={newSecondPlace}
											        onChange={handleSecondPlaceChange}/>
										 </p>
									 </div>
									 <div className="admin-page-player-statistic-data">
										 <p>ТОП 3: </p>
										 <p> {player.statistic.thirdPlace}
											 <input type={'number'}
											        value={newThirdPlace}
											        onChange={handleThirdPlaceChange}/>
										 </p>
									 </div>
								 </div>
							 </div>
						 </div>
					 </div>
					 <div className="admin-tournament-button my-3">
						 <Button variant={'success'} size={'lg'} onClick={updatedPlayerTopPlace}>
							 {buttonLoading ? <ClipLoader color={'#fff'} size={20}/> : 'Сохранит'}
						 </Button>
					 </div>
					
				 </div>
			 </Container>
	 )
}

export default AdminPagePLayer;