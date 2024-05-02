import React, {useContext, useState} from "react";
import {Container} from "react-bootstrap";
import './admin-auth-style.css'
import {useNavigate} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {Context} from "../index";

const AdminAuth = () => {
	const { admin } = useContext(Context)
	const navigate = useNavigate();
	
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState("")
	const [isLoading , setIsLoading] = useState(false)
	
	const handleLoginChange = (e) => {
		setLogin(e.target.value);
	};
	
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	
	const handleLogin = async () => {
		setIsLoading(true);
		try {
			await admin.login(login, password);
			setIsLoading(false);
			navigate("/admin-panel/pubg/www/main")
		} catch (error) {
			setIsLoading(false);
			setError(error.message);
		}
	};
	
	
	
	return (
			<>
				<Container>
					<div className="login-box">
						<div className="login-container">
							<h3 className={'text-white'}>Админ панель</h3>
							<div className="login-form">
								<input type="text"
								       placeholder="Логин"
								       className="input-field"
								       value={login}
								       onChange={handleLoginChange}
								       required/>
								<input type="password"
								       placeholder="Пароль"
								       className="input-field"
								       value={password}
								       onChange={handlePasswordChange}
								       required/>
								<div className="button-container">
									<button
											className="login-button"
											onClick={handleLogin}>
										{isLoading ? (
												<ClipLoader color="#fff" size={20}/>
										) : (
												"Войти"
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</>
	)
	
}
export default AdminAuth;