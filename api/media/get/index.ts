import { ApiClientAbstract } from '@/api/api-client-abstract';
import axios from 'axios';
import { IMedia } from '../interface';

export class ApiMediaGet extends ApiClientAbstract {
    async get(projectId: string): Promise<IMedia[]> {
        try {
            const url = `${this.backend}/media/all`;
            const encoded = new URLSearchParams();
            encoded.append('projectId', projectId);
            const medias = await axios
                .get(`${url}?${encoded.toString()}`, this.options())
                .then((res) => res.data);
            return medias;
        } catch (e) {
            return [];
        }
    }
}

export const apiMediaGet = new ApiMediaGet();
