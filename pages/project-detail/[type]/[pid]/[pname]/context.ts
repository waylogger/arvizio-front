import { createContext } from 'react';

export interface IProjectContext {
    refresh: boolean;
}
export const ProjectContext = createContext<IProjectContext | any>(null);
