import { FileTypeEnum, IFile } from '@/api/file/interface';
import { apiFilePatch } from '@/api/file/patch';
import { apiMediaPatch } from '@/api/media/patch';
import MediaData  from '@/types/interface';
import styles from '@/styles/app.module.css';

import { useEffect, useState } from 'react';
import ImageLine from './imageLine';

export default function EditPopup(props: {
    setModal: () => void;
    current: MediaData;
}) {
    const [lines, setLines] = useState<IFile[][]>([]);
    const [needToRefresh, setNeedToRefresh] = useState<boolean>(false);
    const [dragFile, setDragFile] = useState<IFile>(null);
    const [dropFile, setDropFile] = useState<IFile>(null);
    useEffect(() => {
        if (!props.current) return;

        const numberOfLines = props.current.numberOfLines;
        const linesArr = [];
        for (let i = 0; i < numberOfLines; ++i) {
            linesArr.push([]);
        }

        setLines(linesArr);
    }, [props.current]);

    const reorder = () => {
        const p3dFiles = props?.current?.files
            ?.filter((f) => f.type === FileTypeEnum.pseudo3d)
            .sort(
                (a, b) => a.settings.relativeColumn - b.settings.relativeColumn
            );
        
        

        for (let i = 0; i < lines.length; ++i) lines[i] = [];
        for (let i = 0; i < p3dFiles.length; ++i) {
            const file = p3dFiles[i];
            // const trumb = props.current.files.find( f => f.id === parseInt(file.name.split('-')[0]) )
            // if (source) {
            //     file.path = trumb.path
            // }
            const arr = lines[file.settings.relativeLine] ?? lines[0]
        
            if (
                !arr.find((f) => f.id === file.id)
            ) {

                if (file.settings.relativeColumn === 0){
                    file.settings.relativeColumn = arr.length
                }
                arr.push(file)
            }
        }

        // сортируем
        for (let i = 0; i < lines.length; ++i) {
            lines[i].sort(
                (a, b) => a.settings.relativeColumn - b.settings.relativeColumn
            );
        }
        // определяем файоы для обновления настроек
        for (let i = 0; i < lines.length; ++i) {
            lines[i].sort(
                (a, b) => a.settings.relativeColumn - b.settings.relativeColumn
            );
        }

        const promises = []
        for (let i =0; i < p3dFiles.length; ++i) {
            promises.push(
                apiFilePatch.patch(p3dFiles[i])
            )
        }
        
        Promise.all(promises).then(res => res)
    };


    useEffect(()=>{
        if (!dropFile || !dragFile) return

        const swap = dropFile.settings.relativeColumn
        dropFile.settings.relativeColumn = dragFile.settings.relativeColumn
        dragFile.settings.relativeColumn = swap

        setDragFile(null)
        setDropFile(null)
        setNeedToRefresh(true)

    },[dropFile])
    useEffect(() => {
        if (!lines.length) return;
        reorder();
    }, [lines]);
    useEffect(() => {
        if (!needToRefresh) return;
        if (!lines.length) return;
        reorder();
        setNeedToRefresh(false);
    }, [needToRefresh]);

    return (
        <div>
            <div className={styles.formProjectTitle}>Псевдо 3D</div>
            <div className={styles.formProjectDescr}>
                Редактирование проекта - перемещайте изображения{' '}
            </div>
            <div
                className={styles.formProject}
                style={{
                    overflowY: 'scroll',
                    maxHeight: '600px',
                }}
            >
                {lines.map((line, inx) => (
                    <ImageLine
                        setDragFile={(file: IFile) => setDragFile(file)}
                        dragFile={dragFile}
                        images={line}
                        key={line.map((l) => l.id).join('-') + inx + inx}
                        moveFile={(file: IFile, numOfLine: number) => {
                            file.settings.relativeLine = numOfLine;
                            setNeedToRefresh(true);
                        }}
                        numberOfLine={inx}
                        setDropFile={
                            (file: IFile) => {
                                setDropFile(file)
                            }
                        }
                    />
                ))}
            </div>
            <div
                className={styles.formProject}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <button
                  className={styles.btnReposts}
                    onClick={() => {
                        apiMediaPatch
                            .patch(props.current.mediaId, undefined, {
                                numberOfLines: lines.length + 1,
                            })
                            .then((res) => {
                                setLines((prev) => [...prev, []]);
                            }).then(res => setNeedToRefresh(true))
                    }}
                >
                    +
                </button>
                <button
                    className={styles.btnReposts}
                    onClick={() => {
                        if (lines.length === 1) return;
                        apiMediaPatch
                            .patch(props.current.mediaId, undefined, {
                                numberOfLines: lines.length - 1,
                            })
                            .then((res) => {
                                setLines((prev) =>
                                    prev.slice(0, prev.length - 1)
                                );
                            })
                            .then(res => setNeedToRefresh(true))
                    }}
                >
                    -
                </button>
            </div>
        </div>
    );
}
