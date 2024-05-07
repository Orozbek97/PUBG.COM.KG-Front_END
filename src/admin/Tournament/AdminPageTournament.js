import {Box, Modal} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import './admin-tournament-page-style.css'
import {Link, useNavigate, useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {Context} from "../../index";
import AdminService from "../../services/AdminService";
import GetTournaments from "../../services/GetTournaments";


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	height: 600,
	boxShadow: 24,
};

const AdminPageTournament = () => {
	const { tournamentId } = useParams();
	const [tournament, setTournament] = useState(null);
	const [loading, setLoading] = useState(true);
	const [buttonLoading , setButtonLoading] = useState(null)
	const [registrationDeadline, setRegistrationDeadline] = useState("");
	const [tournamentNotFound, setTournamentNotFound] = useState(false);
	const [openImages, setOpenImages] = useState({});
	const [participantResults, setParticipantResults] = useState({});
	const { admin } = useContext(Context)
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	
	
	
	useEffect(() => {
		if (isLoading) {
			return;
		}
		
		admin.checkAuth().then(() => {
			setIsLoading(false);
		});
	}, [admin.isAuth, isLoading]);
	
	
	
	useEffect(() => {
		if (!admin.isAuth) {
			navigate('/admin-panel/pubg/www/auth');
		}
	}, [admin.isAuth, navigate]);
	
	
	
	const handleChangeResultKill = (participantId, value) => {
		setParticipantResults(prevState => ({
			...prevState,
			[participantId]: {
				...prevState[participantId],
				kill: value
			}
		}));
	};
	
	const handleChangeResultPlace = (participantId, value) => {
		setParticipantResults(prevState => ({
			...prevState,
			[participantId]: {
				...prevState[participantId],
				place: value
			}
		}));
	};
	
	const handleChangeResultMoney = (participantId, value) => {
		setParticipantResults(prevState => ({
			...prevState,
			[participantId]: {
				...prevState[participantId],
				prizeMoney: value
			}
		}));
	};
	
	
	
	
	
	const handleOpenImage = (imageId) => {
		setOpenImages({ ...openImages, [imageId]: true });
	};
	
	const handleCloseImage = (imageId) => {
		setOpenImages({ ...openImages, [imageId]: false });
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
	
	const calculateRegistrationDeadline = (startDate) => {
		const deadline = new Date(startDate);
		deadline.setMinutes(deadline.getMinutes() - 20);
		setRegistrationDeadline(deadline.toLocaleString().slice(0, -3));
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
	
	
	
	const updateResults = async () => {
		setButtonLoading(true)
		try {
			for (const participantId of Object.keys(participantResults)) {
				const participantResult = participantResults[participantId];
				if (participantResult) {
					await AdminService.tournamentResult(
							tournamentId,
							participantId,
							participantResult.kill,
							participantResult.prizeMoney,
							participantResult.place
					);
				}
				setButtonLoading(false)
			}
		} catch (e) {
			console.log(e);
		}
	};
	
	const handleRemoveParticipant = async (userId) => {
		setButtonLoading(userId); // Устанавливаем состояние для текущей нажатой кнопки
		try {
			await AdminService.removePlayerInTournament(tournamentId, userId);
			const updatedTournament = await GetTournaments.fetchTournamentById(tournamentId);
			setTournament(updatedTournament.data);
		} catch (error) {
			console.error('Ошибка при удалении участника из турнира:', error);
		} finally {
			setButtonLoading(null); // Сбрасываем состояние после завершения запроса
		}
	};
	
	
	
	
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
	
	
	
	if (tournamentNotFound) {
		
		setTimeout(() => {
			setTournamentNotFound(true);
		}, 2000);
		
		return (
				<div className="d-flex flex-column justify-content-center align-items-center gap-2 text-white" style={{ height: '100vh' }}>
					<h3> UPPSSS...
						Турнир не найден </h3>
					<Link to='/admin-panel/pubg/www/main'> <Button variant={'primary'}>На главную</Button></Link>
				</div>
		);
	}
	
	return (
			<Container>
				{ tournament ? (
						<>
							<div className="admin-page-title">
								<h2>Информация о Турнире </h2>
							</div>
							<h2 className={'text-white bg-primary'}>{tournament.name}</h2>
							<div className="admin-tournament-data-box">
								<div className="admin-tournament-data">
									<p> Дата:</p> <p>{formatDate(tournament.startDate)}</p> / <p>{formatTime(tournament.startDate)}</p>
								</div>
								<div className="admin-tournament-data deadline-data">
									<p> Дедлайн:</p> <p> {registrationDeadline} </p>
								</div>
								<div className="admin-tournament-data">
									<p> Карта:</p> <p> {tournament.map} </p>
								</div>
								<div className="admin-tournament-data">
									<p> Формат:</p> <p> {tournament.tournamentType} </p>
								</div>
								<div className="admin-tournament-data">
									<p> Взнос:</p> <p> {tournament.fee} сом</p>
								</div>
								<div className="admin-tournament-data">
									<p> Макс.число:</p> <p> {tournament.maxPlayers} </p>
								</div>
								<div className="admin-tournament-data">
									<p> Мин.Число:</p> <p> {tournament.minPlayers} </p>
								</div>
								<div className="admin-tournament-data money-data">
									<p> Призовой фонд:</p> <p> {prizeMoney} сом</p>
								</div>
								<div className="admin-tournament-data money-data">
									<p> За 1-е место:</p> <p> {firstPlaceMoney} сом</p>
								</div>
								<div className="admin-tournament-data money-data ">
									<p> За 2-е место:</p> <p> {secondPlaceMoney} сом</p>
								</div>
								<div className="admin-tournament-data money-data">
									<p> За 3-е место:</p> <p> {thirdPlaceMoney} сом</p>
								</div>
								<div className="admin-tournament-data tournament-status">
									<p> Статус:</p>
									{!tournament.endState && tournament.tourState ?
											(<p> Идет регистирация </p>)
											:
											(<p className={'text-white bg-danger'}> Регистирация завершена </p>)}
								</div>
							</div>
							<div className="admin-page-title">
								<h2>Участники </h2>
								<p className={'admin-participant-data-index'}> {tournament.participants.length} </p>
							</div>
							{tournament.participants.map((participant, index) => (
									<div key={participant.userId} className="admin-tournament-data-box admin-participant-data">
										<div className="admin-tournament-data_and_delete-button">
											<div className="admin-tournament-data participant-list">
												<div className="admin-tournament-data participant-list tournament-player-data-list">
													<h5> Информация | </h5>
												</div>
												<div className="admin-tournament-data participant-list tournament-player-data-list">
													<h5> Имя: </h5> <p> {participant.name} </p>
												</div>
												<div className="admin-tournament-data participant-list tournament-player-data-list">
													<h5> Ник: </h5> <p> {participant.pubgNick} </p>
												</div>
												<div className="admin-tournament-data participant-list tournament-player-data-list">
													<h5> ID: </h5>  <p>  {participant.pubgId} </p>
												</div>
												<div className="admin-tournament-data participant-list tournament-player-data-list">
													<h5> Телефон: </h5>  <p> {participant.phone}</p>
												</div>
												<div className="admin-tournament-data participant-list tournament-player-data-list">
													<h5>Чек: </h5>
													<>
														<div onClick={() => handleOpenImage(participant.userId)} className="paymentImage">
															<img src={participant.checkImage} alt={'paymentImage'}/>
														</div>
														<Modal
																open={openImages[participant.userId] || false}
																onClose={() => handleCloseImage(participant.userId)}
														
														>
															<Box sx={style}>
																<img src={participant.checkImage} alt={'paymentImage'}
																     style={{width: '100%', height: '100%'}}/>
															</Box>
														</Modal>
													</>
												</div>
											</div>
											<div className="participant-delete-button d-flex flex-wrap gap-1">
												<Button variant={'danger'}
												        onClick={() => handleRemoveParticipant(participant.userId)}>
													{buttonLoading === participant.userId ? <ClipLoader color='#fff' size={20}/> : 'Удалить'}
												</Button>
												
												<Link to={`/admin-panel/pubg/www/player/id/${participant.userId}`} style={{background: 'none'}}>
													<Button>
														К игроку </Button>
												</Link>
											
											
											</div>
										</div>
										<div className="admin-tournament-data participant-list ">
											<p className={'admin-participant-data-index'}> {index + 1} </p>
											<div className="admin-tournament-data participant-list tournament-player-data-list">
												<h5> Статистика | </h5>
											</div>
											<div className="admin-tournament-data participant-list tournament-player-data-list">
												<h5> Место: </h5> <p> {participant.place} </p>
												<input
														type={"text"}
														value={participantResults[participant._id]?.place || ''}
														onChange={(e) => handleChangeResultPlace(participant._id, e.target.value)}
												/>
											</div>
											<div className="admin-tournament-data participant-list tournament-player-data-list">
												<h5> Килл: </h5> <p> {participant.kill} </p>
												<input
														type={"text"}
														value={participantResults[participant._id]?.kill || ''}
														onChange={(e) => handleChangeResultKill(participant._id, e.target.value)}
												/>
											</div>
											<div className="admin-tournament-data participant-list tournament-player-data-list">
												<h5> Сумма выигрыша: </h5>  <p>  {participant.prizeMoney} </p>
												<input type={"text"}
												       value={participantResults[participant._id]?.prizeMoney || ''}
												       onChange={(e) => handleChangeResultMoney(participant._id, e.target.value)}/>
											</div>
										</div>
									
									</div>
							))}
							<Button variant={'primary'} size={'lg'} onClick={updateResults}> {buttonLoading ?
									<ClipLoader color='#fff' size={20}/> : 'Сохранить результаты'} </Button>
						</>
				) : (
						<div className={"text-white"}>
							Загрузка данных
						</div>
				)}
			
			</Container>
	)
}
export default AdminPageTournament;