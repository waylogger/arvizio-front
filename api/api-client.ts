import {
    IApiClient,
    ApiMethodsEnum,
    IUser,
    MediaType,
    FileTypeEnum,
} from './interface';
import { config } from './cfg';
import axios from 'axios';

class ApiClient implements IApiClient {
    private backend = config.url.backend;
    private options() {
        return {
            withCredentials: true,
        };
    }
    constructor() {}

    async checkSession(): Promise<IUser> {
        let user = null;
        try {
            const url = `${this.backend}/${ApiMethodsEnum.session}`;

            user = await axios.get(url, this.options()).then((res) => res.data);
        } catch (e) {}
        return user;
    }

    async login(dto: { password: string; email: string }): Promise<IUser> {
        try {
            const url = `${this.backend}/${ApiMethodsEnum.login}`;

            const res = await axios
                .post(url, dto, this.options())
                .then((res) => res.data);

            return res;
        } catch (e) {
            return null;
        }
    }

    async logout() {
        try {
            const res = await axios.post(
                `${this.backend}/${ApiMethodsEnum.logout}`,
                {},
                this.options()
            );
            return true;
        } catch (e) {
            return false;
        }
    }

    async sendNewPassword(opts: { email: string }) {
        try {
            const url = `${this.backend}/${ApiMethodsEnum.newPassword}/${opts.email}`;
            await axios.get(url, this.options());
            return true;
        } catch (e) {
            return false;
        }
    }

    async signUp(opts: { email: string; password: string }): Promise<IUser> {
        try {
            const url = `${this.backend}/${ApiMethodsEnum.user}`;

            const newUser = axios
                .post(url, opts, this.options())
                .then((res) => res.data);
            return newUser;
        } catch (e) {
            return null;
        }
    }

    async createProject(opts: {
        name: string;
        description: string;
        type: 'gallery' | 'video' | 'audio' | 'pano' | '3d' | 'pseudo3d';
    }): Promise<number> {
        const url = `${this.backend}/${ApiMethodsEnum.createProject}`;

        try {
            const res = await axios
                .post(url, opts, this.options())
                .then((res) => res.data);
            return res;
        } catch (e) {
            return null;
        }
    }

    async createProjectWithFiles(
        opts: {
            name: string;
            description: string;
            type: 'gallery' | 'video' | 'audio' | 'pano' | '3d' | 'pseudo3d';
        },
        files: File[],
        oneFileIsMedia: boolean,
        mediaType: MediaType,
        fileType: FileTypeEnum
    ) {
        try {
            const projectId = await this.createProject(opts);

            switch (oneFileIsMedia) {
                case true: {
                    for (const file of files) {
                        const media = await this.createMedia({
                            type: mediaType,
                            project: projectId,
                            description: '',
                            name: 'media',
                        }).then((res) => res.data);

                        const newFile = await this.createFile({
                            media,
                            name: file.name,
                            type: fileType,
                        }).then((res) => res.data);

                        await this.uploadFile({
                            file,
                            mediaId: media,
                            fileId: newFile,
                        });
                    }
                    break;
                }
                case false: {
                    const media = await this.createMedia({
                        type: mediaType,
                        project: projectId,
                        description: '',
                        name: 'media',
                    }).then((res) => res.data);
                    for (const file of files) {
                        const newFile = await this.createFile({
                            media,
                            name: file.name,
                            type: fileType,
                        }).then((res) => res.data);

                        await this.uploadFile({
                            file,
                            mediaId: media,
                            fileId: newFile,
                        });
                    }
                    break;
                }
            }
            return projectId;
        } catch (e) {
            return null;
        }
    }

    async createMedia(opts: {
        name: string;
        description: string;
        type: MediaType;
        project: number;
    }) {
        try {
            const url = `${this.backend}/${ApiMethodsEnum.createMedia}`;
            const media = await axios.post(url, opts, this.options());
            return media;
        } catch (e) {
            return null;
        }
    }
    async createFile(opts: {
        name: string;
        media: number;
        type: FileTypeEnum;
    }) {
        try {
            const url = `${this.backend}/${ApiMethodsEnum.createFile}`;
            const file = await axios.post(url, opts, this.options());
            return file;
        } catch (e) {
            return null;
        }
    }
    async uploadFile(opts: { mediaId: number; fileId: number; file: File }) {
        try {
            const url = `${this.backend}/${ApiMethodsEnum.uploadFile}/${opts.mediaId}/${opts.fileId}`;
            const formData = new FormData();
            formData.append('file', opts.file);
            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            return res;
        } catch (e) {
            return null;
        }
    }
}

export const api = new ApiClient();
