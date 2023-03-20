import styles from '../styles/app.module.css';
import Header from './Header';

import { api } from '@/api/api-client';
import { IUser } from '@/api/interface';
import { IUserContext, UserContext } from '@/context/user-context';
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        api.checkSession().then((res) => {
      
            setUser(res);
        });
    }, []);
    return (
        <UserContext.Provider value={[user,setUser]}>
            <>
                <div className={styles.container}>
                    <Header />
                    {children}
                </div>
            </>
        </UserContext.Provider>
    );
};

export default Layout;
