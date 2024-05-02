import axios from "axios";
import {makeAutoObservable} from "mobx";
import {API_URL} from "../http";
import {IAdmin} from "../models/IAdmin";
import {AdminAuthResponse} from "../models/response/AdminAuthResponse";
import AdminAuthService from "../services/AdminAuthService";

export default class Admin {
	admin = {} as IAdmin;
	isAuth = false;
	isLoading = false;
	
	constructor()  {
		makeAutoObservable(this)
	}
	
	setAuth(bool: boolean) {
		this.isAuth = bool;
	}
	
	setAdmin(admin: IAdmin) {
		this.admin = admin
	}
	
	setLoading(bool: boolean) {
		this.isLoading = bool;
	}
	
	async login(login: string, password: string) {
		try {
			const response = await AdminAuthService.login(login, password);
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true)
			this.setAdmin(response.data.admin)
			
		}  catch (e) {
			let errorMessage = '';
			// @ts-ignore
			if (e.response && e.response.data && e.response.data.message) {
				// @ts-ignore
				errorMessage = e.response.data.message;
			}
			throw new Error(errorMessage);
		}
	}
	
	async logout() {
		try {
			const response = await AdminAuthService.logout();
			localStorage.removeItem('token');
			this.setAuth(false);
			this.setAdmin({} as IAdmin);
		} catch (e) {
			// @ts-ignore
			console.log(e.response?.data?.message);
		}
	}
	
	async checkAuth() {
		console.log("Checking authentication...");
		this.setLoading(true);
		try {
			const response = await axios.get<AdminAuthResponse>(`${API_URL}/admin-panel/pubg/www/refresh`, {withCredentials: true})
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setAdmin(response.data.admin);
			console.log("Authentication successful.");
		} catch (e) {
			console.error("Error checking authentication:", e);
			this.setAuth(false);
			this.setAdmin({} as IAdmin);
		} finally {
			this.setLoading(false);
		}
	}

	
	
	
}