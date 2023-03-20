import { FileTypeEnum, IFile } from '@/api/file/interface';
import  MediaData from '@/types/interface';
import { SyntheticEvent, useEffect, useState } from 'react';
import style from './image-player.module.css';

interface ICoords {
    x: number;
    y: number;
}
export default function P3DPlayer(props: {
    current: MediaData;
    needToRefresh: boolean;
}) {
    const [lines, setLines] = useState<IFile[][]>([]);
    const [needToRefresh, setNeedToRefresh] = useState<boolean>(false);
    const [down, setDown] = useState<boolean>(false);
    const [pixelStep, setPixelStep] = useState(10);
    const [cursorStart, setCursorStart] = useState<ICoords>({ x: 0, y: 0 });
    const [cursorEnd, setCursorEnd] = useState<ICoords>({ x: 0, y: 0 });
    const [line, setLine] = useState<number>(null);
    const [col, setCol] = useState<number>(null);
    const [currentImage, setCurrentImage] = useState<string>('');

    useEffect(()=>{
        if (!props.needToRefresh) return
        setNeedToRefresh(true)
    },[props.needToRefresh])
    useEffect(() => {
        if (!lines || line === null || col === null) return;

        if (lines.length && lines[line].length) {
            let image = lines[line][col];
            while (!image && col >= 0) {
                setCol((prev) => prev - 1);
                image = lines[line][col];
            }
            setCurrentImage(image.path);
        }
    }, [col, line, lines]);

    const nextCol = () => {
        if (col >= lines[line].length - 1) return;
        setCol((prev) => prev + 1);
    };

    const prevCol = () => {
        if (col <= 0) return;
        setCol((prev) => prev - 1);
    };

    const nextLine = () => {
        if (line >= lines.length - 1) return;
        setLine((prev) => prev + 1);
    };

    const prevLine = () => {
        if (line <= 0) return;
        setLine((prev) => prev - 1);
    };

    const mouseMove = (e: any) => {
        if (!down) return;

        const x = e.clientX ?? e.touches[0].clientX;

        const y = e.clientY ?? e.touches[0].clientY;

        if (cursorStart.x === 0 && cursorStart.y === 0) {
            setCursorStart({ x, y });
        }

        setCursorEnd({ x, y });

        const xDiff = cursorEnd.x - cursorStart.x;
        const yDiff = cursorEnd.y - cursorStart.y;

        if (xDiff > pixelStep) {
            nextCol();
            setCursorStart({ x: 0, y: 0 });
            setCursorEnd({ x: 0, y: 0 });
            return;
        }
        if (xDiff < -pixelStep) {
            prevCol();
            setCursorStart({ x: 0, y: 0 });
            setCursorEnd({ x: 0, y: 0 });
            return;
        }
        if (yDiff > pixelStep) {
            nextLine();
            setCursorStart({ x: 0, y: 0 });
            setCursorEnd({ x: 0, y: 0 });
            return;
        }
        if (yDiff < -pixelStep) {
            prevLine();
            setCursorStart({ x: 0, y: 0 });
            setCursorEnd({ x: 0, y: 0 });
            return;
        }
    };
    useEffect(() => {
        if (!props.current) return;

        document.addEventListener('mouseup', () => setDown(false));

        const numberOfLines = props.current.numberOfLines;

        const linesArr = [];
        for (let i = 0; i < numberOfLines; ++i) {
            linesArr.push([]);
        }

        setLines(linesArr);
        setCol(null);
        setLine(null);
    }, [props.current]);

    const reorder = () => {
        const p3dFiles = props?.current?.files?.filter(
            (f) => f.type === FileTypeEnum.pseudo3d
        );

        for (let i = 0; i < p3dFiles.length; ++i) {
            const file = p3dFiles[i];
            if (file.settings.relativeLine > lines.length - 1)
                file.settings.relativeLine = 0;
            const arr = lines[file.settings.relativeLine];
            arr.push(file);
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
        setLine(0);
        setCol(0);
    };
    useEffect(() => {
        if (!lines.length) return;
        reorder();
    }, [lines]);
    useEffect(() => {
        if (!lines.length) return;
        if (!needToRefresh) return;
        reorder();
        setNeedToRefresh(false);
    }, [needToRefresh]);

    return (
        <div
            onMouseDown={() => {
                setDown(true);
            }}
            onTouchStart={() => setDown(true)}
            onMouseUp={() => setDown(false)}
            onTouchEnd={() => setDown(false)}
            onMouseMove={(e) => mouseMove(e as any)}
            onTouchMove={(e) => mouseMove(e as any)}
            className={style.imagePlayer}
            style={{
                backgroundImage: `url(${currentImage})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                cursor: lines.length > 1 ? 'move' : 'ew-resize',
                userSelect: 'none',
            }}
        ></div>
    );
}
