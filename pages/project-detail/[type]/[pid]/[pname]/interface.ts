import { IFile } from '@/api/file/interface';
import { MediaType } from '@/api/media/interface';
import { ISpot } from '@/api/spot/interface';

export interface MediaData {
    mediaId: number;
    mediaType: MediaType;
    mainFile: IFile;
    files: IFile[]; // change path here
    order: number;
    name: string;
    spots: ISpot[];
    numberOfLines: number;
}
