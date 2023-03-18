import { FileTypeEnum } from '@/api/file/interface';
import { MediaType } from '@/api/media/interface';
import { ProjectType } from '@/api/project/interface';
import styles from '@/styles/app.module.css';
import { useEffect, useState } from 'react';
import FileInput from './UI/FileInput';
import MyButton from './UI/MyButton/MyButton';

function getAccess(type: MediaType) {
    switch (type) {
        case MediaType.image:
        case MediaType.panorama:
        case MediaType.pseudo3d: {
            return '.png, .jpeg, .jpg';
        }
        case MediaType.audio: {
            return '.mp3, .wav';
        }
        case MediaType.video: {
            return '.mp4, .mkv';
        }
    }
}


function isAllowedMedia(media: MediaType, project: ProjectType) {
    if (project === ProjectType.gallery) {
        return false;
    }
    if (project === ProjectType.pseudo3d) {
        return media === MediaType.pseudo3d ? false : true;
    }

    if (media === MediaType.pseudo3d) {
        // pseudo3d не в pseudo3d project
        return true;
    }

    if (project === ProjectType.pano) {
        return media === MediaType.panorama ? false : true;
    }

    return false;
}

function mediaImage(mediaType: MediaType): string {
    switch (mediaType) {
        case MediaType.audio:
            return '/types/audio.png';
        case MediaType.video:
            return '/types/video.png';
        case MediaType.panorama:
            return '/types/panorama.png';
        case MediaType.image:
            return '/types/image.png';
        case MediaType.pseudo3d:
            return '/types/pseudo3D.png';
    }
}

const ElementPopup = (props: {
    closeDialog: () => void;
    setFiles: (
        files: File[],
        mediaType: MediaType,
        fileType: FileTypeEnum
    ) => void;
    projectType: ProjectType;
    loadingDone: boolean;
    setLoadingDone: (status: boolean) => void;
}) => {
    const [mediaType, setMediaType] = useState<MediaType>();
    const [loading, setLoading] = useState<boolean>();
    const [files, setFiles] = useState<File[]>();
    const [error, setError] = useState<string>('');
    useEffect(() => {
        if (!props.projectType ) return;
        if (props.projectType === ProjectType.pseudo3d)
            setMediaType(MediaType.pseudo3d);
        if (props.projectType === ProjectType.pano)
            setMediaType(MediaType.panorama);

        if (!mediaType && props.projectType === ProjectType.gallery){
            setMediaType(MediaType.image)
        }
    });

    useEffect(() => {
        if (!props.loadingDone) return;
        setLoading(false);
        setFiles([]);
        props.closeDialog();
        props.setLoadingDone(false);
    });

    return (
        <div>
            <div className={styles.formProjectTitle}>
                Выберите тип медиа-контента
            </div>
            <div className={styles.formElement}>
                <div className={styles.formLeft}>
                    <div
                        className={styles.elementRadio}
                        onClick={() => {
                            setMediaType(MediaType.image);
                        }}
                    >
                        <input
                            type="radio"
                            id="1"
                            checked={mediaType === MediaType.image}
                            disabled={isAllowedMedia(
                                MediaType.image,
                                props.projectType
                            )}
                        />
                        <label htmlFor="1">Изображение</label>
                    </div>
                    <div
                        className={styles.elementRadio}
                        onClick={() => {
                            setMediaType(MediaType.video);
                        }}
                    >
                        <input
                            type="radio"
                            id="2"
                            checked={mediaType === MediaType.video}
                            disabled={isAllowedMedia(
                                MediaType.video,
                                props.projectType
                            )}
                        />
                        <label htmlFor="2">Видео</label>
                    </div>
                    <div
                        className={styles.elementRadio}
                        onClick={() => {
                            setMediaType(MediaType.audio);
                        }}
                    >
                        <input
                            type="radio"
                            id="3"
                            checked={mediaType === MediaType.audio}
                            disabled={isAllowedMedia(
                                MediaType.audio,
                                props.projectType
                            )}
                        />
                        <label htmlFor="3">Аудио</label>
                    </div>
                    <div
                        className={styles.elementRadio}
                        onClick={() => {
                            setMediaType(MediaType.panorama);
                        }}
                    >
                        <input
                            type="radio"
                            id="4"
                            checked={mediaType === MediaType.panorama}
                            disabled={isAllowedMedia(
                                MediaType.panorama,
                                props.projectType
                            )}
                        />
                        <label htmlFor="4">Панорама</label>
                    </div>
                    <div
                        className={styles.elementRadio}
                        onClick={() => {
                            setMediaType(MediaType.pseudo3d);
                        }}
                    >
                        <input
                            type="radio"
                            id="5"
                            checked={mediaType === MediaType.pseudo3d}
                            disabled={isAllowedMedia(
                                MediaType.pseudo3d,
                                props.projectType
                            )}
                        />
                        <label htmlFor="5">Псевдо 3D</label>
                    </div>
                </div>
                <div className={styles.formRight}>
                    <img
                        src={mediaImage(mediaType)}
                        className={styles.mediaImage}
                        alt=""
                    />
                </div>
            </div>
            <form className={styles.formLogin}>
                <div>
                    <FileInput
                        accept={getAccess(mediaType)}
                        onUpload={(files: File[]) => {
                            setFiles(files);
                        }}
                    >
                        <span>Файлы для загрузки</span>
                    </FileInput>
                </div>
                <div>
                    <MyButton
                        onClick={(event) => {
                            event.preventDefault();
                            setLoading(true);
                            let fileType: FileTypeEnum;
                            switch (mediaType) {
                                case MediaType.audio: {
                                    fileType = FileTypeEnum.audio;
                                    break;
                                }
                                case MediaType.panorama: {
                                    fileType = FileTypeEnum.panorama;
                                    break;
                                }
                                case MediaType.pseudo3d: {
                                    fileType = FileTypeEnum.pseudo3d;
                                    break;
                                }
                                case MediaType.image: {
                                    fileType = FileTypeEnum.image;
                                    break;
                                }
                                case MediaType.video: {
                                    fileType = FileTypeEnum.video;
                                    break;
                                }
                            }

                            props.setFiles(files, mediaType, fileType);

                            props.setLoadingDone(true);
                        }}
                        disabled={loading || !files || files?.length === 0}
                    >
                        {loading ? 'Идет загрузка' : 'Загрузить'}
                    </MyButton>
                </div>
            </form>
        </div>
    );
};

export default ElementPopup;
