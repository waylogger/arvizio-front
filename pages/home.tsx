import { UserContext } from '@/context/user-context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import styles from '../styles/app.module.css';

const navigation = [
    { id: 1, title: 'Новый проект', path: '/newProject' },
    { id: 2, title: 'Библиотека', path: '/project' },
    // { id: 3, title: 'Демо', path: '/demo' },
];

function Index() {
    const router = useRouter();

    const [user] = useContext(UserContext);

    useEffect(() => {
        if (!user ) {
            router.push('/');
        }

      
    }, [user]);

    return (
        <div className={styles.homePage}>
            <div className={styles.rowPage}>
                <div className={styles.colimnLeft}>
                    <h1>
                        Создавайте собственные галереи с <span>360</span> и{' '}
                        <span>3D</span> контентом
                    </h1>
                    <p>Добавляйте аудио и видео сопровождение</p>
                </div>
                <div className={styles.colimnRight}>
                    <img src="/home.jpg" />
                </div>
            </div>
            <div className={styles.menuBottom}>
                <div className={styles.links}>
                    {navigation.map(({ id, title, path }) => (
                        <Link id={id.toString()} key={id} href={path} className={styles.linksItem}>
                            {title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Index;
