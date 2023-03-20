import { createContext } from 'react';

export interface IProjectContext {
    refresh: boolean;
}
const ProjectContext = createContext<IProjectContext | any>(null);
export default ProjectContext;
