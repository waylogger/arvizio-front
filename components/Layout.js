import Header from './Header';
import styles from "../styles/app.module.css";

const Layout = ({ children }) => (
    <>
        <div className={styles.container}>
            <Header />
            {children}
        </div>
    </>
);

export default Layout;