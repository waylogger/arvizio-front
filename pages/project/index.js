import styles from "../../styles/app.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import ProjectItem from "@/components/ProjectItem";

function Index() {

    const [project, setProject] = useState ([
        {id:1, title: 'Ryazan_preview', num: 'Проект номер 1', descr: 'Тут будет описание проекта', image: '/../public/library.jpg'},
        {id:2, title: 'Ryazan_preview', num: 'Проект номер 1', descr: 'Тут будет описание проекта', image: '/../public/library.jpg'},
        {id:3, title: 'Ryazan_preview', num: 'Проект номер 1', descr: 'Тут будет описание проекта', image: '/../public/library.jpg'},
        {id:4, title: 'Ryazan_preview', num: 'Проект номер 1', descr: 'Тут будет описание проекта', image: '/../public/library.jpg'},
        {id:5, title: 'Ryazan_preview', num: 'Проект номер 1', descr: 'Тут будет описание проекта', image: '/../public/library.jpg'},
        {id:6, title: 'Ryazan_preview', num: 'Проект номер 1', descr: 'Тут будет описание проекта', image: '/../public/library.jpg'},
    ])

    return (
        <div className={styles.libraryPage}>
            <div>
                <h1>Библиотека проектов</h1>
            </div>
            <div className={styles.libraryRow}>
                <div className={styles.libraryAside}>
                    <div className={styles.libraryAsideNew}>Новый проект</div>
                    <div className={styles.libraryAsideTitle}>Создайте свой уникальный проект</div>
                    <div className={styles.libraryAsideLink}>
                        <Link href="/newProject">Создать проект</Link>
                    </div>
                </div>
                <div className={styles.libraryArticle}>
                    <div className={styles.libraryProjectList}>
                        {project.map((project) =>
                            <ProjectItem project={project} key={project.id} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;