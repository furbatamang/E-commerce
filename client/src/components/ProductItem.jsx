import React from 'react'
import {ReactComponent as CartIcon} from '../assets/icons/cart.svg';
import {ReactComponent as SearchIcon} from '../assets/icons/search.svg';
import {ReactComponent as LoveIcon} from '../assets/icons/love.svg';
import { Link } from 'react-router-dom';
const ProductItem = ({image, title, id}) => {
    return (
        <div className='flex-1 flex items-center justify-center relative min-w-productWidth h-productHeight bg-cyan-500 bg-opacity-10'>
            <div></div>
            <img src={image} alt="" className='h-5/6 z-2'/>
            <div className='w-full h-full absolute top-0 left-0 z-3 flex items-center justify-center cursor-pointer gap-x-2 hover:bg-black hover:bg-opacity-20 opacity-0 hover:opacity-100 transition-all duration-300'>
                <div className='h-10 w-10 rounded-full bg-white flex items-center justify-center hover:scale-125 transition-all duration-300'>
                    <CartIcon/>
                </div>
                <div className='h-10 w-10 rounded-full bg-white flex items-center justify-center hover:scale-125 transition-all duration-300'>
                    <Link to={`/product/${id}`}>
                        <SearchIcon/>
                    </Link>
                </div>
                <div className='h-10 w-10 rounded-full bg-white flex items-center justify-center hover:scale-125 transition-all duration-300'>
                    <LoveIcon/>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
