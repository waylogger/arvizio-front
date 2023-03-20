import axios from 'axios';
import { ApiClientAbstract } from '../../api-client-abstract';
import { ISpot } from '../interface';

class SpotClientDelete extends ApiClientAbstract {
    delete(projectId: string): Promise<ISpot[]> {
        const encoded = new URLSearchParams();
        encoded.append('id', projectId);
        const url = `${this.backend}/spot?${encoded.toString()}`;

        return axios.delete(url, this.options()).then((res) => res.data);
    }
}

export const apiSpotDelete = new SpotClientDelete();
