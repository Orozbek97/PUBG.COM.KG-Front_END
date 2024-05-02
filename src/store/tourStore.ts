import {makeAutoObservable} from "mobx";
import {ITournament} from "../models/ITournament";
import TournamentService from "../services/TournamentService";


export default class TourStore {
    tournament = {} as ITournament;


    constructor() {
        makeAutoObservable(this);
    }

    setTournament(tournament: ITournament) {
        this.tournament = tournament;
    }

    async addTournament(
        name: string,
        image: string,
        startDate: Date,
        map: string,
        tournamentType: string,
        maxPlayers: number,
        minPlayers: number,
        tourState: boolean,
        endState: boolean,
        fee: number
    ){
        try {
            const response = await TournamentService.addTournament(
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
            );
            console.log(response);
            this.setTournament(response.data.tournament)
        } catch (e) {
            console.log(e)
        }
    }


}