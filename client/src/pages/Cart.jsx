import React, { useEffect } from 'react'
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {ReactComponent as AddIcon} from '../assets/icons/add.svg';
import {ReactComponent as MinusIcon} from '../assets/icons/minus.svg';
import '../assets/css/Cart.css'
import { useSelector, useDispatch } from 'react-redux';
import { getProductStart, getProductSuccess, getProductFailure } from '../redux/cart';
import axios from 'axios';
const Cart = () => {
    const {products, total, fetchedProducts} = useSelector(state => state.cart);
    const id = JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user).currentUser?._id
    const userName = JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user).currentUser?.username
    const dispatch = useDispatch()
    const fetchCart = async () => {
        dispatch(getProductStart());
        try{
            const {data} = await axios.get('http://localhost:3001/api/carts',{
                headers:{
                    token:JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user).currentUser?.token
                }
            })
            // console.log(id === data[0].userId)
            let products = data.filter(item => (id === item.userId)
                
            )
            dispatch(getProductSuccess(products))
        }catch(err){
            console.log(err);
            dispatch(getProductFailure())
        }
    }
    useEffect(() => {
        fetchCart()
    },[])


    const handleClick = async (e) => {
        e.preventDefault();
        
        try{
            const res = await axios.post('http://localhost:3001/api/orders',{
                userName,
                products,
                amount:total,
            },
            {
                headers:{
                    token:JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user).currentUser?.token
                }
            })
            
        }catch(err){
            console.log(err)
        }
    }
    console.log(total)
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <div className='p-10'>
                <div className='flex flex-col gap-y-4 items-center'>
                    <h1 className='text-4xl'>YOUR BAG</h1>
                    <div className='flex justify-between items-center w-full'>
                        <button className='border-2 border-black p-2'>CONTINUE SHOPPING</button>
                        <div className='flex gap-x-4'>
                            <p className='cursor-pointer'><u>Shopping Bag(2)</u></p>
                            <p className='cursor-pointer'><u>Your Wishlist(0)</u></p>
                        </div>
                        <button className='bg-black p-2 text-white'>CHECKOUT NOW</button>
                    </div>
                </div>
                <div className='flex justify-between gap-x-10 py-5'>
                    <div className='product-detail'>
                        {products.map((product) => (
                            <>                        <div className='flex justify-between items-center py-2'>
                            <div className='flex items-center gap-x-4'>
                                <img className='flex-1 h-56' src={product.img} alt="" />
                                <div className='flex-1 flex flex-col gap-y-3'>
                                    <p><b>Product:</b> {product.title}</p>
                                    <p><b>Id:</b> {product._id}</p>
                                    <div className={`bg-${product.color}-500 h-5 w-5 rounded-full`}></div>
                                    <p><b>Size:</b> {product.size}</p>
                                </div>
                            </div>
                            <div className='flex gap-y-4 flex-col'>
                                <div className='flex items-center text-2xl gap-x-2'>
                                    {/* <AddIcon/> */}
                                    <p>Quantity: {product.amount}</p>
                                    {/* <MinusIcon/> */}
                                </div>
                                <p className='text-4xl font-light'>${product.price * product.amount}</p>
                            </div>
                        </div>
                        <hr className='h-1' />
                        </>

                        )
                        )}
                        
                    </div>
                    <div className='summary'>
                        <div className='border-2 border-gray-300 rounded-md'>
                            <div className='p-4 flex flex-col gap-y-5 items-start'>
                                <h1 className='text-3xl font-light'>ORDER SUMMARY</h1>
                                <div className='flex justify-between items-center w-full'>
                                    <p>Subtotal</p>
                                    <p>${total}</p>
                                </div>
                                <div className='flex justify-between items-center w-full'>
                                    <p>Estimated Shipping</p>
                                    <p>-</p>
                                </div>
                                <div className='flex justify-between items-center w-full'>
                                    <p>Shipping Discount</p>
                                    <p>-</p>
                                </div>
                                <div className='flex justify-between items-center w-full font-bold text-2xl'>
                                    <h4>Total</h4>
                                    <p>${total}</p>
                                </div>
                                <button className='border bg-gray-100 px-2 rounded-sm border-black' onClick={handleClick}>CHECKOUT NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Cart
