import { api } from '@/api/api-client';
import { config } from '@/api/cfg';
import { ApiMethodsEnum } from '@/api/interface';
import MyModal from '@/components/UI/MyModal/MyModal';
import { UserContext } from '@/context/user-context';
import styles from '@/styles/app.module.css';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import Password from './Password';
import MyButton from './UI/MyButton/MyButton';
import MyInput from './UI/MyInput/MyInput';

const Login = (props: { setModal: (status: boolean) => void }) => {
    const [modalPassword, setModalPassword] = React.useState(false);

    const [user, setUser] = useContext(UserContext);

    const [passwordType, setType] = useState<'text' | 'password'>('password');

    const [email, setEmail] = React.useState<string>(null);

    const [password, setPassword] = React.useState<string>(null);

    const [loginStatus, setLoginError] = React.useState<'success' | 'falied'>(
        null
    );

    const togglePassInput = (e) => {
        if (passwordType === 'password') {
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
                    <MyInput
                        type="text"
                        placeholder="E-mail"
                        onInput={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <MyInput
                        type={passwordType}
                        placeholder="Пароль"
                        onInput={(event) => setPassword(event.target.value)}
                    />
                    <a
                        onClick={togglePassInput}
                        href="#"
                        className={styles.passwordHide}
                    ></a>
                </div>
                <button
                    className={styles.btnForgetPassword}
                    onClick={(event) => {
                        event.preventDefault();
                        setModalPassword(true);
                    }}
                >
                    Забыли пароль?
                </button>
                <MyButton
                    onClick={(event) => {
                        event.preventDefault();
                        api.login({
                            email,
                            password,
                        }).then((res) => {
                            if (!res) {
                                setLoginError('falied');
                                return;
                            }

                            setUser(res);
                            setLoginError('success');
                            props.setModal(false);
                        });
                    }}
                >
                    Отправить
                </MyButton>
                <div
                    className={styles.wrongCredentis}
                    style={
                        loginStatus === 'falied'
                            ? { display: 'block' }
                            : { display: 'none' }
                    }
                >
                    Логин или пароль введены неправильно, или аккаунт
                    неподтверджен
                </div>
            </form>
            <div className={styles.formSocial}>
                <div className={styles.formSocialSpan}>Продолжить через</div>
                <div className={styles.formSocialButtons}>
                    <Link
                        href={[
                            config.url.backend,
                            ApiMethodsEnum.googlePath,
                        ].join('/')}
                    >
                        <button className={styles.formSocialBtn}>
                            <img src="/google.svg" />
                        </button>
                    </Link>
                    <Link
                        href={[
                            config.url.backend,
                            ApiMethodsEnum.vkPath,
                        ].join('/')}
                    >
                        <button className={styles.formSocialBtn}>
                            <img src="/vk.svg" />
                        </button>
                    </Link>
                    <Link
                        href={[
                            config.url.backend,
                            ApiMethodsEnum.yaPath,
                        ].join('/')}
                    >
                        <button className={styles.formSocialBtn}>
                            <img src="/yandex.svg" />
                        </button>
                    </Link>
                </div>
            </div>

            <MyModal visible={modalPassword} setVisible={setModalPassword}>
                <Password
                    closeModals={() => {
                        setModalPassword(false);
                        props.setModal(false);
                    }}
                />
            </MyModal>
        </div>
    );
};

export default Login;
