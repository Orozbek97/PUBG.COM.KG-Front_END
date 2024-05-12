import React from "react"
import {Container} from "react-bootstrap";
import {Helmet} from "react-helmet";
import BottomNavigationBar from "../bottomNavigation/bottomNavigation";
import Header from "../header/Header";
import './other-style.css'
import ScreenPayment from "./images/screen-payment-page.png"
import ScreenSignUp from "./images/screen-registration.png"
import ScreenTournament from "./images/screen-tournamnet.png"


const Instruction= () => {
	
	
	return (
			<>
				<Helmet>
					<title>  PUBG.COM.KG - Вопросы-Ответы	</title>
				</Helmet>
				<Header />
				<Container>
					<div className="other-page-title">
						<h1> Вопросы-Ответы </h1>
					</div>
					<div className="other-page-navigation">
						<a href="#addPlayer"><h3> Как учавствовать в турнире? </h3> </a>
						<a href="#takeMoney"><h3> Как получить выигрыш? </h3> </a>
					</div>
					<div className="other-page-small-container">
						<div className="small-container-title">
							<h3 id="addPlayer" > Как учавствовать в турнире? </h3>
						</div>
						<div className="small-container-box">
							<h4> Шаг 1: Регистрация на сайте </h4>
							<p> Убедитесь, что вся необходимая информация о вас введена корректно, включая никнейм , PUBG ID и
								контактные данные. </p>
							<div className="small-container-box-img">
								<img src={`${ScreenSignUp}`} alt="screen-signUp"/>
							</div>
						</div>
						<div className="small-container-box">
							<h4> Шаг 2: Выбор турнира и переход на страницу турнира </h4>
							<p> При выборе турнира обратите внимание на его формат, правила и призы, чтобы быть готовыми к
								участию. </p>
							<div className="small-container-box-img">
								<img src={`${ScreenTournament}`} alt="screen-signUp"/>
							</div>
						</div>
						<div className="small-container-box">
							<h4> Шаг 3: Участие в турнире</h4>
							<p> Перед нажатием на кнопку <mark> "Участвовать" </mark> , убедитесь, что вы
								готовы принять вызов и сможете выступить в установленное время.
							</p>
						</div>
						<div className="small-container-box">
							<h4> Шаг 4: Оплата участия </h4>
							<p> После нажатия кнопки <mark> "Участвовать" </mark> следуйте инструкциям для оплаты участия.
								Убедитесь, что вы сделали оплату в указанный срок, чтобы ваша регистрация была подтверждена.
								Загрузите чек об оплате на странице оплаты, согласно указанным инструкциям.
								Это необходимо для завершения процесса регистрации и получения допуска к участию в турнире.
							</p>
							<div className="small-container-box-img">
								<img src={`${ScreenPayment}`} alt="screen-signUp"/>
							</div>
						</div>
						<div className="small-container-box">
							<h4> Шаг 5: Подготовка к турниру </h4>
							<p> После успешной оплаты остается только ждать начала турнира. Проверьте свое оборудование,
								подготовьтесь к игре и ждите сообщения с номером комнаты и паролем, которое придет за 10 минут до начала
								турнира. </p>
						</div>
					</div>
					<div className="other-page-small-container">
						<div className="small-container-title">
							<h3 id="takeMoney"> Как получить выигрыш? </h3>
						</div>
						<div className="small-container-box">
							<ul>
								<li><p> Мы свяжемся с вами по номеру телефона,
									указанному при регистрации, и уточним, куда отправить выигрыш. </p></li>
								<li><p> Если вы по какой-либо причине не получили сообщение от нас, пожалуйста,
									свяжитесь с нами через <a href="https://t.me/dark_warriorr"> Telegram </a> , чтобы уточнить детали.
								</p></li>
							</ul>
						</div>
					</div>
				
				
				</Container>
				<BottomNavigationBar/>
			</>
	)
}

export default Instruction