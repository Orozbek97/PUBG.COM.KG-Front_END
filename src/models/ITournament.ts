export interface ITournament {
    id: string;
    name: string;
    image: string;
    startDate: Date;
    map: string;
    tournamentType: string;
    maxPlayers: number;
    minPlayers: number;
    tourState: boolean;
    endState: boolean
    fee: number;
    participants: IParticipant[];
}
export interface IParticipant {
    userId: string;
    pubgNick: string;
    avatar: string;
    name: string;
    phone: number;
    pubgId: number;
    checkImage: string;
    kill: number;
    prizeMoney: number;
    place: number;
}