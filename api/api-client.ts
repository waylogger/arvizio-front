import { IApiClient, ApiMethodsEnum, IUser } from './interface';
import { config } from './cfg';
import axios from 'axios';

class ApiClient implements IApiClient {
    private backend = config.url.backend;
    private options() {
        return {
            withCredentials: true,
        };
    }
    constructor() {}

    async checkSession(): Promise<IUser> {
        let user = null;
        try {
            const url = `${this.backend}/${ApiMethodsEnum.session}`;

            user = await axios.get(url, this.options()).then((res) => res.data);
        } catch (e) {}
        return user;
    }

    async login(dto: { password: string; email: string }): Promise<IUser> {
        try {
            const url = `${this.backend}/${ApiMethodsEnum.login}`;

            const res = await axios
                .post(url, dto, this.options())
                .then((res) => res.data);

            return res;
        } catch (e) {
            return null;
        }
    }

    async logout() {
        try {
            const res = await axios.post(
                `${this.backend}/${ApiMethodsEnum.logout}`,
                {},
                this.options()
            );
            return true;
        } catch (e) {
            return false;
        }
    }

    async sendNewPassword(opts: { email: string }) {
        try {
            const url = `${this.backend}/${ApiMethodsEnum.newPassword}/${opts.email}`;
            await axios.get(url, this.options());
            return true;
        } catch (e) {
            return false;
        }
    }

    async signUp(opts: { email: string; password: string }): Promise<IUser> {
        try {
            const url = `${this.backend}/${ApiMethodsEnum.user}`;

            const newUser = axios
                .post(url, opts, this.options())
                .then((res) => res.data);
            return newUser;
        } catch (e) {
            return null;
        }
    }
}

export const api = new ApiClient();
