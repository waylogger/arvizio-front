import MyInput from './UI/MyInput/MyInput';
import MyButton from './UI/MyButton/MyButton';
import styles from '@/styles/app.module.css';
import { useEffect, useState } from 'react';
import { api } from '@/api/api-client';
import { useRouter } from 'next/router';
import FileInput, { fileInputMessage } from './UI/FileInput';
import { FileTypeEnum, MediaType } from '@/api/interface';

const PD3Popup = (props: { setModal: (status: boolean) => void }) => {
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
            <div className={styles.formProjectTitle}>Псевдо 3D</div>
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
                    <FileInput
                        name={'pseudo3d'}
                        onUpload={setFiles}
                        accept=".png, .jpeg, .jpg"
                    >
                        {<span>{fileInputMessage(files)}</span>}
                    </FileInput>
                </div>
                <MyButton
                    disabled={name ? false : true}
                    onClick={(event) => {
                        event.preventDefault();

                        if (!files || !files.length) {
                            api.createProject({
                                name,
                                description: address ?? '',
                                type: 'pseudo3d',
                            }).then((res) => {
                                setProjectId(res);
                            });
                            return;
                        }

                        api.createProjectWithFiles(
                            {
                                name,
                                description: address ?? '',
                                type: 'pseudo3d',
                            },
                            files,
                            false,
                            MediaType.pseudo3d,
                            FileTypeEnum.pseudo3d
                        ).then((res) => setProjectId(res));
                    }}
                >
                    Создать проект
                </MyButton>
            </form>
        </div>
    );
};

export default PD3Popup;
