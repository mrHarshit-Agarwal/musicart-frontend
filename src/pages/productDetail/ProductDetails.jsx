import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

import styles from './ProductDetails.module.css'
import Header from '../../components/header/Header'
import TitleBar from '../../components/title/TitleBar'
import Footer from '../../components/footer/Footer'
import useWindowResize from '../../hooks/useWindowResize'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App';
export default function ProductDetails(props) {

    const { width } = useWindowResize();
    const [dp, setDp] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const { userLoggedIn } = useContext(UserContext);

    let item = location.state.props.product;

    useEffect(() => {
        setDp(item.img_url[0]);
    }, [])

    const handleAddToCart = async () => {
        try {
            const currUser = JSON.parse(localStorage.getItem('musicartUser'));
            const token = currUser.token;
            const res = await axios.patch(`https://musicart-backend.onrender.com/user/cart/add/${currUser._id}`,
                {
                    body: { productId: item._id }
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )

            toast.success('Item added to cart!', { autoClose: 2000 })
        }
        catch (err) {
            toast.error('Could not add to cart, try after signing in again!', { autoClose: 2000 })
        }

    }

    const handleNavigate = (foo) => {

        if (userLoggedIn) {
            handleAddToCart();
            if (foo == 'checkOut')
                navigate('/cart');
        }
        else {
            toast.error('Sign in to buy products');
        }
    }
    const handleBackToProducts = () => {
        navigate('/');
    }
    return (
        <div className={styles.main}>
            <Header />
            {width >= 600 && <TitleBar />}
            <section className={`${styles.button} ${styles.button1}`} onClick={handleBackToProducts}>
                {width >= 600 ? `Back to Products` :
                    <img className={styles.back} src="../../images/leftArrow.png" alt="image-2" />
                }
            </section>
            <section className={styles.box1}>
                {item.description}
            </section>
            <section className={styles.box2}>
                <div className={styles.box21}>
                    <div className={styles.box211}>
                        <img src={dp} alt="image-1" className={`${styles.image} ${styles.image1}`} />
                    </div>
                    <div className={styles.box212}>
                        <img src={item.img_url[1]} alt="image-2" className={`${styles.image} ${styles.image2}`} onClick={() => setDp(item.img_url[1])} />
                        <img src={item.img_url[2]} alt="image-3" className={`${styles.image} ${styles.image2}`} onClick={() => setDp(item.img_url[2])} />
                        <img src={item.img_url[3]} alt="image-4" className={`${styles.image} ${styles.image2}`} onClick={() => setDp(item.img_url[3])} />
                        <img src={item.img_url[0]} alt="image-5" className={`${styles.image} ${styles.image2}`} onClick={() => setDp(item.img_url[0])} />
                    </div>
                </div>
                <div className={styles.box22}>
                    <span className={`${styles.text} ${styles.text1}`}>{item.name}</span>
                    <span className={`${styles.text} ${styles.text2}`}>⭐⭐⭐⭐⭐ (50 ratings)</span>
                    <span className={`${styles.text} ${styles.text3}`}>Price - ₹ {item.price}</span>
                    <span className={`${styles.text} `}>{item.color} | {item.type} headphone</span>
                    <span className={`${styles.text} `}>About this item</span>
                    <ul>
                        <li>{item.details[0]}</li>
                        <li> {item.details[1]}</li>
                        <li>{item.details[2]}</li>
                        <li>{item.details[3]}</li>
                        <li>{item.details[4]}</li>
                        <li> High sound quality and well-balanced sound tuning
                        </li>
                    </ul>
                    <span className={`${styles.text} `}><b>Available</b> - In stock</span>
                    <span className={`${styles.text} `}><b>Brand</b> - {item.company}</span>
                    <span className={`${styles.button} ${styles.button2}`} onClick={() => handleNavigate('addCart')}>Add to Cart</span>
                    <span className={`${styles.button} ${styles.button3}`} onClick={() => handleNavigate('checkOut')}>Buy Now</span>

                </div>
            </section>
            <Footer />
        </div>
    )
}
