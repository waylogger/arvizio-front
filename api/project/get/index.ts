import axios from 'axios';
import { ApiClient } from '../../api-client';
import { IProject } from '../interface';

class ApiProjectGet extends ApiClient {
    async getAllProjects(): Promise<IProject[]> {
        const url = `${this.backend}/project`;
        try {
            const res = await axios
                .get(url, this.options())
                .then((res) => res.data);
            return res;
        } catch (e) {
            return [];
        }
    }
}

export const apiProjectGet = new ApiProjectGet();
