import React from 'react';
import {Tab, Tabs} from "react-bootstrap";
import {Helmet} from "react-helmet";
import BottomNavigationBar from "../bottomNavigation/bottomNavigation";
import Header from "../header/Header";
import ActualTournaments from "./ActualTornaments";
import CompletedTournaments from "./CompletedTournaments";

import ("./tournaments.css")

const AllTournaments = () => {
    return (
        <>
          <Helmet>
            <title>
              Все Турниры - PUBG.COM.KG
            </title>
          </Helmet>
          <Header />
          <h2 className={'mb-3 text-white'}> Все Турниры </h2>
          <Tabs
              defaultActiveKey="Actual"
              id="all-tournaments"
              className="my-3 justify-content-around"
          >
            <Tab eventKey="Actual" title="Предстоящие">
              <ActualTournaments/>
            </Tab>
            <Tab eventKey="Completed" title="Завершенные">
              <CompletedTournaments />
            </Tab>
          </Tabs>
          
          <BottomNavigationBar />
        </>
    );
};

export default AllTournaments;