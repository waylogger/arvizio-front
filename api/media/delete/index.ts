import { ApiClientAbstract } from '@/api/api-client-abstract';
import axios from 'axios';
import { IMedia } from '../interface';

export class ApiMediaDelete extends ApiClientAbstract {
    async delete(mediaId: string): Promise<IMedia[]> {
        try {
            const url = `${this.backend}/media`;
            const encoded = new URLSearchParams();
            encoded.append('id', mediaId);
            const medias = await axios
                .delete(`${url}?${encoded.toString()}`, this.options())
                .then((res) => res.data);
            return medias;
        } catch (e) {
            return [];
        }
    }
}

export const apiMediaDelete = new ApiMediaDelete();
