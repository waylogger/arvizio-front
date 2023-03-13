import React, { useEffect, useState } from 'react';
import styles from "@/styles/app.module.css";
import Link from "next/link";
import Image from "next/image";
import { IProject } from '@/api/project/interface';
import { apiProjectPatch } from '@/api/project/patch';
import { apiProjectDelete } from '@/api/project/delete';
import { useRouter } from 'next/router';

const ProjectItem = (
    props: {
        project: IProject,
        inx: number
    }
) => {
    const [ status,setStatus] = useState<boolean>(false)
    const [display,setDisplay] = useState<'none' | 'block'>('block')
    const router = useRouter()


    useEffect(
        ()=>{
           setStatus(props.project.public) 
        },[]
    )

    useEffect(()=>{
            apiProjectPatch.setPublic({
                ...props.project,
                public: status
            })
    },[status])
    return (
        <div className={styles.libraryProjectItem} style={
            {display}
        }>
            <div className={styles.ProjectItemImage}>
                <Image src={'/../public/library.jpg'} width={300} height={150} alt={props.project.name} />
            </div>
            <div className={styles.ProjectItemNum}>
                {props.inx+1}
            </div>
            <div className={styles.ProjectItemTitle}>
                {props.project.name}
            </div>
            <div className={styles.ProjectItemDescription}>
                {props.project.description}
                <span className={styles.tooltip}>Тут будет описание проекта Тут будет описание проекта Тут будет описание проекта Тут будет описание проекта Тут будет описание проекта Тут будет описание проекта Тут будет описание проекта</span>
            </div>
            <div className={styles.ProjectItemOpen}>
                <label className={styles.checkboxGoogle}>
                        <input type="checkbox" checked={status} className={styles.checkSwith} onChange={
                            (event) => {
                                setStatus(event.target.checked)
                            }
                        }  />
                        <span className={styles.checkboxGoogleSwitch}></span>
                    Открытый проект
                </label>
            </div>
            <div className={styles.ProjectItemBtns}>
                <div className={styles.ProjectItemBtnDetail}>
                    <Link href={`/projectDetail/${props.project.id}/${props.project.name?.replace(/\s+/g,'_')}`}>Перейти</Link>
                </div>
                <div className={styles.ProjectItemBtnDelete}>
                    <button onClick={
                        ()=>{
                            apiProjectDelete.deleteProject(props.project.id).then(res => setDisplay('none'))
                        }
                    }>Удалить</button>
                </div>
            </div>
        </div>
    )
}

export default ProjectItem;
