import { ApiClientAbstract } from '@/api/api-client-abstract';
import axios from 'axios';
import { IFile } from '../interface';

export class ApiFileGet extends ApiClientAbstract {
    async get(mediaId: string): Promise<IFile[]> {
        try {
            const url = `${this.backend}/file/all`;
            const encoded = new URLSearchParams();
            encoded.append('mediaId', mediaId);
            const files = await axios
                .get(`${url}?${encoded.toString()}`, this.options())
                .then((res) => res.data);
            return files;
        } catch (e) {
            return [];
        }
    }
}

export const apiFileGet = new ApiFileGet();
