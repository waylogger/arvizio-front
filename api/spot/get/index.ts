import axios from 'axios';
import { ApiClientAbstract } from '../../api-client-abstract';
import { ISpot } from '../interface';

class SpotClientGet extends ApiClientAbstract {
    getAll(projectId: string): Promise<ISpot[]> {
        const encoded = new URLSearchParams();
        encoded.append('projectId', projectId);
        const url = `${this.backend}/spot/all?${encoded.toString()}`;

        return axios.get(url, this.options()).then((res) => res.data);
    }
}

export const spotClientGet = new SpotClientGet();
