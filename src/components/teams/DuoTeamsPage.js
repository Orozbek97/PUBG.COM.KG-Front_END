import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from 'react';
import "./accordion.css"
import {Button, Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import DuoTeamsService from "../../services/DuoTeams";
import BottomNavigation from "../bottomNavigation/bottomNavigation";
import Header from "../header/Header";
import BattleIcon from "./icons/battle.svg";
import ThirdPlaceIcon from "./icons/bronza.svg";
import FirstPlaceIcon from "./icons/gold.svg";
import KillIcon from "./icons/kill.svg";
import MoneyIcon from "./icons/money.svg";
import MoreInfoIcon from "./icons/more-information.svg";
import OutIcon from "./icons/out.svg";
import SecondPlaceIcon from "./icons/silver.svg";


const DuoTeamsPage = () => {
	const {duoteamId} = useParams();
	const [duoteam, setDuoTeam] = useState(null);
	
	useEffect( () => {
		const fetchDuoTeam = async () => {
			try {
				const response =  await DuoTeamsService.fetchDuoTeamById(duoteamId);
				setDuoTeam(response.data);
			} catch (e) {
				console.log(e);
			}
		};
		
		fetchDuoTeam();
	}, [duoteamId]);
	
	if (!duoteam) {
		return <div>loading...</div>
	}
	
	
	return (
			<>
				<Header />
				<Container>
					<h2 className={'page-tittle'}>
						Информация о команде
					</h2>
					<div className="row row-cols-lg-2 row-cols-1">
						<div className="col my-2">
							<div className="team-info-box">
								<div className="team-name">
									{duoteam.name}
								</div>
								<div className="participations-card">
									<div className={"participations-row"}> <p> Участник </p> <img src={MoreInfoIcon} alt={"IconMoreInfo"} /> </div>
									<div className={"participations-row"}> <p> Участник </p> <img src={MoreInfoIcon} alt={"IconMoreInfo"} /> </div>
									<div className={"participations-row"}> <p> Участник </p> <img src={MoreInfoIcon} alt={"IconMoreInfo"} /> </div>
									<div className={"participations-row"}> <p> Участник </p> <img src={MoreInfoIcon} alt={"IconMoreInfo"} /> </div>
								</div>
							</div>
						</div>
						<div className="col my-2">
							<div className="team-statistic">
								<h6> Статистика команды </h6>
								<div className="statistics-row">
									<div className="statistics-col">
										<div className="statistics-box">
											<img src={BattleIcon} alt="battles"/>
											<h6> {duoteam.statistics.amountGame} </h6>
										</div>
										<div className="statistics-box">
											<img src={KillIcon} alt="kills"/>
											<h6> {duoteam.statistics.amountKill} </h6>
										</div>
										<div className="statistics-box">
											<img src={MoneyIcon} alt="money"/>
											<h6>  {duoteam.statistics.sumPrizeMoney} </h6>
										</div>
									</div>
									<div className="statistics-col">
										<div className="statistics-box">
											<img src={FirstPlaceIcon} alt="top-1"/>
											<h6>  {duoteam.statistics.amountFirstPlace} </h6>
										</div>
										<div className="statistics-box">
											<img src={SecondPlaceIcon} alt="top-2"/>
											<h6>  {duoteam.statistics.amountSecondPlace} </h6>
										</div>
										<div className="statistics-box">
											<img src={ThirdPlaceIcon} alt="top-3"/>
											<h6>  {duoteam.statistics.amountThirdPlace} </h6>
										</div>
									</div>
								</div>
							</div>
							<div className="button-out my-2">
								<Button><img src={OutIcon} alt="icon-button-out"/> Покинуть команду </Button>
							</div>
						</div>
					</div>
				</Container>
				<BottomNavigation/>
			</>
	);
};

export default observer(DuoTeamsPage)