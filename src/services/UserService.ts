import {AxiosResponse} from "axios"
import $api from "../http";
import {IUser} from "../models/IUser";


export default class UserService {
   static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
       return $api.get<IUser[]>('/users')
   }
    static fetchPlayerById(playerId: string): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`/player/${playerId}`);
    }
    
    static updatePlayerData(userId: string, data: any): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>(`/update-profile/${userId}`, data);
    }
    static updateProfileAvatar(userId: string, data: any ): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>(`/update-profile/avatar/${userId}`, data);
    }
}