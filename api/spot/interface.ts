import { IMedia } from '../media/interface';

export interface ISpot {
    id: number;
    source: Partial<IMedia>;

    target: Partial<IMedia>;

    x: number;

    y: number;

    z: number;
}
