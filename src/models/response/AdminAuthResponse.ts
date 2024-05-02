import {IAdmin} from "../IAdmin";


export interface AdminAuthResponse {
	accessToken: string,
	refreshToken: string,
	admin: IAdmin;
}