import React, {useContext} from "react";
import {Button, Container} from "react-bootstrap";
import './admin-tournament-page-style.css'
import {Link} from "react-router-dom";
import {Context} from "../../index";
import AdminPageActualTournament from "./AdminPage-ActualTournament";
import AdminPageCompletedTournament from "./AdminPage-CompletedTournament";

const AdminPageAllTournament = () => {
	const { admin } = useContext(Context)
	
	
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
				<AdminPageActualTournament/>
				<div className="line my-5"></div>
				<AdminPageCompletedTournament />
			</Container>
	)
}

export default AdminPageAllTournament;