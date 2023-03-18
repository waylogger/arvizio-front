import { ApiClientAbstract } from '@/api/api-client-abstract';
import axios from 'axios';
import { IMedia } from '../interface';

export class ApiMediaPatch extends ApiClientAbstract {
    async patch(id: number, order: number): Promise<IMedia[]> {
        try {
            const url = `${this.backend}/media`;
            const medias = await axios
                .patch(
                    `${url}`,
                    {
                        id,
                        order,
                    },
                    this.options()
                )
                .then((res) => res.data);
            return medias;
        } catch (e) {
            return [];
        }
    }
}

export const apiMediaPatch = new ApiMediaPatch();
