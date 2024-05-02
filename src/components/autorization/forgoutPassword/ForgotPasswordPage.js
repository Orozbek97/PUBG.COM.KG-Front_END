import {observer} from "mobx-react-lite";
import {useState} from "react";
import {Alert, Button, Container} from "react-bootstrap";
import {Helmet} from "react-helmet";
import {useNavigate} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import AuthService from "../../../services/AuthService";
import BottomNavigationBar from "../../bottomNavigation/bottomNavigation";
import Header from "../../header/Header";
import './forgot-password.css'


const ForgotPasswordPage = () => {
	const navigate = useNavigate();
	const [email , setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("")
	
	const handleEmailChange= (e) => {
		setEmail(e.target.value)
	}
	const sendPasswordResetMail = async () => {
		setLoading(true)
		try {
			await AuthService.sendPasswordResetMail(email)
			setLoading(false)
			navigate('/auth/forgot-password/send/mail/success')
		} catch (error) {
			console.log(error)
			setError(error.message)
			setLoading(false)
		}
	}
	
	return (
			<>
				<Helmet>
					<title> Восстановление пароля - PUBG.COM.KG</title>
				</Helmet>
				<Header />
				<Container>
					<div className="forgot-password-page-title">
						<p> Для получение ссылки введите ваш E-Mail </p>
					</div>
					<div className="forgot-password-input-container">
						<input type={'text'}
						       placeholder={'E-Mail'}
						       value={email}
						       onChange={handleEmailChange}/>
						<Button disabled={loading
						} onClick={sendPasswordResetMail}>
							{loading ? <ClipLoader color={'#fff'} size={20}/> : "Отправить"}
						</Button>
						{error ? <Alert variant={'danger'}> {error}</Alert> : ''}
					</div>
				</Container>
				<BottomNavigationBar />
			</>
	)
}


export default observer(ForgotPasswordPage);