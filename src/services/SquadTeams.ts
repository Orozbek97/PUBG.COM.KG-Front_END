import {AxiosResponse} from "axios";
import {ISquadTeam} from "../models/ISquadTeam";
import $api from "../http";


export default class SquadTeamsService {

    static fetchSquadTeam(): Promise<AxiosResponse<ISquadTeam[]>> {
        return $api.get<ISquadTeam[]>('/squadteam')
    }

    static  fetchSquadTeamById(squadteamId: string): Promise<AxiosResponse<ISquadTeam>> {
        return $api.get<ISquadTeam>(`squadteam/${squadteamId}`)
    }

}