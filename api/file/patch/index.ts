import { api } from '@/api/api-client';
import { ApiClientAbstract } from '@/api/api-client-abstract';
import axios from 'axios';
import { FileTypeEnum, IFile } from '../interface';

export class ApiFilePatch extends ApiClientAbstract {
    async patch(file: IFile): Promise<boolean> {
        try {
            const url = `${this.backend}/file`;

            await axios
                .patch(
                    `${url}`,
                    {
                        id: file.id,
                        settings: file.settings,
                    },
                    this.options()
                )
                .then((res) => res.data);

            return true;
        } catch (e) {
            return false;
        }
    }
}

export const apiFilePatch = new ApiFilePatch();
