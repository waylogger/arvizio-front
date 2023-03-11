export interface IUser {
    email?: string;
    phone?: string;
    photo?: string;
    createdAt?: string;
    name: string;
    id?: number;
}
export interface IApiClient {
    checkSession(): Promise<IUser | null>;
}

export enum ApiMethodsEnum {
    session = 'session',
    login = 'session/check',
    logout = 'session/logout',
    newPassword = 'user/newPassword',
    user = 'user',
    googlePath = 'session/auth/go',
    vkPath = 'session/auth/go',
    yaPath = 'session/auth/go',
}
