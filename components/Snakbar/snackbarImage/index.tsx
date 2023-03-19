import { MediaType } from '@/api/media/interface';
import { DragEvent, ReactNode, useState } from 'react';

import style from './snackbarImage.module.css';
// function onDragOverHandler(event: DragEvent<HTMLDivElement>): void {
//     event.preventDefault();

// }

// function onDropHandler(event: DragEvent<HTMLDivElement>): void {
//     event.preventDefault();
//     console.log({
//         action: 'drop',
//         // target: props.mediaId
//     });
// }
// function onDragStartHandler(event: DragEvent<HTMLDivElement>): void {
//     console.log({
//         action: 'drag',
//         target: props.mediaId
//     });
// }

// function onDragLeaveHandler(event: DragEvent<HTMLDivElement>): void {

// }
// function onDragEndHandler(event: DragEvent<HTMLDivElement>): void {

// }
export default function SnackbarImage(props: {
    url: string;
    name: string;
    mediaId: number;
    type: MediaType;
    children: ReactNode;
    onSelectMedia: (mediaId) => void;
    dragHandler: (media: number) => void;
    dropHandler: (media: number) => void;
}) {
    return (
        <div onClick={() => props.onSelectMedia(props.mediaId)}>
            <div
                id={props.mediaId.toString()}
                onDragStart={(event) => props.dragHandler(props.mediaId)}
                onDragEnd={(event) => () => {}}
                onDragLeave={(event) => {
                    event.preventDefault();
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                }}
                onDrop={(event) => {
                    event.preventDefault();
                    props.dropHandler(props.mediaId);
                }}
                draggable={true}
                className={style.snackbarImage}
                style={{
                    backgroundImage: `url(${props.url})`,
                }}
            >
                {props.children}
            </div>
            <div className={style.imageName}>{props.name}</div>
        </div>
    );
}
