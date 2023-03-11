import Login from "@/components/Login";
import Registration from "@/components/Registration";
import MyModal from "@/components/UI/MyModal/MyModal";
import { UserContext } from '@/context';
import styles from "@/styles/app.module.css";
import { useRouter } from 'next/router';
import React, { useContext, useDebugValue, useEffect } from 'react';

function Index() {

    const [modalAuth, setModalAuth] = React.useState(false);
    const [modalRegistration, setModalRegistration] = React.useState(false);
    const [user] = useContext(UserContext)
    const router = useRouter()

    useEffect(()=>{

       
        if (!user || !user.email){
            return
        }

        router.push('/home')
    },[user])


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
                <Login setModal={setModalAuth}/>
            </MyModal>
            <MyModal visible={modalRegistration} setVisible={setModalRegistration}>
                <Registration setModal={setModalRegistration} />
            </MyModal>
    
        </div>
        );
}
export default Index;
