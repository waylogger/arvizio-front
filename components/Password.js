import MyInput from "../components/UI/MyInput/MyInput";
import MyButton from "../components/UI/MyButton/MyButton";
import styles from "@/styles/app.module.css";

const Password = () => {

    return (
        <div>
            <div className={styles.modalTop}>
                <div className={styles.logo}>
                    <img src="/logo.svg" alt="arvizio" />
                </div>
                <div className={styles.logo}>
                    <img src="/logor.svg" alt="arvizio" />
                </div>
            </div>
            <h1>Восстановление пароля</h1>
            <form className={styles.formLogin}>
                <MyInput type="text" placeholder="E-mail"/>
                <MyButton>Отправить новый пароль</MyButton>
            </form>
        </div>
    );
};

export default Password;