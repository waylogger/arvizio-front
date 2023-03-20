import ReactAudioPlayer from 'react-audio-player';

import appStyles from '@/styles/app.module.css';
import FileInput from '../UI/FileInput';
import { useContext, useState } from 'react';
import { ProjectContext } from '@/pages/project-detail/[type]/[pid]/[pname]/context';
import { apiFileCreate } from '@/api/file/create';
import { FileTypeEnum, IFile } from '@/api/file/interface';
import { formatFileName } from '@/pages/project-detail/[type]/[pid]/[pname]';
import { apiFileDelete } from '@/api/file/delete';
import { MediaData } from '@/pages/project-detail/[type]/[pid]/[pname]/interface';

export default function audioPlayer(props: { current: MediaData }) {
    const getMain = () => {
        const file = props?.current?.files?.find(
            (f) => f.type === FileTypeEnum.audio
        );
        return file?.path;
    };
    return (
        <div style={{
            height: '100%',
            width: '100%',
            backgroundImage: `url('/types/audio.png')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: '20px',
            boxSizing: 'border-box',

        }}> 
            <ReactAudioPlayer
                src={getMain() ?? ''}
                // autoPlay
                controls
                preload="auto"
            />
        </div>
    );
}
