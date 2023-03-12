import MyInput from './UI/MyInput/MyInput';
import MyButton from './UI/MyButton/MyButton';
import styles from '@/styles/app.module.css';
import { useEffect, useState } from 'react';
import { api } from '@/api/api-client';
import { useRouter } from 'next/router';

const GalleryPopup = (props: { setModal: (status: boolean) => void }) => {
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const [projectId, setProjectId] = useState(null);

    const router = useRouter();
    useEffect(() => {
        if (!projectId) return;
        props.setModal(false);
        router.push('/project');
    }, [projectId]);

    return (
        <div>
            <div className={styles.formProjectTitle}>Галлерея</div>
            <div className={styles.formProjectDescr}>Создание проекта</div>
            <form className={styles.formLogin}>
                <MyInput
                    type="text"
                    placeholder="Имя проекта"
                    onInput={(event) => {
                        setName(event.target.value);
                    }}
                />
                <MyInput
                    type="text"
                    placeholder="Адрес вашего сайта (опционально)"
                    onInput={(event) => {
                        setAddress(event.target.value);
                    }}
                />
                <MyButton
                    disabled={name ? false : true}
                    onClick={(event) => {
                        event.preventDefault();
                        api.createProject({
                            name,
                            description: address ?? '',
                            type: 'gallery',
                        }).then((res) => {
                            setProjectId(res);
                        });
                    }}
                >
                    Создать проект
                </MyButton>
            </form>
        </div>
    );
};

export default GalleryPopup;
