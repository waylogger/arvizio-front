import { dowloader } from '@/api/download/file';
import { apiFileGet } from '@/api/file/get';
import { FileTypeEnum, IFile } from '@/api/file/interface';
import { apiMediaGet } from '@/api/media/get';
import { IMedia, MediaType } from '@/api/media/interface';
import { apiProjectGet } from '@/api/project/get';
import { IProject } from '@/api/project/interface';
import AudioPlayer from '@/components/AudioPlayer';
import ImagePlayer from '@/components/ImagePlayer';
import Pagination from '@/components/Pagination/Pagination';
import Snakbar from '@/components/Snakbar';
import styles from '@/styles/app.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProjectContext } from './context';
import { MediaData } from './interface';

export function formatFileName(name: string, maxLength: number) {
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
    const [currentMedia, setCurrentMedia] = useState<MediaData>(null);

    useEffect(() => {
        if (!router.query.pid || !refresh) return;

        setProjectId(router.query.pid as string);
        apiProjectGet
            .getSingleProject(parseInt(router.query.pid as string))
            .then((res) => setProject(res ? res[0] : null))
            .then((res) => {
                if (refresh) setRefresh(false);
            });
    }, [router.query.pid, refresh]);

    useEffect(() => {
        if (!project) return;

        apiMediaGet.get(project.id.toString()).then((res) => {
            setMedias(res);
        });
    }, [project]);

    useEffect(() => {
        if (!medias) return;
        setFiles(null);
        for (const media of medias) {
            apiFileGet.get(media.id.toString()).then((res) => {
                setFiles((prevState) => {
                    const newFiles = res.map(
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

                    const newFile = {
                        mediaId: media.id,
                        mediaType: media.type,
                        order: media.order,
                        name: getMainFileName(newFiles, media.type),
                        files: newFiles,
                        mainFile,
                    };

                    const newFilesArr = [...(prevState ?? []), newFile].sort(
                        (a, b) => a.order - b.order
                    );

                    let prevOrder = currentMedia?.order
                    let prev;
                    for (; prevOrder >= 0; --prevOrder) {
                        const curr = newFilesArr.find(f => f.order === prevOrder)
                        
                        if (!curr) continue;
                        prev = curr;
                        break;
                    }
                    
                    setCurrentMedia(prev ?? newFilesArr[0]);
                    return newFilesArr;
                });
            });
        }
    }, [medias]);

    return (
        <ProjectContext.Provider
            value={[
                refresh,
                (status) => {
                    setRefresh(status);
                },
            ]}
        >
            <div className={styles.newProject}>
                <div className={styles.newProjectTitle}>{project?.name}</div>

                <AudioPlayer
                    soundtrack={getSoundtrackPath(
                        currentMedia ? currentMedia : null
                    )}
                    mediaId={(currentMedia && currentMedia?.mediaId) ?? 0}
                />
                <div className={styles.newProjectBlock}>
                    {currentMedia &&
                        currentMedia.mediaType === MediaType.image && (
                            <ImagePlayer
                                url={currentMedia && currentMedia.files[0].path}
                            />
                        )}

                    {currentMedia &&
                        currentMedia.mediaType === MediaType.panorama && (
                            <ImagePlayer
                                url={currentMedia && currentMedia.files[0].path}
                            />
                        )}

                    {currentMedia &&
                        currentMedia.mediaType === MediaType.audio && (
                            <ImagePlayer
                                url={currentMedia && currentMedia.files[0].path}
                            />
                        )}

                    {currentMedia &&
                        currentMedia.mediaType === MediaType.video && (
                            <ImagePlayer
                                url={currentMedia && currentMedia.files[0].path}
                            />
                        )}
                    {currentMedia &&
                        currentMedia.mediaType === MediaType.pseudo3d && (
                            <ImagePlayer
                                url={currentMedia && currentMedia.files[0].path}
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

                            setCurrentMedia(file);
                        }}
                        items={files}
                        current={currentMedia}
                        maxItems={6}
                    />
                    {/* <div className={styles.btnReposts}> */}
                    {/* <button>Поделиться</button> */}
                    {/* <button>Редактировать</button> */}
                    {/* </div> */}
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
            </div>
        </ProjectContext.Provider>
    );
}

export default ProjectDeatil;
