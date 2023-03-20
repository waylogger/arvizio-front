import { IFile } from '@/api/file/interface';
import P3DEditImage from '../image';
import styles from './image-line.module.css';

export default function ImageLine(props: {
    images: IFile[];
    setDragFile: (file: IFile) => void;
    setDropFile: (file: IFile) => void;
    dragFile: IFile;
    moveFile: (file: IFile, numOfLine: number) => void;
    numberOfLine: number;
}) {
    return (
        <div
            className={styles.imageLine}
            onDragStart={(event) => {}}
            onDragEnd={(event) => () => {}}
            onDragLeave={(event) => {
                event.preventDefault();
            }}
            onDragOver={(event) => {
                event.preventDefault();
            }}
            onDrop={(event) => {
                event.preventDefault();

                props.moveFile(props.dragFile,props.numberOfLine)

            }}
        >
            {props.images &&
                props.images.map((image) => (
                    <P3DEditImage
                        setDropFile={props.setDropFile}
                        key={image.id}
                        file={image}
                        setDragFile={props.setDragFile}
                    />
                ))}
        </div>
    );
}
