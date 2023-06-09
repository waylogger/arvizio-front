import axios from 'axios';
import { ApiClientAbstract } from '../../api-client-abstract';
import { ISpot } from '../interface';

class SpotClientCreate extends ApiClientAbstract {
    create(
        source: number,
        target: number,
        x: number,
        y: number,
        z: number = -800
    ): Promise<ISpot[]> {
        const url = `${this.backend}/spot/`;

        try {
            return axios
                .post(
                    url,
                    {
                        target,
                        source,
                        x,
                        y,
                        z,
                    },
                    this.options()
                )
                .then((res) => res.data);
        } catch (e) {
            return null;
        }
    }
}

export const apiSpotCreate = new SpotClientCreate();
