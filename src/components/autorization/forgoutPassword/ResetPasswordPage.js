import {Switch} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Alert, Button, Container} from "react-bootstrap";
import {Helmet} from "react-helmet";
import {useNavigate, useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import AuthService from "../../../services/AuthService";
import BottomNavigationBar from "../../bottomNavigation/bottomNavigation";
import Header from "../../header/Header";
import './forgot-password.css'

const ResetPasswordPage = () => {
	const { userId } = useParams()
	const navigate = useNavigate()
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const [error, setError] = useState("")
	const [passwordChangeStatus, setPasswordChangeStatus] = useState({
		loading: false,
		success: false,
		error: false
	});
	
	
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};
	
	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};
	
	useEffect(() => {
		setPasswordsMatch(password === confirmPassword);
	}, [password, confirmPassword]);
	
	const handleChangePassword = async () => {
		setPasswordChangeStatus({ loading: true, success: false, error: false });
		try {
			await AuthService.changePassword(userId, password)
			setPasswordChangeStatus({loading: false, success: true, error: false})
			
		} catch (error) {
			setPasswordChangeStatus({ loading: false, success: false, error: true })
			setError(error.message);
		}
	}
	
	const renderAlert = () => {
		if (passwordChangeStatus.success) {
			return <Alert variant="success"> Пароь успешно изменен !!  </Alert>;
		} else if (passwordChangeStatus.error) {
			return <Alert variant="danger" className={'text-center'}>{error}</Alert>;
		}
		return null;
	};
	if (passwordChangeStatus.success) {
		setTimeout(() => {
			navigate("/authorization") ;
		},1000);
	}
	
	
	return (
			<>
				<Helmet>
					<title> Создать новый пароль - PUBG.COM.KG</title>
				</Helmet>
				<Header />
				<Container>
					<div className="forgot-password-page-title">
						<p> Создайте новый пароль </p>
					</div>
					{renderAlert()}
					<div className="forgot-password-input-container">
						<input type={showPassword ? 'text' : 'password'}
						       placeholder={'Новый пароль'}
						       value={password}
						       onChange={handlePasswordChange}/>
						<input type={showPassword ? 'text' : 'password'}
						       placeholder={'Повторите новый пароль'}
						       value={confirmPassword}
						       onChange={handleConfirmPasswordChange}/>
						{!passwordsMatch && (
								<Alert variant="danger" style={{marginTop: '5px'}}>
									Пароли не совпадают!
								</Alert>
						)}
						<Switch onChange={handleTogglePassword} color='secondary' > Показать пароль </Switch>
						<Button
						 onClick={handleChangePassword}>
							{passwordChangeStatus.loading ? <ClipLoader color={'#fff'} size={20}/> : "Сохранить"}
						</Button>
					</div>
				</Container>
				<BottomNavigationBar/>
			</>
	)
}
export default ResetPasswordPage;