import React, { useEffect } from 'react'
import {ReactComponent as SearchIcon} from '../assets/icons/search.svg';
import {ReactComponent as CartIcon} from '../assets/icons/cart.svg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutSuccess } from '../redux/user';
const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {quantity} = useSelector(state => state.cart);
    const {currentUser} = useSelector(state => state.user);
    const logout = () => {
        dispatch(logOutSuccess())
        localStorage.setItem('persist:root','')
        navigate('/')
        
    }
    // useEffect(() => {

    // },[logout])
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
                    <h1 className='font-bold text-xl'><Link to='/'>DELIGHT</Link></h1>
                </div>
                <div className='flex-1 flex items-center gap-x-5 justify-end'>
                    {
                                            
                        currentUser && Object.keys(currentUser).length > 0 ? (
                        <div className='flex'>
                            <p>{currentUser.username.toUpperCase()}</p>
                            <p className='ml-5 cursor-pointer' onClick={logout}>LOGOUT</p>
                        </div>
                        ):
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
