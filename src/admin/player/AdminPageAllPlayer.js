import {Box, Modal, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import './admin-player-page-style.css'
import {Link, useNavigate} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {Context} from "../../index";
import AdminService from "../../services/AdminService";
import UserService from "../../services/UserService";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'dark',
	border: '2px solid #000',
	borderRadius: '15px',
	boxShadow: 24,
	p: 4,
};

const AdminPageAllPlayer = () => {
	const { admin } = useContext(Context)
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState("");
	const [open, setOpen] = React.useState(false);
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
	
	

	
	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await UserService.fetchUsers();
				setUsers(response.data);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		};
		
		getUsers();
	}, []);
	
	const handleDeletePlayer = async (userId) => {
			try {
				await AdminService.deletePlayer(userId);
				const response = await UserService.fetchUsers();
				setUsers(response.data);
				handleClose(true)
			} catch(error) {
				console.error("Ошибка при удалении пользователя:", error);
			}
	}
	
	const handleOpen = (userId) => {
		setOpen(prevState => ({
			...prevState,
			[userId]: true
		}));
	};
	
	const handleClose = (userId) => {
		setOpen(prevState => ({
			...prevState,
			[userId]: false
		}));
	};
	
	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value);
	};
	
	const handleSortChange = (event) => {
		setSortBy(event.target.value);
	};
	
	const sortedUsers = [...users].sort((a, b) => {
		if (sortBy === "name") {
			return a.name.localeCompare(b.name);
		} else if (sortBy === "prizeMoney") {
			return b.statistic.prizeMoney - a.statistic.prizeMoney;
		}  else if (sortBy === "kill") {
			return b.statistic.kill - a.statistic.kill;
		} else if (sortBy === "game") {
			return b.statistic.game - a.statistic.game;
		} else if (sortBy === "firstPlace") {
			return b.statistic.firstPlace - a.statistic.firstPlace;
		} else if (sortBy === "secondPlace") {
			return b.statistic.secondPlace - a.statistic.secondPlace;
		} else if (sortBy === "thirdPlace") {
			return b.statistic.thirdPlace - a.statistic.thirdPlace;
		}
		return 0;
	});
	
	const filteredUsers = sortedUsers.filter((user) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.pubgNick.toLowerCase().includes(searchQuery.toLowerCase())
	);
	
	if (loading) {
		return (
				<div className="d-flex flex-column justify-content-center align-items-center gap-2" style={{ height: '30vh' }}>
					<ClipLoader color={'#299cff'} />
					<h3> Загружаются данные </h3>
				</div>
		);
	}
	
	return (
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
				<div className="admin-page-title">
					<h2>Все игроки </h2>
				</div>
				<div className="search-and-sort-bar">
					<div className="search-bar">
						<input
								type="text"
								placeholder="Поиск игроков"
								value={searchQuery}
								onChange={handleSearchInputChange}
						/>
					</div>
					<div className="sort-bar">
						<select value={sortBy} onChange={handleSortChange}>
							<option value="">Сортировать по..</option>
							<option value="name">Имени</option>
							<option value="prizeMoney">Сумме выигрыша</option>
							<option value="game"> Количество игр</option>
							<option value="kill"> Килл </option>
							<option value="firstPlace">ТОП 1</option>
							<option value="secondPlace">ТОП 2</option>
							<option value="thirdPlace">ТОП 3</option>
						</select>
					</div>
				</div>
				<div className="row row-cols-lg-4 row-cols-md-2 row-cols-2">
					{filteredUsers.map((player , index) => (
							<div key={player.email} className="col my-2">
								<div className="admin-page-player-box">
									<div className="admin-page-player-index">
										<p>{index + 1}</p>
									</div>
									<div className="admin-page-player-name">
										<h4> {player.name}</h4>
									</div>
									<div className="admin-page-player-name">
										<p> {player.pubgNick}</p>
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
													<p>ТОП 1: </p> <p> {player.statistic.firstPlace}</p>
												</div>
												<div className="admin-page-player-statistic-data">
													<p>ТОП 2: </p> <p> {player.statistic.secondPlace}</p>
												</div>
												<div className="admin-page-player-statistic-data">
													<p>ТОП 3: </p> <p> {player.statistic.thirdPlace} </p>
												</div>
											</div>
										</div>
									</div>
									<div className="admin-tournament-button">
										<Button variant={'success'}>
											<Link to={`/admin-panel/pubg/www/player/id/${player._id}`}>
												Изменить
											</Link>
										</Button>
										
										<Button variant={'danger'} onClick={() => handleOpen(player._id)}> Удалить </Button>
									</div>
									<Modal
											keepMounted
											open={open[player._id]}
											onClose={() => handleClose(player._id)}
											aria-labelledby="keep-mounted-modal-title"
											aria-describedby="keep-mounted-modal-description"
									>
										<Box sx={style}>
											<Typography id="keep-mounted-modal-title" variant="h6" component="h2" style={{color: "white", background: 'none'}}>
												Удалить {player.name} ?
											</Typography>
												<div className="admin-tournament-button d-flex flex-row">
													<Button variant={'secondary'} onClick={() => handleClose(player._id)}> Нет </Button>
													<Button variant={'danger'} onClick={() => handleDeletePlayer(player._id)}> Да </Button>
													
												</div>
										</Box>
									</Modal>
								
								</div>
							</div>
					))}
				</div>
			</Container>
	)
	
	
}

export default AdminPageAllPlayer;