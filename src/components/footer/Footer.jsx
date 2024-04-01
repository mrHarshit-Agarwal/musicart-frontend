import React, { useContext } from 'react'
import styles from './Footer.module.css'
import useWindowResize from '../../hooks/useWindowResize'
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Footer() {

  const { width } = useWindowResize();
  const {userLoggedIn} = useContext(UserContext);
  const navigate = useNavigate();

  const handleHome = ()=>{
    navigate('/');
  }

  const handleCart = ()=>{
    if(userLoggedIn){
      navigate('/cart');
    }
    else{
      toast.error('Sign in to visit cart');
    }
  }

  const handleLogin = ()=>{
    navigate('/login')
  }

  return (
    <>
      {width >= 600 ?
        <>
          <footer className={styles.footer}>
            <span >Musicart | All rights reserved</span>
          </footer>
        </> :
        <>
          <footer className={styles.mfooter}>
            <div className={styles.box} onClick={handleHome}>
              <img src="../../images/home.png" className={styles.image1}/>
              <span  className={styles.text1}>Home</span>
            </div>
            <div className={styles.box} onClick={handleCart}>
            <img src="../../images/cart.png" className={styles.image1}/>
              <span  className={styles.text1}>Cart</span>
            </div>
            <div className={styles.box} onClick={handleLogin}>
            <img src="../../images/logout.png" className={styles.image1}/>
              <span  className={styles.text1}>{userLoggedIn ? 'Logout': 'Login'}</span>
            </div>
          </footer>
        </>}
    </>
  )
}
