import React from 'react';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import Category from '../components/Category';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
const Home = () => {
    return (
        <>
            {/* <Announcement/> */}
            <Navbar/>
            <Slider />
            <h1 className='text-5xl text-center font-bold p-20'>Categories</h1>
            <Category/>
            <h1 className='text-5xl text-center font-bold p-20'>Recent Products</h1>
            <Products/>
            <Newsletter />
            <Footer />
        </>
    )
}

export default Home
