import styles from '../../styles/app.module.css';
import Link from 'next/link';

import React, { useEffect, useState } from 'react';
import ProjectItem from '@/components/ProjectItem';
import { IProject } from '@/api/project/interface';
import { apiProjectGet } from '@/api/project/get';

function Index() {
    const [projects, setProjects] = useState<IProject[]>([]);
    useEffect(()=>{
        apiProjectGet.getAllProjects().then(res => {
            setProjects(res)
        })
    },[])

    return (
        <div className={styles.libraryPage}>
            <div>
                <h1>Библиотека проектов</h1>
            </div>
            <div className={styles.libraryRow}>
                <div className={styles.libraryAside}>
                    <div className={styles.libraryAsideNew}>Новый проект</div>
                    <div className={styles.libraryAsideTitle}>
                        Создайте свой уникальный проект
                    </div>
                    <div className={styles.libraryAsideLink}>
                        <Link href="/newProject">Создать проект</Link>
                    </div>
                </div>
                <div className={styles.libraryArticle}>
                    <div className={styles.libraryProjectList}>
                        {projects.map((project,inx) => (
                            <ProjectItem project={project} key={project.id} inx={inx} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
