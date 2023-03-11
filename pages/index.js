
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import {UserContext} from '../context'
import Welcome from './welcome'


function HomePage() {

  const [user] = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (user && user.user) {
      console.log({
        action: 'redirect',
        user
      });
      router.push('/home')
    }
  }, [user])

  return <Welcome />
}

export default HomePage
