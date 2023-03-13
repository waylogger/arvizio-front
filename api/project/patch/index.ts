import axios from 'axios';
import { ApiClient } from '../../api-client';
import { IProject } from '../interface';

class ApiProjectPatch extends ApiClient {
    async setPublic(project: IProject): Promise<boolean> {
        const url = `${this.backend}/project`;
        try {
            const res = await axios
                .patch(url, project, this.options())
                .then((res) => res.data);
            return true;
        } catch (e) {
            return false;
        }
    }
}

export const apiProjectPatch = new ApiProjectPatch();
