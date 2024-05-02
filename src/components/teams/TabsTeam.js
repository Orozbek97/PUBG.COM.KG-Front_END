import React from 'react';
import {Container, Tab, Tabs} from "react-bootstrap";
import BottomNavigationBar from "../bottomNavigation/bottomNavigation";
import Header from "../header/Header";
import DuoTeamLists from "./DuoTeamLists";
import SquadTeamLists from "./SquadTeamLists";


const TabsTeam = () => {
    return (
        <>
            <Header />
            <Container>
                <h1> Команды </h1>
                <Tabs
                    defaultActiveKey="squadTeams"
                    id="teams"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="squadTeams"  title="Отряд">
                        <SquadTeamLists />
                    </Tab>
                    <Tab eventKey="duoTeams" title="Дуо">
                        <DuoTeamLists />
                    </Tab>
                </Tabs>
            </Container>
            <BottomNavigationBar />
        </>
    );
};

export default TabsTeam;