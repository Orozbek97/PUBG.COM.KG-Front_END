import {Box, Modal, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import './admin-tournament-page-style.css'
import {Link} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import AdminService from "../../services/AdminService";
import GetTournaments from "../../services/GetTournaments";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'dark',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const AdminPageCompletedTournament = () => {
	const [tournaments, setTournaments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = React.useState(false);
	
	useEffect(() => {
		const getTournaments = async () => {
			try {
				const response = await GetTournaments.fetchTournaments();
				const completedTournaments = response.data.filter(tournament => tournament.endState);
				setTournaments(completedTournaments.map(tournament => ({ ...tournament, buttonLoading: false })));
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		};
		getTournaments();
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
	
	const handleCompleteTournament = async (tournamentId) => {
		setTournaments(prevTournaments => prevTournaments.map(tournament =>
				tournament._id === tournamentId
						? { ...tournament, buttonLoading: true }
						: tournament
		));
		try {
			await AdminService.completeTournament(tournamentId);
			const response = await GetTournaments.fetchTournaments();
			const updatedTournaments = response.data.filter(tournament => tournament.endState);
			setTournaments(updatedTournaments.map(tournament => ({ ...tournament, buttonLoading: false })));
			handleClose(true)
		} catch (error) {
			console.error("Ошибка при завершении турнира:", error);
		}
	};
	
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	
	if (loading) {
		return (
				<div className="d-flex flex-column justify-content-center align-items-center gap-2" style={{ height: '30vh' }}>
					<ClipLoader color={'#299cff'} />
					<h3> Заружается данные </h3>
				</div>
		);
	}
	
	return (
			<Container>
				<div className="admin-page-title">
					<h2>Завершенные Турниры </h2>
				</div>
				<div className="row row-cols-lg-4 row-cols-md-3 row-cols-2">
					{tournaments.map((tournament) => (
							<div key={tournament._id} className="col">
								<div className="admin-tournament-card-box">
									<h3> {tournament.name} </h3>
									<div className="admin-tournament-cover">
										<img src={tournament.image} alt='tournament-cover' />
									</div>
									<div className="admin-tournament-data-box">
										<div className="admin-tournament-data">
											<p> Дата/время :</p>
											<p>{formatDate(tournament.startDate)}</p> | <p>{formatTime(tournament.startDate)}</p>
										</div>
										<div className="admin-tournament-data">
											<p> Взнос:</p> <p> {tournament.fee} сом</p>
										</div>
										<div className="admin-tournament-data">
											<p> Карта:</p> <p> {tournament.map} </p>
										</div>
										<div className="admin-tournament-data">
											<p> Max.участ/Участ. : </p>
											<p> {tournament.maxPlayers} </p>| <p>{tournament.participants.length}</p>
										</div>
										<div className="admin-tournament-button">
											<Button variant='info'>
												<Link to={`/admin-panel/pubg/www/tournament/id/${tournament._id}`}>
													Подробнеее
												</Link>
											</Button>
											<Button
													variant={tournament.endState ? 'success' : 'danger'}
													onClick={handleOpen}
													disabled={tournament.buttonLoading}
											>
												{tournament.endState ? 'Возобновить' : 'Завершить'}
											</Button>
											<Modal
													keepMounted
													open={open}
													onClose={handleClose}
													aria-labelledby="keep-mounted-modal-title"
													aria-describedby="keep-mounted-modal-description"
											>
												<Box sx={style}>
													<Typography id="keep-mounted-modal-title" variant="h6" component="h2" style={{color: "white", background: 'none'}}>
														{tournament.endState ? `Возобновить ${tournament.name} ?` : ` Завершить ${tournament.name} ?` }
													</Typography>
													<div className="admin-tournament-button d-flex flex-row">
														<Button variant={'secondary'} onClick={handleClose}> Нет </Button>
														<Button
																variant={tournament.endState ? 'success' : 'danger'}
																onClick={() => handleCompleteTournament(tournament._id)}
																disabled={tournament.buttonLoading}
														>
															{tournament.buttonLoading ? <ClipLoader color= '#fff' size={20} /> : tournament.endState ? 'Возобновить' : 'Завершить'}
														</Button>
													</div>
												</Box>
											</Modal>
										</div>
									</div>
								</div>
							</div>
					))}
				</div>
			</Container>
	);
}

export default AdminPageCompletedTournament;
