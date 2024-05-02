import React, {useContext} from 'react';
import {Button, Container} from "react-bootstrap";
import {Helmet} from "react-helmet";
import {Context} from "../../index";


const SuccessRegistrationPage = () => {
    const { store } = useContext(Context);
 

    return (
        <>
          <Helmet>
            <title> Добро Пожаловать</title>
          </Helmet>
          <Container>
            <div className="success-page">
              <h2 style={{
                color: "white",
                fontSize: '25px'
              }}>
                Добро пожаловать !!
              </h2>
              <div style={{
                color: "greenyellow",
                fontWeight: 'bold',
                fontSize: '26px', fontFamily: 'Play Bold, san-serif'
              }}>
                
                {store.user.pubgNick}
              
              </div>
              
              <p style={{
                color: 'white',
                fontSize: '23px',
                fontStyle: 'italic'
              }}>
                Спасибо за регистрацию в нашем приложении!!! <br/> Для завершения процесса регистрации,
                пожалуйста, подтвердите свой <br/> <mark style={{borderRadius: '5px'}}> адрес электронной почты </mark> ,
                перейдя по ссылке, отправленной на вашу почту.
              </p>
              
              <div>
                <Button>
                  <a href='/#' style={{textDecoration: "none", background: 'none', color: "white", margin: '20px '}}> На Главную </a>
                </Button>
              </div>
            </div>
          </Container>
        </>
    );
};

export default SuccessRegistrationPage;