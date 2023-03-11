import React from 'react';
import styles from "@/styles/app.module.css";
import Link from "next/link";
import Image from "next/image";

const ProjectItem = ({project}) => {
    return (
        <div className={styles.libraryProjectItem}>
            <div className={styles.ProjectItemImage}>
                <Image src={project.image} width={300} height={150} alt={project.title} />
            </div>
            <div className={styles.ProjectItemNum}>
                {project.num}
            </div>
            <div className={styles.ProjectItemTitle}>
                {project.title}
            </div>
            <div className={styles.ProjectItemDescription}>
                {project.descr}
                <span className={styles.tooltip}>Тут будет описание проекта Тут будет описание проекта Тут будет описание проекта Тут будет описание проекта Тут будет описание проекта Тут будет описание проекта Тут будет описание проекта</span>
            </div>
            <div className={styles.ProjectItemOpen}>
                <label className={styles.checkboxGoogle}>
                        <input type="checkbox" className={styles.checkSwith}  />
                        <span className={styles.checkboxGoogleSwitch}></span>
                    Открытый проект
                </label>
            </div>
            <div className={styles.ProjectItemBtns}>
                <div className={styles.ProjectItemBtnDetail}>
                    <Link href={`/projectDetail`}>Перейти</Link>
                </div>
                <div className={styles.ProjectItemBtnDelete}>
                    <button>Удалить</button>
                </div>
            </div>
        </div>
    )
}

export default ProjectItem;