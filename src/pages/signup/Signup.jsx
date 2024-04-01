import React, { useState } from 'react'
import axios from 'axios';
import styles from './Signup.module.css'
import { useNavigate } from 'react-router-dom';
export default function Signup() {

    const [userDetails, setUserDetails] = useState({
        fname: '',
        email: '',
        mobile: null,
        password: ''
    })
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    //-----------------------------Helper functions---------------

    const clientValidation = () => {
        const { fname, email, mobile, password } = userDetails;
        const error = {};

        if (!fname) {
            error.fname = 'Name is required';
        }

        if (!email) {
            error.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email = 'Email is invalid';
        }

        if (!mobile) {
            error.mobile = 'Mobile number is required';
        } else if (!/^[0-9]{10}$/.test(mobile)) {
            error.mobile = 'Mobile number is invalid';
        }

        if (!password) {
            error.password = 'Password is required';
        }
        setErrors(error);
        if (Object.keys(error).length == 0)
            return true;
        return false;
    }

    const registerUser = async () => {
        try {
            const { email, mobile, password } = userDetails;
            const res = await axios.post('https://musicart-backend.onrender.com/user/register', {

                name: userDetails.fname,
                mobile,
                email,
                password,
                cartItems: [],
                address: {
                    house_number: 104,
                    city: "kk, hh Nagar, Lucknow",
                    state: "Uttar Pradesh",
                    pinCode: 226025
                }
            })
            return true;
        }
        catch (err) {
            return false;
        }
    }

    //--------------------------------------------------------------
    const handleChange = (e) => {
        setUserDetails((prevDetails) => {
            return {
                ...prevDetails,
                [e.target.name]: e.target.value
            }
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const clientOk = clientValidation();
        if (clientOk) {
            const registerSucess = await registerUser();
            if (registerSucess)
                navigate('/login');
        }
    }
    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <img src="../../images/logo.png" alt="image-1" className={styles.logo} />
                <span className={styles.headerText}>Musicart</span>
            </div>
            <form className={styles.box1}>
                <span className={`${styles.text} ${styles.text1}`}>
                    Create Account
                </span>
                <span className={`${styles.text} ${styles.text2}`}>
                    Your name
                </span>
                <input className={`${styles.input} ${styles.input2}`} type="text" name='fname' onChange={handleChange} />
                {errors.fname && <span className={`${styles.error}`}>{errors.fname}</span>}

                <span className={`${styles.text} ${styles.text3}`}>Mobile Number</span>
                <input className={`${styles.input} ${styles.input3}`} type="number" name='mobile' onChange={handleChange} />
                {errors.mobile && <span className={`${styles.error}`}>{errors.mobile}</span>}
                <span className={`${styles.text} ${styles.text4}`}>Email Id</span>
                <input className={`${styles.input} ${styles.input4}`} type="email" name='email' onChange={handleChange} />
                {errors.email && <span className={`${styles.error}`}>{errors.email}</span>}
                <span className={`${styles.text} ${styles.text6}`}>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.
                </span>

                <span className={`${styles.text} ${styles.text5}`}>Password</span>
                <input className={`${styles.input} ${styles.input5}`} type="password" name='password' onChange={handleChange} />
                {errors.password && <span className={`${styles.error}`}>{errors.password}</span>}

                <div className={styles.button} onClick={handleSubmit}>Continue</div>
                <span className={`${styles.text} ${styles.text7}`}>By continuing, you agree to Musicart privacy notice and conditions of use.</span>
            </form>


            <div className={styles.box3}>
                Already have an account ? <u onClick={handleLogin}>Sign in</u>
            </div>


            <footer className={styles.footer}>
                <span >Musicart | All rights reserved</span>
            </footer>
        </div>
    )
}
