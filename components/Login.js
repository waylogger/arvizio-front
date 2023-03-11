import MyInput from "../components/UI/MyInput/MyInput";
import MyButton from "../components/UI/MyButton/MyButton";
import styles from "@/styles/app.module.css";
import React, { useState } from 'react';
import Password from "../components/Password";
import MyModal from "@/components/UI/MyModal/MyModal";

const Login = () => {

    const [modalPassword, setModalPassword] = React.useState(false);

    const [type, setType] = useState('password');

    const togglePassInput = (e) => {
        if (type === 'password') {
            setType('text');
        } else {
            setType('password');
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
            <form className={styles.formLogin}>
                <div className={styles.formGroup}>
                    <MyInput type="text" placeholder="E-mail"/>
                </div>
                <div className={styles.formGroup}>
                    <MyInput type={type}  placeholder="Пароль"/>
                    <a onClick={togglePassInput} href="#" className={styles.passwordHide}></a>
                </div>
                <button className={styles.btnForgetPassword} onClick={() => setModalPassword(true)}>Забыли пароль?</button>
                <MyButton>Отправить</MyButton>
            </form>
            <div className={styles.formSocial}>
                <div className={styles.formSocialSpan}>Продолжить через</div>
                <div className={styles.formSocialButtons}>
                    <button className={styles.formSocialBtn}><img src="/google.svg" /></button>
                    <button className={styles.formSocialBtn}><img src="/vk.svg" /></button>
                    <button className={styles.formSocialBtn}><img src="/yandex.svg" /></button>
                </div>
            </div>

            <MyModal visible={modalPassword} setVisible={setModalPassword}>
                <Password/>
            </MyModal>
        </div>
    );
};

export default Login;