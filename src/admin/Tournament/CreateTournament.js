import {observer} from "mobx-react-lite";
import React, {useContext, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import Datetime from "react-datetime";
import {Link} from "react-router-dom";
import {Context} from "../../index";
import "../adminStyle.css"

const CreateTournament = () => {
    const {tourStore} = useContext(Context)

    const [name, setName] = useState('');
    const [image , setImage] = useState('');
    const [startDate , setStartDate] = useState(new Date());
    const [map , setMap] = useState('');
    const [tournamentType , setTournamentType] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [minPlayers, setMinPlayers] = useState(0);
    const [tourState, setTourState] = useState(true);
    const [endState, setEndState] = useState(false);
    const [fee, setFee] = useState(0);


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.value);
    };
    
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    const handleMapChange = (e) => {
        setMap(e.target.value);
    };
    const handleTournamentTypeChange = (e) => {
        setTournamentType(e.target.value);
    };
    const handleMaxPlayersChange = (e) => {
        setMaxPlayers(Number(e.target.value));
    };
    const handleMinPlayersChange = (e) => {
        setMinPlayers(Number(e.target.value));
    };
    const handleTourStateChange = (e) => {
        setTourState(e.target.checked);
    };
    const handleEndStateChange = (e) => {
        setEndState(e.target.checked);
    };
    const handleFeeChange = (e) => {
        setFee(Number(e.target.value));
    };


    const  handleAddTournament = async () => {
        console.log(name, image, startDate, map, tournamentType, maxPlayers, minPlayers, tourState, endState, fee)
        try {
            await tourStore.addTournament(
                name,
                image,
                startDate,
                map,
                tournamentType,
                maxPlayers,
                minPlayers,
                tourState,
                endState,
                fee
            );
        }catch (e){
            console.log(e)
        }
    }





    return (
        <>
            <Container>
                <div className="home-page-link">
                    <Link to={'/admin-panel/pubg/www/main'}>
                        <Button variant={'primary'}
                                className={'page-navigation-buttons'}>На Главную </Button>
                    </Link>
                </div>
                <h1 className={'admin-welcome-tittle'}> Создать Турнир </h1>
                <div className={'create-form'}>
                    <div className="input-tittle-form">
                        <p className={'input-tittle'}> Название </p>
                        <input type="text"
                               className={'input-value-form'}
                               value={name}
                               onChange={handleNameChange}
                               required/>
                    </div>
                    <div className="input-tittle-form">
                        <p className={'input-tittle'}> Обложка </p>
                        <input type="text"
                               className={'input-value-form'}
                               value={image}
                               onChange={handleImageChange}
                               required/>
                    </div>
                    <div className="input-tittle-form">
                        <p className={'input-tittle'}> Дата </p>
                        <Datetime
                            value={startDate}
                            onChange={handleStartDateChange}
                            dateFormat="DD-MM-YYYY"
                            timeFormat="HH:mm"
                            locale="de"
                        />
                    
                    </div>
                    <div className="input-tittle-form">
                        <p className={'input-tittle'}> Карта </p>
                        <input type="text"
                               className={'input-value-form'}
                               value={map}
                               onChange={handleMapChange}
                               required/>
                    </div>
                    <div className="input-tittle-form">
                        <p className={'input-tittle'}> Тип Турнира </p>
                        <input type="text"
                               className={'input-value-form'}
                               value={tournamentType}
                               onChange={handleTournamentTypeChange}
                               required/>
                    </div>
                    <div className="input-tittle-form">
                        <p className={'input-tittle'}> Макс.Количе.Участников </p>
                        <input type="number"
                               className={'input-value-form'}
                               value={maxPlayers}
                               onChange={handleMaxPlayersChange}
                               required/>
                    </div>
                    <div className="input-tittle-form">
                        <p className={'input-tittle'}> Мин.Количе.Участников </p>
                        <input type="number"
                               className={'input-value-form'}
                               value={minPlayers}
                               onChange={handleMinPlayersChange}
                               required/>
                    </div>
                    <div className="input-tittle-form">
                        <p className={'input-tittle'}> Состояние Набора "Открыто" или "Заполнен" </p>
                        <input
                            type="checkbox"
                            className={'input-value-form'}
                            checked={tourState}
                            onChange={handleTourStateChange}
                            required
                        />
                    </div>
                    <div className="input-tittle-form">
                        <p className={'input-tittle'}> Состояние Турнира "Идет" или "завершен" </p>
                        <input
                            type="checkbox"
                            className={'input-value-form'}
                            checked={endState}
                            onChange={handleEndStateChange}
                            required
                        />
                    </div>
                    <div className="input-tittle-form">
                        <p className={'input-tittle'}> Взнос </p>
                        <input type="number"
                               className={'input-value-form'}
                               value={fee}
                               onChange={handleFeeChange}
                               required/>
                    </div>
                    <Button variant={"success"}
                            onClick={handleAddTournament}>
                        Создать
                    </Button>
                </div>
            </Container>
        </>
    );
};

export default observer(CreateTournament);