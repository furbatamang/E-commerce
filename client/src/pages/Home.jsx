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
            <Announcement/>
            <Navbar/>
            <Slider />
            <Category/>
            <Products/>
            <Newsletter />
            <Footer />
        </>
    )
}

export default Home
