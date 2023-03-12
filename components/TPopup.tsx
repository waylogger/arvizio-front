import MyInput from './UI/MyInput/MyInput';
import MyButton from './UI/MyButton/MyButton';
import styles from '@/styles/app.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/api/api-client';
import FileInput from './UI/FileInput';
import { FileTypeEnum, MediaType } from '@/api/interface';

const TPopup = (props: { setModal: (status: boolean) => void }) => {
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const [files, setFiles] = useState([]);
    const router = useRouter();
    useEffect(() => {
        if (!projectId) return;
        props.setModal(false);
        router.push('/project');
    }, [projectId]);
    return (
        <div>
            <div className={styles.formProjectTitle}>360</div>
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
                <div className={styles.customFileUpload}>
                    <FileInput onUpload={setFiles} accept=".png, .jpeg, .jpg" />
                </div>
                <MyButton
                    disabled={name ? false : true}
                    onClick={(event) => {
                        event.preventDefault();

                        if (!files || !files.length) {
                            api.createProject({
                                name,
                                description: address ?? '',
                                type: 'pano',
                            }).then((res) => {
                                setProjectId(res);
                            });
                            return
                        }

                        api.createProjectWithFiles(
                            {
                                name,
                                description: address ?? '',
                                type: 'pano',
                            },
                            files,
                            false,
                            MediaType.panorama,
                            FileTypeEnum.panorama
                        ).then((res) => setProjectId(res));
                    }}
                >
                    Создать проект
                </MyButton>
            </form>
        </div>
    );
};

export default TPopup;
