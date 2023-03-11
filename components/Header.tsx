import styles from "../styles/app.module.css";
import MyInput from "../components/UI/MyInput/MyInput";

const Header = () => (
    <header className={styles.header}>
        <div className={styles.headerL}>
            <div className={styles.logo}>
                <a href="/"><img src="/logo.svg" alt="arvizio" /></a>
            </div>
            <div className={styles.logo}>
                <a href="https://moscow.refutur.com/ru/"><img src="/logor.svg" alt="arvizio" /></a>
            </div>
        </div>

        <div className={styles.headerR}>
            <div className={styles.inputSearhR}>
                <input className={styles.inputSearh} />
            </div>
            <div className={styles.headerAvatar}>
                <div className={styles.headerAvatarIcon}>
                    <img src="/avatar.jpg" alt="arvizio" />
                </div>
                <div className={styles.headerAvatarEmail}>
                    <a href="#">q.vasilkov@arvizio.com</a>
                </div>
            </div>
        </div>
    </header>
);

export default Header;