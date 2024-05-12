import React from "react"
import {Container} from "react-bootstrap";
import {Helmet} from "react-helmet";
import BottomNavigationBar from "../bottomNavigation/bottomNavigation";
import Header from "../header/Header";
import './other-style.css'


const AboutUs= () => {
	
	
	
	
	return (
			<>
				<Helmet>
				<title>О нас - PUBG.COM.KG</title>
			  </Helmet>
				<Header />
				<Container>
					<div className="other-page-title">
						<h1> О нас </h1>
					</div>
					<div className="small-container-box">
						<p>Мы команда PUBG.COM.KG, организующая захватывающие турниры по PUBG Mobile в Кыргызстане. 🎮</p>
						<p>Наша цель - создать веселое и соревновательное сообщество игроков, где каждый может проявить свои
							навыки и стать частью увлекательных соревнований. 🏆</p>
						<p>Мы стремимся сделать наши турниры доступными для всех уровней игроков - от новичков до опытных
							геймеров. 👨‍💻👩‍💻</p>
						<p>Каждый наш турнир проводится с соблюдением высоких стандартов честности, прозрачности и
							профессионализма. 🌟</p>
						<p>Следите за нашими новостями, чтобы быть в курсе всех предстоящих турниров и событий! 📢</p>
						<div className="about-page-soc-links">
							<a href="https://www.instagram.com/pubg_com_kg"> Наш Instagram</a> |
							<a href="https://t.me/pubg_com_kg"> Наш Telegram </a>
						</div>
						<div className="line my-1"></div>
						<h4>Наши ценности</h4>
						<ul>
							<li><mark>Лидерство:</mark> Мы стремимся быть лидерами в организации турниров по PUBG Mobile и в
								создании качественного игрового опыта для наших участников. 🚀
							</li>
							<li><mark>Сообщество:</mark> Мы ценим свое сообщество и стремимся создать дружелюбную и вдохновляющую
								среду для всех игроков. 🤝
							</li>
							<li><mark>Честность:</mark> Мы придерживаемся высоких стандартов честности, интегритета и прозрачности
								во всех аспектах нашей деятельности. 🎯
							</li>
							<li><mark>Инновации:</mark> Мы постоянно совершенствуем наши методы и подходы, чтобы предоставить
								лучший игровой опыт для наших участников. 🔧
							</li>
						</ul>
					</div>
				</Container>
				<BottomNavigationBar/>
			</>
	
	)
}

export default AboutUs;