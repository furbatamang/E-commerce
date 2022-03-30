import React from 'react'
import { categories } from '../data';
import CategoryItem from './CategoryItem';
const Category = () => {
    return (
        <div className='flex items-center gap-x-2'>
            {
                categories.map(category => (
                    <CategoryItem title={category.title} image={category.img} key={category.id} category={category.cat}/>
                ))
            }
        </div>
    )
}

export default Category
