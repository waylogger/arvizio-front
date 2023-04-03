export interface IUser {
    email?: string;
    phone?: string;
    photo?: string;
    createdAt?: string;
    name: string;
    id?: number;
}

export enum MediaType {
    image = 'image',
    video = 'video',
    audio = 'audio',
    panorama = 'panorama',
    model3d = 'model3d',
    pseudo3d = 'pseudo3d',
    logo = 'logo',
}

export enum FileTypeEnum {
    image = 'image',
    trumb = 'trumb',
    video = 'video',
    audio = 'audio',
    document = 'document',
    other = 'other',
    panorama = 'panorama',
    pseudo3d = 'pseudo3d',
    model3d = 'model3d',
}

export interface IApiClient {
    checkSession(): Promise<IUser | null>;
}

export enum ApiMethodsEnum {
    session = 'session',
    login = 'session/check',
    logout = 'session/logout',
    newPassword = 'user/newPassword',
    user = 'user',
    googlePath = 'session/auth/go',
    vkPath = 'session/auth/vk',
    yaPath = 'session/auth/ya',
    createProject = 'project',
    createMedia = 'media',
    createFile = 'file',
    uploadFile = 'upload',
}
