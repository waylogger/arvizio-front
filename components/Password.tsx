import MyInput from "./UI/MyInput/MyInput";
import MyButton from "./UI/MyButton/MyButton";
import styles from "@/styles/app.module.css";
import { useEffect, useState } from 'react';
import { api } from '@/api/api-client';
import { useRouter } from 'next/router';

const Password = (props: {
    closeModals:() => void
}) => {

    const [email,setEmail] = useState<string>('password')
    const [newPassStatus,setNewPassStatus] = useState<'failed' | 'success'>(null)

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
                <MyInput type="text" placeholder="E-mail" onInput={(event)=>{
                    setEmail(event.target.value)
                }}/>
                <MyButton onClick={
                    (event) => {
                        event.preventDefault()
                        api.sendNewPassword({
                            email
                        })
                        props.closeModals()

                    }
                }>Отправить новый пароль</MyButton>
                <div 
                    className={styles.wrongCredentis}
                    style={
                        newPassStatus === 'failed'
                            ? { display: 'block' }
                            : { display: 'none' }
                    }
                >
                    Отправка пароля не удалась, повторите попытку
                </div>
            </form>
        </div>
    );
};

export default Password;
