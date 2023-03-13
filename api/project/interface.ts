export interface IProject {
    id: number;
    name: string;
    description: string;
    type: ProjectType;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    public: boolean;

    owner: number | { id: number };
}

export enum ProjectType {
    gallery = 'gallery',
    video = 'video',
    audio = 'audio',
    pano = 'pano',
    dem3 = '3d',
    pseudo3d = 'pseudo3d',
}
