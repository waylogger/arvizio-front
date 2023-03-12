import { api } from '@/api/api-client';
import { UserContext } from '@/context';
import { useContext } from 'react';
import styles from '../styles/app.module.css';

const Header = () => {
    const [user, setUser] = useContext(UserContext);

    return (
        <header className={styles.header}>
            <div className={styles.headerL}>
                <div className={styles.logo}>
                    <a href="/">
                        <img src="/logo.svg" alt="arvizio" />
                    </a>
                </div>
                <div className={styles.logo}>
                    <a href="https://moscow.refutur.com/ru/">
                        <img src="/logor.svg" alt="arvizio" />
                    </a>
                </div>
            </div>

            <div className={styles.headerR} 
            style={
                user ? {display: 'inherit'} : {display: 'none'}
            }>
                <div className={styles.inputSearhR}>
                    <input className={styles.inputSearh} />
                </div>
                <div className={styles.headerAvatar}>
                    <div className={styles.headerAvatarIcon}>
                        <img
                            className={styles.headerAvatarIcon}
                            src={user?.photo ?? '/avatar.jpg'}
                            alt="arvizio"
                        />
                    </div>
                    <div className={styles.headerAvatarEmail}>
                        <a href="#">
                            {user?.email ?? user?.name}
                        </a>
                    </div>
                </div>
                <div className={[styles.headerAvatarEmail,styles.headerLogout].join(', ')} onClick={
                    ()=>{
                        api.logout().then(res => {
                            if (!res) return 
                            setUser(null)
                        })
                    }
                }>Выход</div>
            </div>
        </header>
    );
};

export default Header;
