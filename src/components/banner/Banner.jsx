import React from 'react'
import styles from './Banner.module.css';
export default function Banner() {
    
    return (
        <div className={styles.main}>
            <div className={styles.left}>
                <div className={styles.top} >
                <span className={styles.text1}>Grab upto 50% off on
                    Selected headphones
                    </span>
                </div>

                <div className={styles.bottom} >
                <span className={styles.btn11}>Buy Now</span>
                </div>
            </div>
            <div className={styles.right}>
                <img src="../../images/bannerImage.png" alt="girl" className={styles.girl} />
            </div>

        </div>

    )
}
