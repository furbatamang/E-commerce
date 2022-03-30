import React, { useEffect,useState } from 'react'
import { popularProducts } from '../data';
import ProductItem from './ProductItem';
import axios from 'axios';
import {ReactComponent as LoaderIcon} from '../assets/icons/loader.svg';
const Products = ({location, filter}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredproducts] = useState([])
    // console.log(filter)
    useEffect(() => {
        setTimeout(() => {
            fetch();
        },4000)
        const fetch = async () => {
            try{
                const res =await axios.get(location ? `http://localhost:3001/api/products?category=${location}`: 'http://localhost:3001/api/products');
                setProducts(res.data);
               
            }catch(err){
                
                console.log(err)
            }
        }
        
    },[location])

    useEffect(() => {
        location && setFilteredproducts(
            products.filter((product) => 
                Object.entries(filter).every(([key, value])=> (
                    product[key].includes(value)
                ))
            )
        )
        
        
    },[filter, location, products])
    return (
        <>
        {
           products.length > 0   ?
            (
             <div className='flex flex-wrap p-5 justify-between gap-2'>
            
               { location ?
               (
                   filteredProducts.length > 0 ?
                   ( filteredProducts.map(product => (
                    <ProductItem image={product.img} title={product.title} key={product.id} id={product._id}/>))):
                    (
                        <p className='text-center text-gray-500 text-xl'>No products found</p>
                    )
                )
                
                 :
                products.slice(0,7).map(product => (
                    <ProductItem image={product.img} title={product.title} key={product._id} id={product._id}/>
                ))
            }
            </div>
            ):

            (
                <p className='text-center pb-5'>
                    <LoaderIcon />
                </p>
            )
            
        }
        </>
    )
}

export default Products
