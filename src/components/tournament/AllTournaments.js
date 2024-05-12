import React, {useEffect, useState} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import {Helmet} from "react-helmet";
import {useLocation} from "react-router-dom";
import BottomNavigationBar from "../bottomNavigation/bottomNavigation";
import Header from "../header/Header";
import ActualTournaments from "./ActualTornaments";
import CompletedTournaments from "./CompletedTournaments";
import "./tournaments.css";

const AllTournaments = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('activeTab');
    return savedTab || "Actual"; // По умолчанию открываем вкладку "Предстоящие"
  });
  
  const location = useLocation();
  
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);
  
  useEffect(() => {
    const state = location.state;
    if (state && state.activeTab) {
      setActiveTab(state.activeTab);
    }
  }, [location.state]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
      <>
        <Helmet>
          <title>Все Турниры - PUBG.COM.KG</title>
        </Helmet>
        <Header />
        <h2 className="mb-3 text-white">Все Турниры</h2>
        <Tabs
            activeKey={activeTab}
            onSelect={handleTabChange}
            id="all-tournaments"
            className="my-3 justify-content-around"
        >
          <Tab eventKey="Actual" title="Предстоящие">
            <ActualTournaments />
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
