import styles from "../styles/app.module.css";
import MyModal from "../components/UI/MyModal/MyModal";
import React, { useState } from 'react';
import Login from "../components/Login";
import Registration from "../components/Registration";

function Index() {

    const [modalAuth, setModalAuth] = React.useState(false);
    const [modalRegistration, setModalRegistration] = React.useState(false);

    return (
    <div className={styles.homePage}>
        <div className={styles.homeBlock}>
            <h1>Добро пожаловать</h1>
            <div className={styles.btns}>
                <button type="button" className={styles.bntAuth} onClick={() => setModalAuth(true)}>
                    Вход
                </button>
                <button type="button" className={styles.bntReg} onClick={() => setModalRegistration(true)}>
                    Регистрация
                </button>
            </div>
        </div>
        <MyModal visible={modalAuth} setVisible={setModalAuth}>
            <Login/>
        </MyModal>
        <MyModal visible={modalRegistration} setVisible={setModalRegistration}>
            <Registration/>
        </MyModal>

    </div>
    );
}

export default Index;
