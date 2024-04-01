import React, { useState } from 'react';
import styles from './CartItem.module.css';
export default function CartItem(props) {

  const { productDetail, productCnt, handleQuantity } = props;
  const [itemCount, setItemCount] = useState(productCnt);

  const handleQuantityChange = (e) => {
    handleQuantity(productDetail._id, e.target.value);
    setItemCount(e.target.value);
  }


  return (
    <div className={styles.main}>
      <div className={styles.box1}>
        <img src={productDetail.img_url[0]} alt="img-1" className={styles.image1} />
      </div>
      <div className={styles.box2}>
        <span className={`${styles.text} ${styles.text1}`}>{productDetail.name}</span>
        <span className={`${styles.text} ${styles.text2}`}>Colour - {productDetail.color}</span>
        <span className={`${styles.text} ${styles.text2}`}>{productDetail.inStock == true ? 'In-stock' : 'Out of Stock'}</span>
      </div>
      <div className={styles.box3}>
        <span className={`${styles.text} ${styles.text1}`}>Price</span>
        <span className={`${styles.text}`}>₹{productDetail.price}</span>
      </div>
      <div className={styles.box4}>
        <span className={`${styles.text} ${styles.text1}`}>Quantity</span>
        <select className={styles.options} value={itemCount} onChange={handleQuantityChange} name='Quantity'>
          <option value="0" >0</option>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
          <option value="6" >6</option>
          <option value="7" >7</option>
          <option value="8" >8</option>
          <option value="9" >9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className={styles.box5}>
        <span className={`${styles.text} ${styles.text1}`}>Total</span>
        <span className={`${styles.text} `}>₹{productDetail.price * itemCount}</span>
      </div>

    </div>
  )
}
