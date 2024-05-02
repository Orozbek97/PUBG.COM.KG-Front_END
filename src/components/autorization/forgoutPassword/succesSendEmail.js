import {Button, Container} from "react-bootstrap";
import './forgot-password.css'
import {Link} from "react-router-dom";

const SuccessSendEmail = () => {
	
	
	return (
			<>
				<Container>
					<div className="success-send-password-page-title">
						<p className='fs-3'> Письмо отправлено.</p>
						<p>На ваш адрес электронной почты было отправлено письмо со ссылкой для сброса пароля.</p>
						<p>Пожалуйста, проверьте свою почту и следуйте инструкциям в письме, чтобы сбросить пароль.</p>
						<p>Также проверьте папку со спамом, если вы не видите письма в основном почтовом ящике.</p>
					</div>
					<div className="btn-home">
						<Link to='/'> <Button variant='primary'>  На Главную </Button>  </Link>
					</div>
					
				</Container>
			</>
	)
}

export default SuccessSendEmail;