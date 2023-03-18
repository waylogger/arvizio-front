import { api } from '@/api/api-client';
import { ApiClientAbstract } from '@/api/api-client-abstract';
import axios from 'axios';
import { FileTypeEnum } from '../interface';

export class ApiFileCreate extends ApiClientAbstract {
    async createAndUpload(
        media: number,
        type: FileTypeEnum,
        name: string,
        file: File
    ): Promise<boolean> {
        try {
            const url = `${this.backend}/file`;
            const newFile = await axios
                .post(
                    `${url}`,
                    {
                        media,
                        type,
                        name,
                    },
                    this.options()
                )
                .then((res) => res.data);

            console.log({
                newFile,
            });

            const oldApi = await api.uploadFile({
                file,
                mediaId: media,
                fileId: newFile,
            });

            return true;
        } catch (e) {
            return false;
        }
    }
}

export const apiFileCreate = new ApiFileCreate();
