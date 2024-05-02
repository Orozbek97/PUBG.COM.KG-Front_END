import {AxiosResponse} from "axios"
import $api from "../http";
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/login', { email, password })
	}

	static async registration(
		name: string,
		image: string,
		email: string,
		pubgNick: string,
		pubgId: number,
		phoneNumber: number,
		password: string,
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/registration', {
			name,
			image,
			email,
			pubgNick,
			pubgId,
			phoneNumber,
			password,
		})
	}

	static async logout(): Promise<void> {
		return $api.post('/logout')
	}
	
	static async sendPasswordResetMail(email: string)
	: Promise<AxiosResponse> {
		return $api.post('/send/reset/password/mail', {
			email
		})
	}
	static async changePassword(
			userId: string ,
			newPassword: string
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.put<AuthResponse>(`/reset/password/${userId}`, {
			newPassword
		})
	}
	
}
