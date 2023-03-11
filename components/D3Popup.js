import MyInput from "../components/UI/MyInput/MyInput";
import MyButton from "../components/UI/MyButton/MyButton";
import styles from "@/styles/app.module.css";

const D3Popup = () => {

    return (
        <div>
            <div className={styles.formProjectTitle}>3D</div>
            <div className={styles.formProjectDescr}>Создание проекта</div>
            <form className={styles.formProject}>
                <MyInput type="text" placeholder="Имя проекта"/>
                <MyInput type="password" placeholder="Адрес вашего сайта (опционально)"/>
                <MyButton>Создать проект</MyButton>
            </form>
        </div>
    );
};

export default D3Popup;