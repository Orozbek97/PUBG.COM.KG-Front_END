import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Button, Card, ListGroup} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import GetTournaments from "../../services/GetTournaments";
import "./tournaments.css";

const CompletedTournamentsMainPage = () => {
	const [tournaments, setTournaments] = useState([]);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const getTournaments = async () => {
			try {
				const response = await GetTournaments.fetchTournaments();
				const completedTournaments = response.data.filter(
						(tournament) => tournament.endState
				);
				// Сортируем по дате в убывающем порядке и берем первые два турнира
				const latestCompletedTournaments = completedTournaments
						.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
						.slice(0, 2);
				setTournaments(latestCompletedTournaments);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		};
		getTournaments();
	}, []);
	
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
	};
	
	if (loading) {
		return (
				<div
						className="d-flex flex-column justify-content-center align-items-center gap-2"
						style={{ height: "30vh" }}
				>
					<ClipLoader color={"#299cff"} />
					<h3>Загружается данные</h3>
				</div>
		);
	}
	
	return (
			<>
				<Container>
					<h3 className={"completed-tournament-title text-white"}>
						Завершенные Турниры
					</h3>
					<div className="row row-cols-lg-4 row-cols-md-3  row-cols-2 my-auto">
						{tournaments.map((tournament) => (
								<div key={tournament._id} className="col my-2">
									<div className="box">
										<Card className={"Card"}>
											<Card.Title className={"Card-title"}>
												{tournament.name}
											</Card.Title>
											<Card.Img variant="top" src={tournament.image} />
											
											<ListGroup className="list-group-flush">
												<ListGroup.Item className="List-Group-Item">
													Дата: <p>{formatDate(tournament.startDate)}</p>
												</ListGroup.Item>
												<ListGroup.Item className="List-Group-Item">
													Время:
													<p>
														{new Date(tournament.startDate).toLocaleTimeString(
																[],
																{ hour: "2-digit", minute: "2-digit" }
														)}
													</p>{" "}
												</ListGroup.Item>
												<ListGroup.Item className="List-Group-Item">
													Взнос: <p>{tournament.fee} сом</p>
												</ListGroup.Item>
											</ListGroup>
											<Card.Body className={"Card-Body"}>
												<Link to={`/tournament/id/${tournament._id}`}>
													<Button
															variant={"info"}
															style={{ width: "100%" }}
															className={"button-more-information"}
													>
														подробнее
													</Button>
												</Link>
											</Card.Body>
										</Card>
									</div>
								</div>
						))}
					</div>
				</Container>
			</>
	);
};

export default observer(CompletedTournamentsMainPage);
