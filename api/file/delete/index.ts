import { ApiClientAbstract } from '@/api/api-client-abstract';
import axios from 'axios';

export class ApiFileDelete extends ApiClientAbstract {
    async delete(fileId: string): Promise<boolean> {
        try {
            const url = `${this.backend}/file`;
            const encoded = new URLSearchParams();
            encoded.append('id', fileId);
            const files = await axios
                .delete(`${url}?${encoded.toString()}`, this.options())
                .then((res) => res.data);

            return true;
        } catch (e) {
            return false;
        }
    }
}

export const apiFileDelete = new ApiFileDelete();
