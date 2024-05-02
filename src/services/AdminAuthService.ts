import {AxiosResponse} from "axios";
import $api from "../http";
import {AdminAuthResponse} from "../models/response/AdminAuthResponse";


export default class AdminAuthService {
	
	static async login(
			login: string,
			password: string
	): Promise<AxiosResponse<AdminAuthResponse>> {
		return $api.post<AdminAuthResponse>('/admin-panel/pubg/www/login', {login, password})
	}
	
	static async logout(): Promise<void> {
		return $api.post('/admin-panel/pubg/www/logout')
	}
}