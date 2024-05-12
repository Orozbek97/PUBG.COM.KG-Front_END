import EditIcon from "@mui/icons-material/Edit";
import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Container, Form} from "react-bootstrap";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import {Helmet} from "react-helmet";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {toast} from "react-toastify";
import $api from "../../http";
import {Context} from "../../index";
import GetTournaments from "../../services/GetTournaments";
import TournamentService from "../../services/TournamentService";
import BottomNavigationBar from "../bottomNavigation/bottomNavigation";
import Header from "../header/Header";
import defaultCheckImage from './images/checkImage.png';
import CopyIcon from './images/content_copy_icon.svg'
import MbankIcon from './images/mbank_icon_ellipse.png';
import SuccessIcon from './images/success-icon.png'
import './tournaments.css'
import "./tournament-page-style.css"


const PaymentPage = () => {
    const navigate = useNavigate();
    const { store } = useContext(Context);
    const { tournamentId } = useParams();
    const [tournament, setTournament] = useState(null);
    const [error, setError] = useState("");
    const [img, setImg] = useState(null);
    const [checkImage, setCheckImage] = useState(null);
    const [copyStatus, setCopyStatus] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [rulesAccepted, setRulesAccepted] = useState(false);
    
    const Server_URL =  process.env.REACT_APP_SERVER_URL;
    const paymentNumber = '0777814197'
    const onCopyText = () => {
        setCopyStatus(true);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
            setCopyStatus(false);
        }, 2000);
    };
    const handleCheckboxChange = (event) => {
        setRulesAccepted(event.target.checked);
    };
    
    
    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const response = await GetTournaments.fetchTournamentById(tournamentId);
                setTournament(response.data);
            } catch (error) {
                console.error('Error fetching tournament:', error);
            }
        };
        
        fetchTournament();
    }, [tournamentId]);
    
    const sendPaymentImage = React.useCallback( async () => {
        try {
            const  data = new FormData()
            data.append('paymentImage', img)
            const response =   await  $api.post('/upload-checkImage', data ,{
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            });
                setCheckImage(response.data.path)
        } catch (error) {
            console.log(error)
        }
    }, [img])
    
    const paymentImage = `${Server_URL}${checkImage}`;
    
    const participateInTournament = async () => {
        setIsLoading(true);
        try {
            const response = await TournamentService.participateInTournament(
                tournamentId,
                store.user.id,
                store.user.pubgNick,
                store.user.image,
                store.user.name,
                store.user.phoneNumber,
                store.user.pubgId,
                paymentImage
                );
            setIsLoading(false);
            setShowToast(true);
            toast.success("Аватар успешно сохранен!");
            setTimeout(() => {
                setShowToast(false);
                navigate(`/tournament/id/${tournament._id}`);
            }, 1000);
        } catch (error) {
            setIsLoading(false)
            setError(error.response.data.message)
        }
    };
    
    if (!tournament) {
        return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-3"
                    style={{height: '100vh'}}>
            <h4 className={'text-white'}> загрузка </h4>
            <ClipLoader color={'#4679ef'}/>
        </div>
        )
    }
    if (isLoading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center gap-3"
                 style={{height: '100vh'}}>
                <h4 className={'text-white'}> загрузка </h4>
                <ClipLoader color={'#4679ef'} />
            </div>
        )
    }
    if (!store.isAuth) {
        return (
            <>
                <div className="d-flex flex-column justify-content-center align-items-center gap-3" style={{height: '100vh'}}>
                    <h3 className={'text-white'}> Вы не авторизованы </h3>
                    <Link to={'/authorization'} style={{textDecoration: "none"}}>
                        <Button variant={'danger'}>Авторизоваться</Button>
                    </Link>
                    <h3 className={'text-white'}> или </h3>
                    <Link to={'/'} style={{textDecoration: "none"}}>
                        <Button variant={'info'}> Назад </Button>
                    </Link>
                
                </div>
            </>
        
        )
    }
    
    return (
        <>
            <Helmet>
                <title> Страница оплаты - {tournament.name} </title>
            </Helmet>
            <Header />
            <Container>
                <div className="participation-page-title">
                    <h3>Оплата и регистрация на турнир</h3>
                </div>
                <div className="payment-steps-title">
                    <h3> Шаг 1: Оплата участия </h3>
                </div>
                <div className="payment-steps">
                    <ul>
                        <li> Для участия в турнире необходимо оплатить участие по следующему реквизиту:
                            <ol>
                                <li> Номер счета Mbank:
                                    <div className="payment-choice">
                                        <div className="mbank-visa-pay">
                                            <div className="icon-pay-choice">
                                                <img src={`${MbankIcon}`}
                                                     width={'40px'}
                                                     height={'35px'}
                                                     style={{background: 'none'}}
                                                     alt="Mbank Icon"/>
                                                <p> 0777 814 197 </p>
                                            </div>
                                            <div className="copy-btn" style={{background: 'none'}}>
                                                {!isCopied ? (
                                                    <CopyToClipboard text={paymentNumber} onCopy={onCopyText}>
                                                        <div className="copy-text">
                                                            <img
                                                                src={CopyIcon}
                                                                alt="Copy to clipboard"
                                                                style={{
                                                                    background: 'none',
                                                                    width: '40px',
                                                                    height: '35px'
                                                                }}
                                                            />
                                                        </div>
                                                    </CopyToClipboard>
                                                ) : (
                                                    <p>Скопировано!</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li> Сумма для оплаты:
                                    <div className="tournament-fee">
                                        <p> {tournament.fee} сом </p>
                                    </div>
                                </li>
                                <li> В комментарии платежа написать (необьязательно):
                                    <div className="tournament-fee">
                                        <p> {tournament.name}  </p>
                                    </div>
                                </li>
                            </ol>
                        </li>
                    </ul>
                </div>
                <div className="line"></div>
                <div className="payment-steps-title">
                    <h3> Шаг 2: Загрузка чека об оплате </h3>
                </div>
                <div className="payment-steps">
                    <ul>
                        <li><p> После оплаты, пожалуйста, загрузите чек об оплате (скриншот) ниже: </p></li>
                    </ul>
                </div>
                <div className="checkImage d-flex flex-column gap-3 my-2 mx-2 text-white">
                    <>
                        {
                            checkImage ?
                                <div className="success-payment-icon">
                                    <img src={`${SuccessIcon}`} alt="success-icon"
                                         style={{width: '80px', height: '80px', borderRadius: '10px'}}/>
                                    <p> чек загружен </p>
                                </div> :
                                <img src={`${defaultCheckImage}`} alt="check"
                                     style={{width: '100px', height: '100px', borderRadius: '10px'}}/>
                        }
                        <input type='file'
                               className='form-upload-input'
                               title='Загрузить свой чек'
                               accept="image/*"
                               onChange={e => setImg(e.target.files[0])}/></>
                    
                    <Button variant={'info'} className="mx-3 text-white" onClick={sendPaymentImage}>
                        Загрузить чек
                    </Button>
                </div>
                
                <div className="line"></div>
                <div className="payment-steps-title">
                    <h3> Шаг 3: Проверка данных </h3>
                </div>
                <div className="payment-steps">
                    <ul>
                        <li><p> После загрузки чека об оплате, ваше участие будет проверено нашей командой. Пожалуйста,
                            убедитесь, что ваши данные указаны корректно: </p>
                            <ul>
                                <li>
                                    <div className="tournament-fee my-1">
                                        <p>Имя: {store.user.name}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="tournament-fee my-1">
                                        <p>Ник: {store.user.pubgNick}  </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="tournament-fee my-1">
                                        <p>ID: {store.user.pubgId} </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="tournament-fee my-1">
                                        <p>Номер телефона: {store.user.phoneNumber} </p>
                                    </div>
                                    <div className="editor-box">
                                        <Link to={'/player/lc/setting/edit'} style={{textDecoration: "none"}}>
                                            <Button variant={'danger'} className={'editor-btn'}>
                                                <EditIcon sx={{background: "none", marginRight: "3px"}}/>
                                                Редактировать</Button>
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p>Номер телефона особенно важен, так как на него будет отправлено через WhatsApp
                                SMS-сообщение с паролем и ID комнаты для участия в турнире.</p>
                        </li>
                    </ul>
                
                </div>
                <div className="line"></div>
                <div className="payment-steps-title">
                    <h3> Шаг 4: Прочитать правила турнира </h3>
                </div>
                <div className="payment-steps">
                    <ul>
                        <li>
                            <p>Прежде чем приступить к участию в турнире, пожалуйста, внимательно ознакомьтесь с правилами:</p>
                        </li>
                        <Form.Check  aria-label="option 1"
                                     className={'rules-checkbox'}
                                     checked={rulesAccepted}
                                     onChange={handleCheckboxChange}/> Ознакомлен с <Link to='/tournament/rules'>правилами</Link>
                    </ul>
                </div>
                <div className="line"></div>
                {error && <Alert variant="danger"> {error} </Alert>}
                {showToast && <Alert variant="success"> Успех !! </Alert>}
                <Button onClick={participateInTournament}
                        className={'my-2 submit'}
                        disabled={!checkImage || !rulesAccepted || isLoading}>
                     { isLoading ? (
                    <ClipLoader color="#fff" size={20}/>
                    ) : (
                    " Участвовать"
                    )}
                </Button>
            </Container>
            <BottomNavigationBar />
        </>
    );
};

export default PaymentPage;
