import React from 'react';
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import AdminAuth from "./admin/AdminAuth";
import AdminPageMain from "./admin/AdminPageMain";
import AdminPageAllPlayer from "./admin/player/AdminPageAllPlayer";
import AdminPagePLayer from "./admin/player/AdminPagePLayer";
import AdminPageAllTournament from "./admin/Tournament/AdminPage-AllTournament";
import AdminPageTournament from "./admin/Tournament/AdminPageTournament";
import CreateTournament from "./admin/Tournament/CreateTournament";
import Authorization from "./components/autorization/Autorization";
import ForgotPasswordPage from "./components/autorization/forgoutPassword/ForgotPasswordPage";
import ResetPasswordPage from "./components/autorization/forgoutPassword/ResetPasswordPage";
import SuccessSendEmail from "./components/autorization/forgoutPassword/succesSendEmail";
import SuccessRegistrationPage from "./components/autorization/SuccesRegistrationPage";
import AllPlayers from "./components/players/AllPlayers";
import AvatarEdit from "./components/players/personelPage/AvatarEditPage";
import PersonalArea from "./components/players/personelPage/PersonalArea";
import PersonelInfoEdit from "./components/players/personelPage/PersonelInfoEdit";
import PlayerPage from "./components/players/PlayerPage";
import DuoTeamsPage from "./components/teams/DuoTeamsPage";
import SquadTeamsPage from "./components/teams/SquadTeamsPage";
import TabsTeam from "./components/teams/TabsTeam";
import AllTournaments from "./components/tournament/AllTournaments";
import PaymentPage from "./components/tournament/PaymentPage";
import TournamentRules from "./components/tournament/Tournament-rules";
import TournamentPage from "./components/tournament/TournamentPage";
import Main from "./main";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/authorization" element={<Authorization/> } > </Route>
                <Route path="/auth/registration/newUser/success" element={ <SuccessRegistrationPage />}></Route>
                <Route path='/auth/forgot-password' element={ <ForgotPasswordPage />} />
                <Route path='/auth/forgot-password/send/mail/success' element={ <SuccessSendEmail />} />
                <Route path="/reset/password/mail/:userId/:token" element={<ResetPasswordPage />} />
                
                
                <Route path="/tournament/all" element={<AllTournaments />}></Route>
                <Route path="/tournament/id/:tournamentId" element={ <TournamentPage />}></Route>
                <Route path='/tournament/:tournamentId/participate' element={< PaymentPage />}> </Route>
                <Route path='/tournament/rules' element={< TournamentRules />}> </Route>

                <Route path="/player/all" element={ <AllPlayers /> }></Route>
                <Route path="/me/personal-area" element={ <PersonalArea />}></Route>
                <Route path="/player/lc/setting/edit" element={ <PersonelInfoEdit/> }> </Route>
                <Route path="/player/lc/setting/avatar" element={ <AvatarEdit /> }> </Route>
                <Route path="/player/:playerId" element={ <PlayerPage />}></Route>

                <Route path="/team" element={ <TabsTeam />}></Route>
                <Route path="/team/squadTeam/:squadteamId" element={ <SquadTeamsPage />}> </Route>
                <Route path="/team/duoTeam/:duoteamId" element={ <DuoTeamsPage />}> </Route>
                


                {/*admin routes*/}
                <Route path="/admin-panel/pubg/www/main" element={<AdminPageMain/>} />
                <Route path="/admin-panel/pubg/www/auth" element={<AdminAuth/>} />
                <Route path='/admin-panel/pubg/www/tournament/all' element={<AdminPageAllTournament/> }/>
                <Route path='/admin-panel/pubg/www/tournament/id/:tournamentId' element={<AdminPageTournament />} />
                <Route path="/admin-panel/pubg/www/tournament/create-tournament" element={< CreateTournament/>} />
                <Route path='/admin-panel/pubg/www/player/all' element={ <AdminPageAllPlayer /> } />
                <Route path='/admin-panel/pubg/www/player/id/:playerId' element={ <AdminPagePLayer /> } />
            </Routes>
        </Router>
    );
};

export default App;
