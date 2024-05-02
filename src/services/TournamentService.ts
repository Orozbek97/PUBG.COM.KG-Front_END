import {AxiosResponse} from "axios";
import $api from "../http";
import {TournamentResponse} from "../models/response/TournamentResponse";

export default class TournamentService {
    
    static async addTournament(
        name: string,
        image: string,
        startDate: Date,
        map: string,
        tournamentType: string,
        maxPlayers: number,
        minPlayers: number,
        tourState: boolean,
        endState: boolean,
        fee: number,
    ): Promise<AxiosResponse<TournamentResponse>> {
        return $api.post<TournamentResponse>('/addtournament', {
            name,
            image,
            startDate,
            map,
            tournamentType,
            maxPlayers,
            minPlayers,
            tourState,
            endState,
            fee
        })
    }
    
    static async participateInTournament(
        tournamentId: string,
        participantId: string,
        participantNick: string,
        participantAvatar: string,
        participantName: string,
        participantPhone: number,
        participantPubgId: number,
        participantCheckImage: string
    
    ): Promise<AxiosResponse<TournamentResponse>> {
        return $api.post<TournamentResponse>(`/tournament/${tournamentId}/participate`, {
            participantId,
            participantNick,
            participantAvatar,
            participantName,
            participantPhone,
            participantPubgId,
            participantCheckImage
            
        });
    }
    
    
}