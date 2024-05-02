import {AxiosResponse} from "axios";
import $api from "../http";
import {IDuoTeam} from "../models/IDuoTeam";


export default  class DuoTeamsService {
    static fetchDuoTeam(): Promise<AxiosResponse<IDuoTeam[]>>{
        return $api.get<IDuoTeam[]>('/duoteam')
    }

    static fetchDuoTeamById(duoteamId: string): Promise<AxiosResponse<IDuoTeam>>{
        return $api.get(`/duoteam/${duoteamId}`)
    }
}