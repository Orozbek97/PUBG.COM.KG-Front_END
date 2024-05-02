
export interface IDuoTeam {
    id: string;
    name: string;
    statistics: {
        amountFirstPlace: number;
        amountSecondPlace: number;
        amountThirdPlace: number;
        amountKill: number;
        amountGame: number;
        sumPrizeMoney: number;
    };
    members: IMembers[];
}
export interface  IMembers {
    userId: string;
    playerName: string;
    playerNick: string;
    isAdmin: boolean;
}