export interface IUser {
	name: string;
	image: string;
	email: string;
	pubgNick: string;
	pubgId: number;
	phoneNumber: number;
	isActivated: boolean;
	id: string;
	tournaments: ITournament[];
	statistic: {
		game: number;
		kill: number;
		firstPlace: number;
		secondPlace: number;
		thirdPlace: number;
		prizeMoney: number;
	};
	
}
export interface ITournament {
	tournamentId: string;
	tournamentName: string;
	tournamentDate: Date;
	tournamentKill: number;
	tournamentPlace: number;
	tournamentMoney: number;
}

