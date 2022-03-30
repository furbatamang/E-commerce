import React from 'react'
import { Link } from 'react-router-dom'
const CategoryItem = ({title, image, category}) => {
    return (
        <div className='flex-1'>
            <Link to={`/products/${category}`}>
                <div className='relative'>
                    <div className='h-screen'>
                        <img src={image} alt="" className='h-5/6 w-full'/>
                    </div>
                    <div className='absolute top-1/3 gap-y-4  w-full text-white flex flex-col items-center'>
                        <h3 className='text-3xl font-bold'>{title}</h3>
                        <button className='p-2 text-gray-800 bg-white border-2 border-white hover:scale-125 transition-all duration-500'>SHOP NOW</button>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CategoryItem
