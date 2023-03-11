import MyInput from "./UI/MyInput/MyInput";
import MyButton from "./UI/MyButton/MyButton";
import styles from "@/styles/app.module.css";
import React, {useState} from "react";
import { api } from '@/api/api-client';



const Registration = (props: { setModal: (status: boolean) => void})  => {

    const [type, setType] = useState<'password' | 'text'>('password');
    const [typeTwo, setTypeTwo] = useState<'password' | 'text'>('password');
    const [errorMessage,setErrorMessage] = useState<string>('')

    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string> ('')
    const [confirmPassword,setConfirmPassword] = useState<string>('')


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
                    <MyInput type="text" placeholder="E-mail" onInput={(event)=>{
                        setEmail(event.target.value)
                    }}/>
                </div>
                <div className={styles.formGroup}>
                    <MyInput type={type}  placeholder="Пароль" onInput={(event)=>{
                        setPassword(event.target.value)
                    }}/>
                    <a onClick={togglePassInput} href="#" className={styles.passwordHide}></a>
                </div>
                <div className={styles.formGroup}>
                    <MyInput type={typeTwo}  placeholder="Повторите пароль" onInput={(event) => {
                        setConfirmPassword(event.target.value)
                    }}/>
                    <a onClick={togglePassInputTwo} href="#" className={styles.passwordHide}></a>
                </div>
                <MyButton onClick={(
                    event
                )=>{
                    event.preventDefault()
                    if (!email){
                        setErrorMessage('Не введен emai')
                        return
                    }
                    if (!password){
                        setErrorMessage('Не введен пароль')
                        return
                    }

                    if (password !== confirmPassword) {
                        setErrorMessage('Пароли не совпадают')
                        return 
                    }

                    api.signUp({
                        email,password
                    }).then(res => {
                        console.log({
                            res
                        });
                        
                        if (!res) {
                            setErrorMessage('Ошибка создания пользователя')
                            return
                        }


                        setErrorMessage('')
                        props.setModal(false)


                    })


                }}>Отправить</MyButton>
                <div
                    className={styles.wrongCredentis}
                    style={
                        errorMessage.length 
                            ? { display: 'block' }
                            : { display: 'none' }
                    }
                >
                   {errorMessage} 
                </div>
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
