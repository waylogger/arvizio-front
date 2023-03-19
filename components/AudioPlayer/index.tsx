import ReactAudioPlayer from 'react-audio-player';

import appStyles from '@/styles/app.module.css';
import FileInput from '../UI/FileInput';
import { useContext, useState } from 'react';
import { ProjectContext } from '@/pages/project-detail/[type]/[pid]/[pname]/context';
import { apiFileCreate } from '@/api/file/create';
import { FileTypeEnum, IFile } from '@/api/file/interface';
import { formatFileName } from '@/pages/project-detail/[type]/[pid]/[pname]';
import { apiFileDelete } from '@/api/file/delete';

export default function audioPlayer(props: {
    soundtrack: IFile | null;
    mediaId: number;
}) {
    const [refresh, setRefresh] = useContext(ProjectContext);

    
    return (
        <div className={appStyles.newProjectControls}>
            <div className={appStyles.newProjectControlsBtn}>
                {props.soundtrack ? (
                    <button
                        className={appStyles.ControlsDelete}
                        onClick={() => {
                            apiFileDelete
                                .delete(props.soundtrack.id.toString())
                                .then((res) => setRefresh(true));
                        }}
                    >
                        <img src="/delete.svg" alt="" />
                    </button>
                ) : (
                    <button
                        className={appStyles.ControlsDelete}
                        onClick={() => {
                            const inp = document.getElementById(
                                `input-audio-${props.mediaId}`
                            );
                            inp.click();
                        }}
                    >
                        <img src="/add.svg" alt="" />
                    </button>
                )}
            </div>
            <div className={appStyles.ControlsAudioName}>
                {props.soundtrack
                    ? formatFileName(props.soundtrack.name, 18)
                    : 'Загрузите саундтрек'}
            </div>

            {props.soundtrack && (
                <ReactAudioPlayer
                    src={props?.soundtrack?.path ?? ''}
                    autoPlay
                    controls
                    preload="auto"
                />
            )}
            <input
                type="file"
                accept="audio/mp3"
                id={`input-audio-${props.mediaId}`}
                multiple={false}
                style={{
                    display: 'none',
                }}
                onChange={(event) => {
                    const files = event.target.files;
                    const arr = Array.from(files);

                    const file = arr[0];

                    apiFileCreate
                        .createAndUpload(
                            props.mediaId,
                            FileTypeEnum.audio,
                            file.name,
                            file
                        )
                        .then((res) => setRefresh(true));
                }}
            />
        </div>
    );
}
