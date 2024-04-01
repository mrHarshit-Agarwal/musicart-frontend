import React from 'react'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import styles from './Checkout.module.css'
import Header from '../../components/header/Header'
import TitleBar from '../../components/title/TitleBar'
import Review from '../../components/reviewCard/Review'
import Footer from '../../components/footer/Footer'
import useWindowResize from '../../hooks/useWindowResize'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
export default function Checkout() {

    const { width } = useWindowResize();
    const { cartProducts, totalPrice } = useContext(UserContext);


    const [displayCartProducts, setCartProducts] = useState();
    const navigate = useNavigate();

    const currUser = JSON.parse(localStorage.getItem('musicartUser'));
    const token = currUser.token;
    const setDisplayCart = () => {
        const displayTemp = cartProducts.map((item) => {
            return (
                <Review
                    key={item._id}
                    data={item}
                />
            )
        })
        setCartProducts(displayTemp);
    }

    const handlePlaceOrder = async () => {

        const emptyCart = await axios.patch(`https://musicart-backend.onrender.com/user/cart/delete/${currUser._id}`, {
            productId: '0000'
        },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        navigate('/sucess')
    }
    const handleNavigate = ()=>{
        navigate('/');
    }
    useEffect(() => {
        setDisplayCart();
    }, [])


    return (
        <div className={styles.main}>
            <Header />
            {width >= 600 && <TitleBar />}
            <section className={styles.box1} onClick={handleNavigate}>
                {width >= 600 ? 'Back to Products' :
                    <img className={styles.back} src="../../images/leftArrow.png" alt="image-2" />
                }
            </section>
            <section className={styles.box2}>
                <span className={`${styles.text} ${styles.text1}`}><u>Checkout</u></span>
            </section>
            <section className={styles.box3}>
                <div className={styles.box31}>
                    <div className={styles.box311}>
                        <div className={styles.box3111}>
                            <span className={styles.text2}>1. Delivery Address</span>
                        </div>
                        <div className={styles.box3112}>
                            <span className={styles.text3}>{currUser.name}</span>
                            <span className={styles.text3}>104</span>
                            <span className={styles.text3}>kk hh Nagar, Lucknow</span>
                            <span className={styles.text3}>Uttar Pradesh 226025</span>
                        </div>
                    </div>
                    <div className={styles.box312}>
                        <div className={styles.box3121}>
                            <span className={styles.text2}>2. Payment method </span>
                        </div>
                        <div className={styles.box3122}>
                            <span className={styles.text3}>Pay on delivery ( Cash/Card)</span>
                        </div>
                    </div>
                    <div className={styles.box313}>
                        <div className={styles.box3131}>
                            <span className={styles.text2}>3. Review items and delivery</span>
                        </div>
                        <div className={styles.box3132}>
                            <div className={styles.box31321}>
                                {displayCartProducts}
                            </div>
                            <span className={styles.text4}>Estimated delivery : </span>
                            <span className={styles.text4}>Monday — FREE Standard Delivery</span>
                        </div>
                    </div>
                </div>
                <div className={styles.box32}>
                    <div className={styles.box321}>
                        <span className={`${styles.box3211} ${styles.same}`} onClick={handlePlaceOrder}>Place Your order</span>
                        <span className={`${styles.box3212} ${styles.same}`}>By placing your order, you agree to Musicart privacy notice and conditions of use.</span>
                        <span className={`${styles.box3213} ${styles.same}`}></span>
                        <span className={`${styles.box3214} ${styles.same}`}>Order Summary</span>
                        <span className={`${styles.box3215} ${styles.same}`}><span className={`${styles.text7} ${styles.box3216}`}>Items : </span> <span className={styles.text7} >₹{totalPrice}</span></span>
                        <span className={`${styles.box3215} ${styles.same}`}><span className={`${styles.text7} ${styles.box3216}`}>Delivery : </span> <span className={styles.text7}>₹{totalPrice == 0? 0: 45}</span></span>
                        <span className={`${styles.box3213} ${styles.same}`}></span>
                        <span className={`${styles.box3215} ${styles.same}`}><span className={`${styles.text8} ${styles.box3216}`}>Order Total : </span><span className={styles.text8} >₹{totalPrice == 0? 0: totalPrice + 45}</span></span>
                    </div>
                </div>
            </section>
            <section className={styles.box4}>
                <div className={styles.box41}>
                    <span className={styles.box411} onClick={handlePlaceOrder}>Place your order</span>
                </div>
                <div className={styles.box42}>
                    <span className={styles.text5}> Order Total : ₹{totalPrice == 0? 0 : totalPrice + 45}</span>
                    <span className={styles.text6}> By placing your order, you agree to Musicart privacy notice and conditions of use.</span>
                </div>
            </section>
            <Footer />
        </div>
    )
}
