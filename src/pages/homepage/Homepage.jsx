import React from 'react'
import styles from './Homepage.module.css'

import useWindowResize from '../../hooks/useWindowResize.js';

import TitleBar from '../../components/title/TitleBar'
import Header from '../../components/header/Header'
import Banner from '../../components/banner/Banner'
import Searchbar from '../../components/searchbox/Searchbar'
import Filters from '../../components/filters/Filters'
import Products from '../../components/products/Products'
import Footer from '../../components/footer/Footer';
export default function Homepage() {


  const { width } = useWindowResize();

  return (
    <div className={styles.main}>
      <Header />
      {width >= 600 && <TitleBar />}
      <Banner />
      {width >= 600 && <Searchbar />}
      <Filters />
      <section className={styles.section5}>
        <Products />
      </section>
      <Footer />
    </div>
  )
}
