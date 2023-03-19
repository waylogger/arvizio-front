import { MediaData } from '@/pages/project-detail/[type]/[pid]/[pname]/interface';
import { isResSent } from 'next/dist/shared/lib/utils';
import { useEffect, useState } from 'react';

import styles from './pagination.module.css';

export default function Pagination(props: {
    maxItems: number;
    onSelectMedia: (mediaId: number) => void;
    current: MediaData;
    items: MediaData[];
}) {
    const clickOnNumber = (event) => {
        setEventSource('click');
        const item = event.target.innerText;
        setCurrentItem(parseInt(item));
    };
    const clickOnNext = (event) => {
        setEventSource('click');
        setCurrentItem((prev) => {
            return prev === items[items.length - 1] ? prev : prev + 1;
        });
    };
    const clickOnPrev = (event) => {
        setEventSource('click');
        setCurrentItem((prev) => {
            return prev === items[0] ? prev : prev - 1;
        });
    };
    const [items, setItems] = useState<number[]>();
    const [currentItem, setCurrentItem] = useState<number>(0);
    const [firstVisible, setFirstVisible] = useState<number>(0);
    const [lastVisible, setLastVisible] = useState<number>(0);
    const [eventSource, setEventSource] = useState<'click' | null>(null);
    useEffect(() => {
        setFirstVisible(0);
        setLastVisible(props.maxItems);
        document.addEventListener('click', () => {
            setEventSource(null);
        });
    }, [props.maxItems]);

    useEffect(() => {
        if (!props || !props.items) return;
        setItems(props.items.map((f, inx) => inx + 1));
    }, [props.items]);

    useEffect(() => {
        if (!props || !props.current) return;

        const inx = props.items.findIndex(
            (itm) => itm.mediaId === props.current.mediaId
        );
        setCurrentItem(inx + 1);
    }, [props.current]);

    useEffect(() => {
        if (!currentItem || !lastVisible) return;
        if (currentItem < firstVisible + 1) {
            setFirstVisible(currentItem - 1);

            const len = lastVisible - currentItem + 1;
            if (len > props.maxItems) {
                setLastVisible((prev) => {
                    return prev - 1;
                });
            }
        }
        if (currentItem > lastVisible) {
            setLastVisible(currentItem);

            const len = currentItem - firstVisible;
            if (len > props.maxItems) {
                setFirstVisible((prev) => {
                    return prev + 1;
                });
            }
        }

        if (!props.items) return;

        const select = props.items[currentItem - 1].mediaId;
        const current = props.current.mediaId;

        if (select === current) return;
        // обновляем только после клика
        if (eventSource !== 'click') return;

        setEventSource(null);
        props.onSelectMedia(select);
    }, [currentItem]);

    return (
        <div className={styles.pagination}>
            <button onClick={clickOnPrev} className={styles.paginationButton}>
                <img src="/btn-left.svg" />
            </button>
            {items &&
                items.slice(firstVisible, lastVisible).map((item) => (
                    <button
                        key={item}
                        className={
                            item === currentItem
                                ? [styles.selected, styles.page].join(' ')
                                : styles.page
                        }
                        onClick={clickOnNumber}
                    >
                        {' '}
                        {item}{' '}
                    </button>
                ))}
            <button onClick={clickOnNext} className={styles.paginationButton}>
                <img src="/btn-right.svg" />
            </button>
        </div>
    );
}
