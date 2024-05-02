import {AxiosResponse} from "axios";
import $api from "../http";
import {AuthResponse} from "../models/response/AuthResponse";
import {TournamentResponse} from "../models/response/TournamentResponse";


export default  class AdminService {
	
	static async completeTournament(
			tournamentId: string
	): Promise<AxiosResponse<TournamentResponse>> {
		return $api.put<TournamentResponse>(`/admin-panel/pubg/www/tournament/complete/${tournamentId}`)
	}
	
	static async removePlayerInTournament(
			tournamentId: string,
			userId: string
	): Promise<AxiosResponse<TournamentResponse>> {
		return $api.delete<TournamentResponse>(`/admin-panel/pubg/www/tournament/participant/remove/${tournamentId}/userId/${userId}`);
	}

	static async deletePlayer(
			userId: string
	) : Promise<AxiosResponse<AuthResponse>> {
		return $api.delete<AuthResponse>(`/admin-panel/pubg/www/player/delete/${userId}`);
	}
	
	static async tournamentResult(
			tournamentId: string,
			participantId: string,
			participantKill: number,
			participantMoney: number,
			participantPlace: number
	): Promise<AxiosResponse<TournamentResponse>> {
		return $api.put<TournamentResponse>(`/admin-panel/pubg/www/tournament/result/${tournamentId}`,{
			participantId,
			participantKill,
			participantMoney,
			participantPlace
		})
	}
	static async updatePlayerTopPlace(
			userId: string,
			newFirstPlace: string,
			newSecondPlace: string,
			newThirdPlace: string
	) : Promise<AxiosResponse<AuthResponse>> {
		return $api.put<AuthResponse>(`/admin-panel/pubg/www/player/update/${userId}`, {
			newFirstPlace,
			newSecondPlace,
			newThirdPlace
		})
	}
	
	
}