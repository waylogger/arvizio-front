import { IFile } from '@/api/file/interface';
import { MediaType } from '@/api/media/interface';

export interface MediaData {
    mediaId: number;
    mediaType: MediaType;
    mainFile: IFile;
    files: IFile[]; // change path here
    order: number;
    name: string;
}
