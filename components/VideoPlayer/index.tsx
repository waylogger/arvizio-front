import { FileTypeEnum } from '@/api/file/interface';
import  MediaData  from '@/types/interface';
import ReactPlayer from 'react-player';

export default function VideoPlayer(props: { current: MediaData }) {
    const getMailFile = () => {
        const videoFile = props?.current?.files?.find(
            (f) => f.type === FileTypeEnum.video
        );
        return videoFile;
    };
    return (
        <ReactPlayer
            url={getMailFile().path ?? ''}
            controls={true}
            width="100%"
            height="100%"
        />
    );
}
