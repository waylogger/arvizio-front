export class IFile {
    id: number;

    name: string;

    path: string;

    size: number;

    media: {
        id: number;
        deletedAt: string;
        project: {
            id: number;
            deletedAt: string;
            public: boolean;
        };
    };

    owner: {
        id: number;
    };

    storage: Storage;

    createdAt: Date;

    updatedAt: Date;

    deletedAt: Date;

    extension: string;

    type: FileTypeEnum;

    settings: {
        relativeColumn: number;
        relativeLine: number;
        [key: string]: any;
    };
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
