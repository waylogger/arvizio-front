import axios from 'axios';
import { ApiClientAbstract } from '../../api-client-abstract';
import { ISpot } from '../interface';

class SpotClientPatch extends ApiClientAbstract {
    create(
        id: number,
        x: number,
        y: number,
        z: number = -800
    ): Promise<ISpot[]> {
        const url = `${this.backend}/spot/`;

        try {
            return axios
                .patch(
                    url,
                    {
                        id,
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

export const apiSpotPatch = new SpotClientPatch();
