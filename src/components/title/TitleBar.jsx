import React, { useContext } from 'react'
import styles from './TitleBar.module.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App';
export default function TitleBar() {
  const navigate = useNavigate();

  const { userLoggedIn } = useContext(UserContext);
  const handleGoToCart = () => {
    navigate('/cart');
  }

  return (
    <div className={styles.main}>
      <img className={styles.logo} src="../../images/logo.png" alt="logo-img" />
      <span className={styles.name}>Musicart</span>
      {/* <span className={styles.breadcrum}>Breadcrum/BreadCrum</span> */}
      {
        userLoggedIn &&
        <>
          <div className={styles.button1} onClick={handleGoToCart}>
            <img className={styles.img1} src="../../images/cartIcon.png" alt="cart" />
            <span>View Cart</span>
          </div>
        </>
      }
    </div>
  )
}
