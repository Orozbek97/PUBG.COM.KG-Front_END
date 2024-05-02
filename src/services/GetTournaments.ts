import {AxiosResponse} from "axios";
import {ITournament} from "../models/ITournament";
import $api from "../http";


export default class GetTournaments {
    static fetchTournaments(): Promise<AxiosResponse<ITournament[]>> {
        return $api.get<ITournament[]>('/getTournaments')
    }
    static fetchTournamentById(tournamentId: string): Promise<AxiosResponse<ITournament>> {
        return $api.get<ITournament>(`/tournament/${tournamentId}`);
    }
}