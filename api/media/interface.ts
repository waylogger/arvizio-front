export interface IMedia {
    id: number;

    type: MediaType;

    name: string;

    createdAt: Date;

    updatedAt: Date;

    deletedAt: Date;

    public: boolean;

    size: number;

    project:
        | {
              id: number;
              deletedAt: string;
              public: boolean;
              owner: {
                  id: number;
              };
          }
        | number;

    description: string;

    order: number;

    settings:
        | {
              [key: string]: any;
          }
        | string;
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
