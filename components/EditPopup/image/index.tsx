import { IFile } from '@/api/file/interface';
import { formatFileName } from '@/pages/project-detail/[type]/[pid]/[pname]';
import styles from './p-3d-image.module.css';

export default function P3DEditImage(props: {
    file: IFile;
    setDragFile: (file: IFile) => void;
    setDropFile: (file: IFile) => void;
}) {
    return (
        <div>
            <div
                onDragStart={(event) => {
                    props.setDragFile(props.file);
                }}
                onDragEnd={(event) => () => {}}
                onDragLeave={(event) => {
                    event.preventDefault();
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                }}
                onDrop={(event) => {
                    event.preventDefault();
                    props.setDropFile(props.file);
                }}
                draggable={true}
                className={styles.P3DImage}
                style={{
                    backgroundImage: `url(${props.file.path})`,
                }}
            ></div>
            <div style={{
                textAlign: 'center'
            }}>
                <span>
                    {formatFileName(props.file.name,20)}
                </span>
            </div>
        </div>
    );
}
