import { dowloader } from '@/api/download/file';
import { apiFileGet } from '@/api/file/get';
import { FileTypeEnum, IFile } from '@/api/file/interface';
import { apiMediaGet } from '@/api/media/get';
import { IMedia, MediaType } from '@/api/media/interface';
import { apiProjectGet } from '@/api/project/get';
import { IProject } from '@/api/project/interface';
import AudioPlayer from '@/components/AudioPlayer';
import Snakbar from '@/components/Snakbar';
import styles from '@/styles/app.module.css';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
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


function getSoundtrackPath(file: MediaData) {
    if (!file) return null
    const {files} = file

    if (!files || !files.length) return null
    const soundtrack = files.find(file => file.type === FileTypeEnum.audio)
    return soundtrack ? soundtrack : null

}

function ProjectDeatil() {
    const router = useRouter();

    const [projectId, setProjectId] = useState<string>();
    const [project, setProject] = useState<IProject>();
    const [refresh, setRefresh] = useState<boolean>(true);
    const [medias, setMedias] = useState<IMedia[]>();
    const [files, setFiles] = useState<
        {
            mediaId: number;
            mediaType: MediaType;
            files: IFile[]; // change path here
            order: number;
            name: string;
        }[]
    >();

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
                    const files = res.map(
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
                    const newFile = {
                        mediaId: media.id,
                        mediaType: media.type,
                        order: media.order,
                        name: getMainFileName(files, media.type),
                        files,
                    };

                    return [...(prevState ?? []), newFile];
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

                <AudioPlayer soundtrack={getSoundtrackPath(files ? files[0] : null)} mediaId={(files && files[0]?.mediaId) ?? 0} />
                <div className={styles.newProjectBlock}>
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src="/slider-one.jpg" alt="alt" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/slider-one.jpg" alt="alt" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/slider-one.jpg" alt="alt" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/slider-one.jpg" alt="alt" />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className={styles.newProjectBlockControls}>
                    {/* <div className={styles.newProjectSpots}>
                        <div className={styles.newProjectSpotsName}>Споты</div>
                        <div className={styles.ProjectSpotsItem}>
                            <label className={styles.checkboxGoogle}>
                                <input
                                    type="checkbox"
                                    className={styles.checkSwith}
                                    style={{ zIndex: 1 }}
                                />
                                <span
                                    className={styles.checkboxGoogleSwitch}
                                ></span>
                                spot1.jpeg
                            </label>
                        </div>
                        <div className={styles.ProjectSpotsItem}>
                            <label className={styles.checkboxGoogle}>
                                <input
                                    type="checkbox"
                                    className={styles.checkSwith}
                                />
                                <span
                                    className={styles.checkboxGoogleSwitch}
                                ></span>
                                spot1.jpeg
                            </label>
                        </div>
                        <div className={styles.ProjectSpotsItem}>
                            <label className={styles.checkboxGoogle}>
                                <input
                                    type="checkbox"
                                    className={styles.checkSwith}
                                />
                                <span
                                    className={styles.checkboxGoogleSwitch}
                                ></span>
                                spot1.jpeg
                            </label>
                        </div>
                    </div> */}
                    <div className={styles.btnReposts}>
                        <button>Поделиться</button>
                        {/* <button>Редактировать</button> */}
                    </div>
                </div>
                <div>
                    <Snakbar files={files} medias={medias} project={project} />
                </div>
            </div>
        </ProjectContext.Provider>
    );
}

export default ProjectDeatil;
