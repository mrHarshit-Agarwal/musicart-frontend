import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Searchbar.module.css'

import GetAllProducts from '../../api/GetAllProducts';
import GetProductsByQuery from '../../api/GetProductsByQuery';
import { toast } from 'react-toastify';


export default function Searchbar() {

  const [showSuggestions, setShowSuggestions] = useState();
  const [productNames, setProductNames] = useState([]);
  const [suggestedNames, setSuggestedNames] = useState();
  const [searchboxValue, setSearchboxValue] = useState('');

  const navigate = useNavigate();


  const getProductNames = async()=>{
    try{
      const allProducts = await GetAllProducts();
      const allNames = [];
      allProducts.forEach((index)=>{
        allNames.push(index.name)
      })
      setProductNames(allNames);
    }
    catch(err){
      // console.log('error in getting names', err)
    }
  }

  const handleProductSearch = async(name)=>{
    setSearchboxValue(name)
    setShowSuggestions(false)
    const searchedProduct = await GetProductsByQuery('name', name);
    if(searchedProduct == -1){
      //failed to get products
      toast.error('Could not get product, server busy');
    }
    else{
      const product = searchedProduct[0];
      navigate('/productDetails',{
        state : {
          props: {product}
        }
      })
    }
    
  }

  const handleSearch = (e)=>{
    const suggestedName = [];
    const searchName = e.target.value.trim();
    setSearchboxValue(searchName)

    productNames.forEach((name)=>{

      if(name.toLowerCase().includes(searchName.toLowerCase())){
        suggestedName.push(
          <span className={styles.text1}
            onClick={()=>handleProductSearch(name)}
          >{name}</span>
        );
      }
    })
    setSuggestedNames(suggestedName);
    searchName.length > 0 ? setShowSuggestions(true): setShowSuggestions(false);

  }


  useEffect(()=>{
    setShowSuggestions(false);
    getProductNames();
  }, [])


  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <div className={styles.box1}>
          <img src="../../images/searchIcon.png" alt="search" className={styles.icon} />
        </div>
        <div className={styles.box2}>
          <textarea className={styles.input1}
            placeholder='Search by Product Name'
            spellCheck='false'
            onChange={handleSearch}
            value={searchboxValue}
          ></textarea>
        </div>
      </div>
      {showSuggestions && <div className={styles.bottom}>
        {suggestedNames}

      </div>}

    </div>
  )
}
