import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Avatar} from '@mui/material';
import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import UserService from '../../services/UserService';
import './playerPage.css';
import BottomNavigationBar from "../bottomNavigation/bottomNavigation";
import Header from "../header/Header";

const Players = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await UserService.fetchUsers();
        setUsers(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    
    getUsers();
  }, []);
  
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  
  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "prizeMoney") {
      return b.statistic.prizeMoney - a.statistic.prizeMoney;
    } else if (sortBy === "kill") {
      return b.statistic.kill - a.statistic.kill;
    } else if (sortBy === "game") {
      return b.statistic.game - a.statistic.game;
    } else if (sortBy === "firstPlace") {
      return b.statistic.firstPlace - a.statistic.firstPlace;
    } else if (sortBy === "secondPlace") {
      return b.statistic.secondPlace - a.statistic.secondPlace;
    } else if (sortBy === "thirdPlace") {
      return b.statistic.thirdPlace - a.statistic.thirdPlace;
    }
    return 0;
  });
  
  const filteredUsers = sortedUsers.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.pubgNick.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  
  
  if (loading) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-2" style={{ height: '30vh' }}>
          <ClipLoader color={'#299cff'} />
          <h3> Загружаются данные </h3>
        </div>
    );
  }
  
  return (
      <>
        <Helmet>
          <title> Все игроки - Рейтинг игроков PUBG.COM.KG</title>
        </Helmet>
        <Header />
        <div className="player-page-title">
          <h3> Все игроки - Рейтинг игроков </h3>
        </div>
        <div className="length-player">
          Общее число зарегистрированных игроков -  {filteredUsers.length}
        </div>
        <Container>
          <div className="search-and-sort-bar">
            <div className="search-bar">
              <input
                  type="text"
                  placeholder="Поиск игроков"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
              />
            </div>
            <div className="sort-bar">
              <select value={sortBy} onChange={handleSortChange}>
                <option value="">Сортировать по..</option>
                <option value="name">Имени</option>
                <option value="prizeMoney">Сумме выигрыша</option>
                <option value="game"> Количество игр</option>
                <option value="kill"> Килл</option>
                <option value="firstPlace">ТОП 1</option>
                <option value="secondPlace">ТОП 2</option>
                <option value="thirdPlace">ТОП 3</option>
              </select>
            </div>
          </div>
          <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">
            {filteredUsers.map((user, index) => (
                <div key={user.email} className="col my-1">
                  <Link to={`/player/${user._id}`}>
                    <div className="player-card">
                      <div className="player-number-avatar">
                        <div className="number-player">
                          <p>{index + 1}</p>
                        </div>
                        <div className="player-avatar">
                          <Avatar
                              alt="player-avatar"
                              src={user.image}
                              sx={{width: 40, height: 40}}
                          ></Avatar>
                        </div>
                      </div>
                      <div className="player-name-nick">
                        <h5 className="player-name">{user.name}</h5>
                        <p className={'player-pubgNick'}>{user.pubgNick}</p>
                      </div>
                      <div className="player-win-money-next-icon">
                        <div className="player-win-money">
                          <p style={{color: 'silver'}}>
                            {sortBy === 'game' ? 'Игры:' :
                                sortBy === 'kill' ? 'Киллы:' :
                                    sortBy === 'firstPlace' ? 'ТОП 1:' :
                                        sortBy === 'secondPlace' ? 'ТОП 2:' :
                                            sortBy === 'thirdPlace' ? 'ТОП 3:' : 'Призовые:'}
                          </p>
                          <p>
                            {sortBy === 'game' ? user.statistic.game :
                                sortBy === 'kill' ? user.statistic.kill :
                                    sortBy === 'firstPlace' ? user.statistic.firstPlace :
                                        sortBy === 'secondPlace' ? user.statistic.secondPlace :
                                            sortBy === 'thirdPlace' ? user.statistic.thirdPlace :
                                                user.statistic.prizeMoney}
                            {sortBy === 'prizeMoney' && ' com'}
                            {sortBy === 'name' && ' com'}
                            {sortBy === "" && ' com'}
                          </p>
                        </div>
                        <NavigateNextIcon sx={{
                          background: 'none',
                          color: 'white'
                        }}/>
                      </div>
                    </div>
                  </Link>
                </div>
            ))}
          </div>
        </Container>
        <BottomNavigationBar/>
      </>
  );
};

export default observer(Players);
