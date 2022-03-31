import React, { useState } from 'react';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
const ProductList = () => {
    const location = useLocation().pathname.split('/')[2];
    const [filter, setFilter] = useState({
        color:'',
        size:''
    })
    
    const changeHandler = (e) => {
        const {name, value} = e.target;
        setFilter({
            ...filter,
            [name]:value.toLowerCase()
        })
    }

    return (
        <div>
            
            <Navbar/>
            <h1 className='p-5 text-2xl font-[900]'>Dresses</h1>
            <div className='flex justify-between p-5'>
                <div className='flex items-center gap-x-4'>
                    <h1 className='text-xl font-bold'>Filter Product:</h1>
                    <select name="color" id="" className='border-2 border-black p-2' onChange={changeHandler} value={filter.color}>
                        <option disabled >Color</option>
                        <option>White</option>
                        <option>Black</option>
                        <option>Red</option>
                        <option>Blue</option>
                        <option>Yellow</option>
                        <option>Pink</option>
                    </select>
                    <select name="size" id="" className='border-2 border-black p-2' onChange={changeHandler} value={filter.size}>
                        <option disabled >Size</option>
                        <option>XS</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                        <option>XXL</option>
                    </select>
                </div>
                <div>
                    <div className='flex gap-x-4 items-center'>
                        {/* <h1 className='text-xl font-bold'>Sort Product</h1>
                        <select name="sort" id="" className='border-2 border-black p-2' onChange={changeHandler}>
                            <option value="newest" selected>Newest</option>
                            <option value="asc">Price (asc)</option>
                            <option value="desc">Price (desc)</option>
                        </select> */}
                    </div>
                </div>
            </div>
            <Products location={location} filter={filter}/>
            <Newsletter/>
            <Footer></Footer>
        </div>
    )
}

export default ProductList
