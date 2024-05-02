import axios from "axios";
import {makeAutoObservable} from "mobx";
import {API_URL} from "../http";
import {IUser} from "../models/IUser";
import {AuthResponse} from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";


export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }


    setAuth(bool: boolean) {
        this.isAuth = bool;
    }


    setUser(user: IUser) {
        this.user = user;
    }


    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            let errorMessage = '';
            // @ts-ignore
            if (e.response && e.response.data && e.response.data.message) {
                // @ts-ignore
                errorMessage = e.response.data.message;
            }
            throw new Error(errorMessage);
        }
    }

   async registration(name: string,
                      image: string,
                      email: string,
                      pubgNick: string,
                      pubgId: number,
                      phoneNumber: number,
                      password: string,
        ) {
    try {
        const response = await AuthService.registration(
            name,
            image,
            email,
            pubgNick,
            pubgId,
            phoneNumber,
            password,
            );
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
    } catch (e) {
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
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message);
        }
    }
    
    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            console.log("Authentication successful.");
        } catch (e) {
            console.error("Error checking authentication:", e);
        } finally {
            this.setLoading(false);
        }
    }
    
}
