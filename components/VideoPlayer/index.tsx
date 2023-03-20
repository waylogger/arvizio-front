import { FileTypeEnum } from '@/api/file/interface';
import { MediaData } from '@/pages/project-detail/[type]/[pid]/[pname]/interface';
import ReactPlayer from 'react-player';

export default function VideoPlayer(props: { current: MediaData }) {
    const getMailFile = () => {
        const videoFile = props?.current?.files?.find(
            (f) => f.type === FileTypeEnum.video
        );
        return videoFile;
    };
    return <ReactPlayer url={getMailFile().path ?? ''} />;
}
