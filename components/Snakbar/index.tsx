import { api } from '@/api/api-client';
import { FileTypeEnum, IFile } from '@/api/file/interface';
import { apiMediaDelete } from '@/api/media/delete';
import { IMedia, MediaType } from '@/api/media/interface';
import { apiMediaPatch } from '@/api/media/patch';
import { IProject } from '@/api/project/interface';
import { UserContext } from '@/context';
import { ProjectContext } from '@/pages/project-detail/[type]/[pid]/[pname]/context';
import { loadDefaultErrorComponents } from 'next/dist/server/load-components';
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

export default function Snakbar(props: {
    project: IProject;
    medias: IMedia[];
    files: {
        mediaId: number;
        order: number,
        mediaType: MediaType;
        files: IFile[]; // change path here
    }[];
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
        if (!mediaForDelete) return;

        apiMediaDelete.delete(mediaForDelete.toString()).then((res) => {
            setRefresh(true);
        });
    }, [mediaForDelete]);

    useEffect(() => {
        console.log({
            dragMedia,
            dropMedia
        });
        
        if (!dragMedia || !dropMedia) return;

        const from = props.files.find(media => media.mediaId === dragMedia)
        const to = props.files.find(media => media.mediaId === dropMedia)

        apiMediaPatch.patch(from.mediaId,to.order)
        apiMediaPatch.patch(to.mediaId,from.order)

        const xch = from.order
        from.order = to.order
        to.order =xch




        setDragMedia(null);
        setDropMedia(null);
    }, [dropMedia]);

    const [mode, setMode] = useState<'open' | 'close'>('close');
    return (
        <div
            className={styles.snackbar}
            style={
                mode === 'open'
                    ? {
                          maxHeight: '200px',
                          height: '200px',
                      }
                    : {
                          maxHeight: '50px',
                          height: '50px',
                      }
            }
        >
            <div
                className={styles.snackbarButton}
                onClick={() => setMode(mode === 'close' ? 'open' : 'close')}
            >
                <span>
                    Навигация <span>{mode === 'close' ? '+' : '-'}</span>
                </span>
            </div>
            <div className={styles.imageLine}>
                <div className={styles.images}>
                    {props.files && props.files.length ? (
                        props.files.sort(
                            (a,b) => a.order - b.order
                        ).map((filesOfMedia) => {
                            return (
                                <SnackbarImage
                                    dragHandler={(media: number) => {
                                        console.log({
                                            drag: media,
                                        });

                                        setDragMedia(media);
                                    }}
                                    dropHandler={(media) => {
                                        console.log({
                                            drop: media,
                                        });

                                        setDropMedia(media);
                                    }}
                                    mediaId={filesOfMedia.mediaId}
                                    key={filesOfMedia.mediaId}
                                    url={
                                        findImageForNavigation(
                                            filesOfMedia.files
                                        )?.path
                                    }
                                    type={filesOfMedia.mediaType}
                                >
                                    <button
                                        onClick={() => {
                                            setMediaForDelete(
                                                filesOfMedia.mediaId
                                            );
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </SnackbarImage>
                            );
                        })
                    ) : (
                        <div>no images yet</div>
                    )}
                </div>
                <div
                    className={styles.addMedia}
                    onClick={() => {
                        setLoadDialogStatus('open');
                    }}
                >
                    +
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
