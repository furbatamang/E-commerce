import React from 'react'
import {ReactComponent as SearchIcon} from '../assets/icons/search.svg';
import {ReactComponent as CartIcon} from '../assets/icons/cart.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Navbar = () => {
    const {quantity} = useSelector(state => state.cart);
    const {currentUser} = useSelector(state => state.user);
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
                        {quantity > 0 && <span className='absolute -top-1 text-white -right-2 text-xs px-1 bg-blue-500 rounded-full'>{quantity}</span> }
                    </div>
                </div>
        </div>
        </>
    )
}

export default Navbar
