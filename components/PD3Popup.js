import MyInput from "../components/UI/MyInput/MyInput";
import MyButton from "../components/UI/MyButton/MyButton";
import styles from "@/styles/app.module.css";

const PD3Popup = () => {


    return (
        <div>
            <div className={styles.formProjectTitle}>Псевдо 3D</div>
            <div className={styles.formProjectDescr}>Создание проекта</div>
            <form className={styles.formLogin}>
                <MyInput type="text" placeholder="Имя проекта"/>
                <MyInput type="password" placeholder="Адрес вашего сайта (опционально)"/>
                <div className={styles.customFileUpload}>
                    <button>Материалы (опционально)
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196 15.021 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.021 15.8043 14.55 16 14 16H2ZM7 12V3.85L4.4 6.45L3 5L8 0L13 5L11.6 6.45L9 3.85V12H7Z" fill="#C7C7C7"/>
                        </svg>
                    </button>
                </div>
                <MyButton>Создать проект </MyButton>
            </form>
        </div>
    );
};

export default PD3Popup;