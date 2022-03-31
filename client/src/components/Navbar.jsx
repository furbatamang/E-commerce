import React, { useEffect } from 'react'
import {ReactComponent as SearchIcon} from '../assets/icons/search.svg';
import {ReactComponent as CartIcon} from '../assets/icons/cart.svg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductFailure,getProductStart, getProductSuccess } from '../redux/cart';
import axios from 'axios';
const Navbar = () => {
    const dispatch = useDispatch()
    const {quantity} = useSelector(state => state.cart);
    const {currentUser} = useSelector(state => state.user);
    const {fetchedProducts} = useSelector(state => state.cart)
    const fetchCart = async () => {
       dispatch(getProductStart());
       try{
           const res = await axios.get('http://localhost:3001/api/carts',{
               headers:{
                   token:JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user).currentUser?.token
               }
           })
           dispatch(getProductSuccess(
               {product:res.data,
               quantity:res.quantity}))
           console.log(res)
       }catch(err){
           console.log(err);
           dispatch(getProductFailure())
       }
    }
    useEffect(() => {
        fetchCart()
    },[])
    // console.log(products)
    return (
        <>
        <div className='flex justify-between p-3'>
                <div className='flex-1 flex items-center gap-x-4'>
                    <span className='cursor-pointer'>En</span>
                    <div className='flex items-center'>
                        <input type="text" className='border-2 pl-9 py-1 rounded-full border-gray-700'/>
                        <SearchIcon className='absolute pl-2'/>
                    </div>
                </div>
                <div className='flex-1 text-center'>
                    <h1 className='font-bold text-xl'><Link to='/'>SHOP</Link></h1>
                </div>
                <div className='flex-1 flex items-center gap-x-5 justify-end'>
                    {
                                            
                        currentUser && Object.keys(currentUser).length > 0 ? (<p>{currentUser.username.toUpperCase()}</p>):
                        (
                        <>                            
                                <p className='cursor-pointer'><Link to='/login'>LOGIN</Link></p>
                                <p className='cursor-pointer'><Link to='/register'>SIGN UP</Link></p>
                        </>
                        )
                

                    }
                    
                    <div className='relative flex cursor-pointer'>
                        <Link to='/cart'><CartIcon /></Link> 
                        {fetchedProducts.length > 0 && <span className='absolute -top-1 text-white -right-2 text-xs px-1 bg-blue-500 rounded-full'>{quantity}</span> }
                    </div>
                </div>
        </div>
        </>
    )
}

export default Navbar
