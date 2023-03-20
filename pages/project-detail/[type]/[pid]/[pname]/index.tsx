import { dowloader } from '@/api/download/file';
import { apiFileGet } from '@/api/file/get';
import { FileTypeEnum, IFile } from '@/api/file/interface';
import { apiMediaGet } from '@/api/media/get';
import { IMedia, MediaType } from '@/api/media/interface';
import { apiProjectGet } from '@/api/project/get';
import { IProject, ProjectType } from '@/api/project/interface';
import { apiSpotGet } from '@/api/spot/get';
import { ISpot } from '@/api/spot/interface';
import Player360 from '@/components/360Player';
import Menu360Player from '@/components/360Player/menu';
import AudioPlayerOnTop from '@/components/AudioPlayerOnTop';
import AudioPlayer from '@/components/AudioPlayer';

import ImagePlayer from '@/components/ImagePlayer';
import Pagination from '@/components/Pagination/Pagination';
import Snakbar from '@/components/Snakbar';
import VideoPlayer from '@/components/VideoPlayer';
import styles from '@/styles/app.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProjectContext } from './context';
import { MediaData } from './interface';
import P3DPlayer from '@/components/P3DPlayer';
import MyModal from '@/components/UI/MyModal/MyModal';
import EditPopup from '@/components/EditPopup';

export function formatFileName(name: string, maxLength: number) {
    if (!name) return '';
    const len = name.length;
    if (len <= maxLength) return name;

    const start = name.slice(0, maxLength / 2);
    const end = name.slice(-maxLength / 2);
    return `${start}...${end}`;
}
function getMainFileName(files: IFile[], mediaType: MediaType) {
    let file: string;

    switch (mediaType) {
        case MediaType.audio: {
            file =
                files.find((file) => file.type === FileTypeEnum.audio)?.name ??
                'audio.mp3';
            break;
        }
        case MediaType.video: {
            file =
                files.find((file) => file.type === FileTypeEnum.video)?.name ??
                'noname.mp4';
            break;
        }
        case MediaType.panorama: {
            file =
                files.find((file) => file.type === FileTypeEnum.panorama)
                    ?.name ?? 'noname.jpeg';
            break;
        }
        case MediaType.pseudo3d: {
            file =
                files.find((file) => file.type === FileTypeEnum.pseudo3d)
                    ?.name ?? 'noname.p3d';
            break;
        }
        case MediaType.image: {
            file =
                files.find((file) => file.type === FileTypeEnum.image)?.name ??
                'noname.jpg';
            break;
        }
    }

    return formatFileName(file, 18);
}

function getMainFile(files: IFile[], mediaType: MediaType) {
    let inx: number;

    switch (mediaType) {
        case MediaType.audio: {
            inx = files.findIndex((file) => file.type === FileTypeEnum.audio);
            break;
        }
        case MediaType.video: {
            inx = files.findIndex((file) => file.type === FileTypeEnum.video);
            break;
        }
        case MediaType.panorama: {
            inx = files.findIndex(
                (file) => file.type === FileTypeEnum.panorama
            );
            break;
        }
        case MediaType.pseudo3d: {
            inx = files.findIndex(
                (file) => file.type === FileTypeEnum.pseudo3d
            );
            break;
        }
        case MediaType.image: {
            inx = files.findIndex((file) => file.type === FileTypeEnum.image);
            break;
        }
    }

    return inx >= 0 ? files[inx] : null;
}

function getSoundtrackPath(file: MediaData) {
    if (!file) return null;
    const { files } = file;

    if (!files || !files.length) return null;
    const soundtrack = files.find((file) => file.type === FileTypeEnum.audio);
    return soundtrack ? soundtrack : null;
}

function ProjectDeatil() {
    const router = useRouter();

    const [projectId, setProjectId] = useState<string>();
    const [project, setProject] = useState<IProject>();
    const [refresh, setRefresh] = useState<boolean>(true);
    const [medias, setMedias] = useState<IMedia[]>();
    const [files, setFiles] = useState<MediaData[]>();
    const [spots, setSpots] = useState<ISpot[]>();
    const [currentMedia, setCurrentMedia] = useState<MediaData>(null);
    const [editModal, setEditModal] = useState<boolean>(false);

    useEffect(() => {
        if (!router.query.pid || !refresh) return;

        setProjectId(router.query.pid as string);

        const promises = [];
        promises.push(
            apiProjectGet
                .getSingleProject(parseInt(router.query.pid as string))
                .then((res) => setProject(res ? res[0] : null))
        );
        if (router.query.pid)
            promises.push(apiSpotGet.getAll(router.query.pid as string));

        Promise.all(promises).then((res) => {
            const [project, spots] = res;
            if (spots && spots.length) setSpots(spots);
            if (project && project[0]) setProject(project);
            if (refresh) setRefresh(false);
        });
    }, [router.query.pid, refresh]);

    useEffect(() => {
        if (!project) return;

        apiMediaGet.get(project.id.toString()).then((res) => {
            setMedias(res.sort((a, b) => a.order - b.order));
        });
    }, [project]);

    useEffect(() => {
        if (!medias) return;
        setFiles(null);
        const promises = [];
        for (const media of medias) {
            promises.push(
                apiFileGet.get(media.id.toString()).then((res) => res)
            );
        }
        Promise.all(promises).then((res) => {
            let i = 0;
            for (const media of medias) {
                const filesOfMedia = res[i];
                ++i;
                setFiles((prevState) => {
                    const newFiles = filesOfMedia.map(
                        // апдейтим файлы при загрузке
                        (file) => {
                            const upgradedFile = {
                                ...file,
                                // path в каждом файле - это урл для скачивания
                                path: dowloader.url(file, media),
                            };
                            return upgradedFile;
                        }
                    );

                    const mainFile = getMainFile(newFiles, media.type);

                    const newFile: MediaData = {
                        mediaId: media.id,
                        mediaType: media.type,
                        order: media.order,
                        name: getMainFileName(newFiles, media.type),
                        files: newFiles,
                        mainFile,
                        numberOfLines: media.settings.numberOfLines,
                        spots:
                            spots?.filter(
                                (spot) => spot.source.id === media.id
                            ) ?? [],
                    };

                    const newFilesArr = [...(prevState ?? []), newFile].sort(
                        (a, b) => a.order - b.order
                    );
                    return newFilesArr;
                });
            }
        });
    }, [medias]);

    useEffect(() => {
        if (!files) return;
        let prevOrder = currentMedia?.order;
        let prev;
        for (; prevOrder >= 0; --prevOrder) {
            const curr = files.find((f) => f.order === prevOrder);

            if (!curr) continue;
            prev = curr;
            break;
        }

        setCurrentMedia(prev ?? files[0]);
    }, [files]);

    return (
        <ProjectContext.Provider
            value={[
                refresh,
                (status) => {
                    setRefresh(status);
                },
            ]}
        >
            <div
                className={styles.newProject}
                style={{
                    height:
                        currentMedia?.mediaType === MediaType.audio
                            ? '880px'
                            : '800px',
                }}
            >
                <div className={styles.newProjectTitle}>{project?.name}</div>

                {currentMedia?.mediaType !== MediaType.audio && (
                    <AudioPlayerOnTop
                        soundtrack={getSoundtrackPath(
                            currentMedia ? currentMedia : null
                        )}
                        mediaId={(currentMedia && currentMedia?.mediaId) ?? 0}
                    />
                )}
                <div
                    className={styles.newProjectBlock}
                    style={{
                        height:
                            currentMedia?.mediaType === MediaType.audio
                                ? '550px'
                                : '470px',
                    }}
                >
                    {currentMedia &&
                        currentMedia.mediaType === MediaType.image && (
                            <ImagePlayer
                                url={currentMedia && currentMedia.files[0].path}
                            />
                        )}

                    {currentMedia &&
                        currentMedia.mediaType === MediaType.panorama && (
                            <Player360
                                setCurrentMedia={(mediaId: number) => {
                                    const file = files.find(
                                        (f) => f.mediaId === mediaId
                                    );
                                    if (!file) return;

                                    if (file === currentMedia) return;

                                    setCurrentMedia(file);
                                }}
                                file={currentMedia}
                            />
                        )}

                    {currentMedia &&
                        currentMedia.mediaType === MediaType.audio && (
                            <AudioPlayer current={currentMedia} />
                        )}

                    {currentMedia &&
                        currentMedia.mediaType === MediaType.video && (
                            <VideoPlayer current={currentMedia} />
                        )}
                    {currentMedia &&
                        currentMedia.mediaType === MediaType.pseudo3d && (
                            <P3DPlayer
                                current={currentMedia}
                                needToRefresh={editModal === false}
                            />
                        )}
                </div>
                <div className={styles.newProjectBlockControls}>
                    <Pagination
                        onSelectMedia={(mediaId: number) => {
                            const file = files.find(
                                (f) => f.mediaId === mediaId
                            );
                            if (!file) return;

                            if (file === currentMedia) return;

                            setCurrentMedia(file);
                        }}
                        items={files}
                        current={currentMedia}
                        maxItems={6}
                    />
                    <div className={styles.ruleButtons}>
                        <span
                            onClick={() => setEditModal(true)}
                            className={styles.btnReposts}
                        >
                            Редактировать
                        </span>
                        <span className={styles.btnReposts}>Поделиться</span>
                    </div>
                </div>

                <div className="menu">
                    {project?.type === ProjectType.pano && (
                        <Menu360Player files={files} current={currentMedia} />
                    )}
                </div>
                <div>
                    <Snakbar
                        onSelectMedia={(mediaId: number) => {
                            const file = files.find(
                                (f) => f.mediaId === mediaId
                            );
                            if (!file) return;

                            setCurrentMedia(file);
                        }}
                        files={files}
                        medias={medias}
                        project={project}
                    />
                </div>
                <MyModal visible={editModal} setVisible={setEditModal}>
                    <EditPopup
                        setModal={() => setEditModal(false)}
                        current={currentMedia}
                    />
                </MyModal>
            </div>
        </ProjectContext.Provider>
    );
}

export default ProjectDeatil;
