import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from 'react';
import {Accordion, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import SquadTeamsService from "../../services/SquadTeams";
import MoreInformation from './icons/more-information.svg';
import "./accordion.css"


const SquadTeamLists = () => {
    const [squadteams, setSquadTeams] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSquadTeams = async () => {
            try {
                const response = await SquadTeamsService.fetchSquadTeam()
                setSquadTeams(response.data)
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        getSquadTeams();
    }, []);

    if (loading) {
       return  <div className={"text-white"}> loading...</div>
    }


    return (
        <>
            <Container>
                <div className="row row-cols-md-2 row-cols-1">
                    {squadteams.map((squadteam, index) => (
                        <div key={squadteam._id} className={"col"}>
                            <div className="box">
                                <div className="row row-accordion">
                                    <div className="col-10 col-padding">
                                        <div className="box">
                                            <Accordion defaultActiveKey="0" className={'accordion'}>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>{index + 1}.  {squadteam.name} </Accordion.Header>
                                                    <Accordion.Body>
                                                        <p> Aytishnc</p>
                                                        <div className="line" style={{height: '2px'}} ></div>
                                                        <p> Aytishnc</p>
                                                        <div className="line" style={{height: '2px'}} ></div>
                                                        <p> Aytishnc</p>
                                                        <div className="line" style={{height: '2px'}} ></div>
                                                        <p> Aytishnc</p>
                                                        <div className="line" style={{height: '2px'}} ></div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    </div>
                                    <div className="col-2 col-padding">
                                        <Link to={`/team/squadTeam/${squadteam._id}`}>
                                            <div className="box">
                                                <img src={MoreInformation} className={'img-more-information'}
                                                     alt="link-more-information"/>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            
            </Container>
        </>
    );
};

export default observer(SquadTeamLists);