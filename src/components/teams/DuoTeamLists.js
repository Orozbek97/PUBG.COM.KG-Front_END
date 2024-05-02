import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from 'react';
import {Accordion, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import DuoTeamsService from "../../services/DuoTeams";
import "./accordion.css";
import MoreInformation from "./icons/more-information.svg";

const DuoTeamLists = () => {
    const [duoteams, setDuoTeams] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDuoTeams = async () => {
            try {
                const response = await DuoTeamsService.fetchDuoTeam()
                setDuoTeams(response.data)
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        getDuoTeams();
    }, []);

    if (loading) {
        return  <div className={"text-white"}> loading...</div>
    }



    return (
        <>
            <Container>
                <div className="row row-cols-md-2 row-cols-1">
                    {duoteams.map((duoteam, index) => (
                        <div key={duoteam._id} className={"col"}>
                            <div className="box">
                                <div className="row row-accordion">
                                    <div className="col-10 col-padding">
                                        <div className="box">
                                            <Accordion defaultActiveKey="0" className={'accordion'}>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>{index + 1}.  {duoteam.name} </Accordion.Header>
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
                                        <Link to={`/team/duoTeam/${duoteam._id}`}>
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

export default observer(DuoTeamLists);