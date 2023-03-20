import axios from 'axios';
import { ApiClientAbstract } from '../../api-client-abstract';
import { ISpot } from '../interface';

class SpotClientGet extends ApiClientAbstract {
    getAll(id: string): Promise<ISpot[]> {
        const encoded = new URLSearchParams();
        encoded.append('projectId', id);
        const url = `${this.backend}/spot/all?${encoded.toString()}`;
        console.log({
            url,
        });

        return axios.get(url, this.options()).then((res) => res.data);
    }
}

export const apiSpotGet = new SpotClientGet();
