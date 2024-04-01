import React, { useContext, useEffect, useState } from 'react'
import styles from './Header.module.css'
import useWindowResize from '../../hooks/useWindowResize';
import Searchbar from '../searchbox/Searchbar';
import { UserContext } from '../../App';
import { useNavigate } from "react-router-dom"
export default function Header() {

  const [mobileView, setMobileView] = useState();
  const { width } = useWindowResize();
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (width >= 600)
      setMobileView(false);
    else
      setMobileView(true);


  }, [width])


  function handleClick(page) {
    if (page == 'login') {
      navigate('/login');
    }
    else if (page == 'logout') {
      setUserLoggedIn(false);
      localStorage.removeItem('musicartUser')
      navigate('/');
    }
    else {
      navigate('/signup');
    }
  }

  return (
    <>
      {!mobileView && <div className={styles.main}>
        <div className={styles.left}>
          <img src="../../images/phone.png" alt="icon" className={styles.icon1} />
          <span >912121131313</span>
        </div>
        <div className={styles.mid}>
          <span >Get 50% off on selected items</span>
          <span className={styles.bar}>|</span>
          <span >Shop Now</span>
        </div>
        <div className={styles.right}>
          {userLoggedIn == false ?
            <>
              <span onClick={() => handleClick('login')} className={styles.route} >Login</span>
              <span className={styles.bar}>|</span>
              <span onClick={() => handleClick('signup')} className={styles.route}>Signup</span>
            </> :
            <>
              <span onClick={() => handleClick('logout')} className={styles.route} >Logout</span>

            </>
          }
        </div>
      </div>}
      {
        mobileView &&
        <div className={styles.mbox1}>
          <Searchbar />
        </div>
      }
    </>

  )
}
