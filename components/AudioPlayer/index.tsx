import ReactAudioPlayer from 'react-audio-player';

import { FileTypeEnum } from '@/api/file/interface';
import MediaData from '@/types/interface';

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
