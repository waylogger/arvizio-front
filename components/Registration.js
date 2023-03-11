import MyInput from "../components/UI/MyInput/MyInput";
import MyButton from "../components/UI/MyButton/MyButton";
import styles from "@/styles/app.module.css";
import React, {useState} from "react";

const Registration = () => {

    const [type, setType] = useState('password');
    const [typeTwo, setTypeTwo] = useState('password');

    const togglePassInput = (e) => {
        if (type === 'password') {
            setType('text');
        } else {
            setType('password');
        }
    };
    const togglePassInputTwo = (e) => {
        if (typeTwo === 'password') {
            setTypeTwo('text');
        } else {
            setTypeTwo('password');
        }
    };

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
            <h1>Вход</h1>
            <form className={styles.formRegistration}>
                <div className={styles.formGroup}>
                    <MyInput type="text" placeholder="E-mail"/>
                </div>
                <div className={styles.formGroup}>
                    <MyInput type={type}  placeholder="Пароль"/>
                    <a onClick={togglePassInput} href="#" className={styles.passwordHide}></a>
                </div>
                <div className={styles.formGroup}>
                    <MyInput type={typeTwo}  placeholder="Повторите пароль"/>
                    <a onClick={togglePassInputTwo} href="#" className={styles.passwordHide}></a>
                </div>
                <MyButton>Отправить</MyButton>
            </form>
            <div className={styles.formSocial}>
                <div className={styles.formSocialSpan}>Регистрация через</div>
                <div className={styles.formSocialButtons}>
                    <button className={styles.formSocialBtn}><img src="/google.svg" /></button>
                    <button className={styles.formSocialBtn}><img src="/vk.svg" /></button>
                    <button className={styles.formSocialBtn}><img src="/yandex.svg" /></button>
                </div>
            </div>
        </div>
    );
};

export default Registration;