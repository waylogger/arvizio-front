import { createContext, useContext } from 'react';
import { IUser } from './api/interface';
export const user = null;
export interface IUserContext {
    user: IUser;
}

export const UserContext = createContext<IUserContext | any>(null);
