import axios from 'axios';
import { ApiClient } from '../../api-client';
import { IProject } from '../interface';

class ApiProjectDelete extends ApiClient {
    async deleteProject(id: number): Promise<boolean> {
        const encoded = new URLSearchParams();
        encoded.append('id', id.toString());
        const url = `${this.backend}/project?${encoded.toString()}`;
        try {
            const res = await axios
                .delete(url, this.options())
                .then((res) => res.data);
            return true;
        } catch (e) {
            return false;
        }
    }
}

export const apiProjectDelete = new ApiProjectDelete();
