import React, { useEffect, Fragment, useState } from 'react'
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {ReactComponent as AddIcon} from '../assets/icons/add.svg';
import {ReactComponent as MinusIcon} from '../assets/icons/minus.svg';
import '../assets/css/Cart.css'
import { useSelector, useDispatch } from 'react-redux';
import { getProductStart, getProductSuccess, getProductFailure } from '../redux/cart';
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import esewa from '../assets/images/esewa.png';
import post from '../esewa/settings';
import { deleteProductStart, deleteProductSuccess } from '../redux/cart';
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

    // console.log(total)
    const handleClick = async (e) => {
        e.preventDefault();
        // try{
        //     const res = await axios.post('http://localhost:3001/api/orders',{
        //         userName,
        //         products,
        //         amount:total,
        //     },
        //     {
        //         headers:{
        //             token:JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user).currentUser?.token
        //         }
        //     })
            
        // }catch(err){
        //     console.log(err)
        // }
        post(total)
        setIsOpen(false)
    }

    // delete Cart product
    const deleteHandler = (id, quantity) => {
        dispatch(deleteProductStart());
        dispatch(deleteProductSuccess({id,quantity}))
    }

//    Modal
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
    setIsOpen(false)
    }

    function openModal() {
    setIsOpen(true)
    }

    return (
        <div>
            <Navbar/>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
                >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                    >
                    &#8203;
                    </span>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                        >
                        Payment 
                        </Dialog.Title>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            <img src={esewa} alt=""  className='h-40 w-50'/>
                        </p>
                        </div>

                        <div className="mt-4">
                        <button
                            type="submit"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={handleClick}
                        >
                            Make Payment
                        </button>
                        </div>
                    </div>
                    </Transition.Child>
                </div>
                </Dialog>
            </Transition>
      {/* MOdal end */}
            <div className='p-10'>
                <div className='flex flex-col gap-y-4 items-center'>
                    <h1 className='text-4xl'>YOUR CART</h1>
                    <div className='flex justify-between items-center w-full'>
                        <Link to='/'>
                            <button className='border-2 border-black p-2'>
                                CONTINUE SHOPPING
                            </button>
                        </Link>
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
                            <>                        
                            <div className='flex justify-between items-center py-2'>
                            <div className='flex items-center gap-x-4'>
                                <img className='flex-1 h-56' src={product.img} alt="" />
                                <div className='flex-1 flex flex-col gap-y-3'>
                                    <p><b>Product:</b> {product.title}</p>
                                    <p><b>Id:</b> {product._id}</p>
                                    <div className={`bg-${product.color}-500 h-5 w-5 rounded-full`}></div>
                                    <div className='flex justify-between'>
                                        <p><b>Size:</b> {product.size}</p>
                                        <p className='cursor-pointer' onClick={() => deleteHandler(product._id,product.amount)}>delete</p>
                                    </div>
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
                                <button className='border bg-gray-100 px-2 rounded-sm border-black' onClick={openModal}>CHECKOUT NOW</button>
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
