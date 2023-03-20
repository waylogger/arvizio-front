import { api } from '@/api/api-client';
import { FileTypeEnum, IFile } from '@/api/file/interface';
import { apiMediaDelete } from '@/api/media/delete';
import { IMedia, MediaType } from '@/api/media/interface';
import { apiMediaPatch } from '@/api/media/patch';
import { IProject } from '@/api/project/interface';
import ProjectContext from '@/context/project-context';
import MediaData from '@/types/interface';
import { useContext, useEffect, useState } from 'react';
import ElementPopup from '../ElementPopup';
import MyModal from '../UI/MyModal/MyModal';
import styles from './snackbar.module.css';
import SnackbarImage from './snackbarImage';

function findFileByType(files: IFile[], fileType: FileTypeEnum) {
    return files.find((file) => file.type === fileType);
}
function findImageForNavigation(files: IFile[]) {
    const trumb = findFileByType(files, FileTypeEnum.trumb);

    if (trumb) return trumb;
}

function imageLogo(mediaType: MediaType) {
    switch (mediaType) {
        case MediaType.panorama: {
            return '/pano.svg';
        }
        case MediaType.video: {
            return '/video.svg';
        }
        case MediaType.audio: {
            return '/audio.svg';
        }
        case MediaType.model3d:
        case MediaType.pseudo3d: {
            return '/3d.svg';
        }
        default:
            return '/image.svg';
    }
}

function imagePlaceHolder(mediaType: MediaType) {
    switch (mediaType) {
        case MediaType.audio: {
            return '/audio-placeholder.jpg';
        }
        default:
            return '/placeholder.jpg';
    }
}

export default function Snakbar(props: {
    project: IProject;
    medias: IMedia[];
    files: MediaData[];
    onSelectMedia: (mediaId: number) => void;
}) {
    const [refresh, setRefresh] = useContext<any>(ProjectContext);
    const [loadDialogStatus, setLoadDialogStatus] = useState<'open' | 'close'>(
        'close'
    );
    const [mediaForDownload, setMediaForDownload] = useState<{
        files: File[];
        mediaType: MediaType;
        fileType: FileTypeEnum;
    }>(null);

    const [mediaForDelete, setMediaForDelete] = useState<number>(null);
    const [loadingEnd, setLoadingEnd] = useState(false);

    const [dragMedia, setDragMedia] = useState<number>();
    const [dropMedia, setDropMedia] = useState<number>();

    useEffect(() => {
        // add media
        if (
            !mediaForDownload ||
            !mediaForDownload.files ||
            !mediaForDownload.files.length
        )
            return;

        api.createMediaAndUpload(
            mediaForDownload.mediaType,
            props.project.id,
            mediaForDownload.files,
            mediaForDownload.mediaType === MediaType.pseudo3d ? false : true,
            mediaForDownload.fileType
        ).then((res) => setRefresh(true) && setLoadingEnd(true));
    }, [mediaForDownload]);

    useEffect(() => {
        // delete
        if (!mediaForDelete) return;

        apiMediaDelete.delete(mediaForDelete.toString()).then((res) => {
            setRefresh(true);
        });
    }, [mediaForDelete]);

    useEffect(() => {
        // drag and drop

        if (!dragMedia || !dropMedia) return;

        const from = props.files.find((media) => media.mediaId === dragMedia);
        const to = props.files.find((media) => media.mediaId === dropMedia);

        apiMediaPatch.patch(from.mediaId, to.order);
        apiMediaPatch.patch(to.mediaId, from.order);

        const xch = from.order;
        from.order = to.order;
        to.order = xch;

        setDragMedia(null);
        setDropMedia(null);
    }, [dropMedia]);

    const [mode, setMode] = useState<'open' | 'close'>('close');
    return (
        <div className={styles.snackbar}>
            <div className={styles.snackbarButton}>
                <span
                    className={styles.snackButtonNote}
                    onClick={() => setMode(mode === 'close' ? 'open' : 'close')}
                >
                    Навигация
                    <span>
                        <img src={mode === 'close' ? '/up.svg' : '/down.svg'} />
                    </span>
                </span>
            </div>
            <div
                className={[styles.imageLine].join(' ')}
                style={{
                    display: mode === 'open' ? 'flex' : 'none',
                }}
            >
                <div className={styles.container}>
                    <div className={[styles.images].join(' ')}>
                        {props.files && props.files.length ? (
                            props.files
                                .sort((a, b) => a.order - b.order)
                                .map((filesOfMedia) => {
                                    return (
                                        <SnackbarImage
                                            onSelectMedia={props.onSelectMedia}
                                            name={filesOfMedia.name}
                                            dragHandler={(media: number) => {
                                                setDragMedia(media);
                                            }}
                                            dropHandler={(media) => {
                                                setDropMedia(media);
                                            }}
                                            mediaId={filesOfMedia.mediaId}
                                            key={filesOfMedia.mediaId}
                                            url={
                                                findImageForNavigation(
                                                    filesOfMedia.files
                                                )?.path ??
                                                imagePlaceHolder(
                                                    filesOfMedia.mediaType
                                                )
                                            }
                                            type={filesOfMedia.mediaType}
                                        >
                                            <img
                                                src={imageLogo(
                                                    filesOfMedia.mediaType
                                                )}
                                                alt=""
                                            />
                                            <button
                                                className={
                                                    styles.deleteImageBtn
                                                }
                                                onClick={() => {
                                                    setMediaForDelete(
                                                        filesOfMedia.mediaId
                                                    );
                                                }}
                                            >
                                                <img src="/delete.svg" alt="" />
                                            </button>
                                        </SnackbarImage>
                                    );
                                })
                        ) : (
                            <div>Добавьте первый медиа-контент</div>
                        )}
                        <div
                            className={styles.addMedia}
                            onClick={() => {
                                setLoadDialogStatus('open');
                            }}
                        >
                            <button>
                                <img src="/add.svg" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <MyModal
                visible={loadDialogStatus === 'open' ? true : false}
                setVisible={setLoadDialogStatus}
            >
                <ElementPopup
                    loadingDone={loadingEnd}
                    setLoadingDone={(status: boolean) => setLoadingEnd(status)}
                    projectType={props.project?.type}
                    setFiles={(
                        files: File[],
                        mediaType: MediaType,
                        fileType: FileTypeEnum
                    ) => {
                        setMediaForDownload({
                            files,
                            mediaType,
                            fileType,
                        });
                        setLoadDialogStatus('close');
                    }}
                    closeDialog={() => {
                        setLoadDialogStatus('close');
                    }}
                />
            </MyModal>
        </div>
    );
}
