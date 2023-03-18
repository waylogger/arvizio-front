import { ApiClientAbstract } from '../api-client-abstract';
import { IFile } from '../file/interface';
import { IMedia } from '../media/interface';

export class ApiFileDownload extends ApiClientAbstract {
    url(file: IFile, media: IMedia) {
        return `${this.backend}/download/${media.id}/${file.id}`;
    }
}

export const dowloader = new ApiFileDownload();
