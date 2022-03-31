import React, { useEffect, useState } from 'react';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import {ReactComponent as AddIcon} from '../assets/icons/add.svg';
import {ReactComponent as MinusIcon} from '../assets/icons/minus.svg';
import { useLocation } from 'react-router-dom';
import {ReactComponent as LoaderIcon} from '../assets/icons/loader.svg'
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { addProductSuccess,addProductStart, addProductFailure } from '../redux/cart';

const SingleProduct = () => {
    const userId = JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user).currentUser?._id;
    const {products, total} = useSelector(state => state.cart)
    const id = useLocation().pathname.split("/")[2];
    const [singleProduct, setSingleProduct] = useState({});
    const [amount, setAmount] = useState(1);
    const [color, setColor] = useState("black");
    const [size, setSize] = useState("S");
    const [error, setError] = useState(false)
    console.log(products)
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            fetch()
        },3000)
        const fetch = async () => {
            try{
                const {data} = await axios.get(`http://localhost:3001/api/products/find/${id}`); 
                setSingleProduct(data);
                
            }catch(err){
                console.log(err)
            }
        }
        
    }, [id])

    const handleAmount = (type) => {
        if(type === 'dec'){
            amount > 1 && setAmount(amount - 1)
        }else{
            setAmount(amount + 1)
        }
    }

    const handleClick = async (e) => {
        dispatch(addProductStart())
        // console.log(JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token)
        try{
            const res = await axios.post('http://localhost:3001/api/carts',{
                userId,
                products,
                quantity:amount
            },{
                headers:{
                    token:JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token
                }
            })
            console.log(res)
            dispatch(addProductSuccess({...singleProduct, amount, color, size}))
        }catch(err){
            console.log(err);
            setError(true);
            dispatch(addProductFailure())
        }
        
    }
    return (
        <>
            
            <Navbar/>
            {
                Object.keys(singleProduct).length !== 0 ? 
                (
                    <div className='p-5'>
                <div className='flex gap-x-10'>
                    <div className='flex-1'>
                        <img src={singleProduct.img} alt="" className='h-5/6 w-full'/>
                    </div>
                    <div className='flex-1 flex flex-col gap-y-5'>
                        <h1 className='text-3xl font-semibold'>
                            {singleProduct.title}
                        </h1>
                        <p className=''>
                            {singleProduct.description}
                        </p>

                        <p className='text-3xl'>$ {singleProduct.price}</p>
                        <div className='flex justify-start gap-x-10'>
                            <div className='flex gap-x-3 items-center'>
                                <p className='text-lg'>Color</p>
                                {
                                    singleProduct.color?.map((c) => (
                                        
                                        <div className={`bg-${c}-500 h-5 w-5 rounded-full hover:cursor-pointer`}  onClick={() => setColor(c)}></div>
                                    ))
                                }
                                
                                {/* <div className='h-5 w-5 rounded-full bg-teal-900'></div>
                                <div className='h-5 w-5 rounded-full bg-pink-900'></div> */}
                            </div>
                            <div className='flex gap-x-2 items-center'>
                                <h4 className='text-lg'>Size</h4>
                                <select name="" id="" className='p-1 border-2 border-black' onChange={(e) => setSize(e.target.value)}>
                                    <option value="" disabled selected>Size</option>
                                    {
                                        singleProduct.size.map((size) => (
                                            <option>{size.toUpperCase()}</option>
                                        )
                                    )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='flex items-center gap-x-10 align-center'>
                            <div className='flex gap-x-2 items-center '>
                                <MinusIcon onClick={() => handleAmount('dec')} className="cursor-pointer"/>
                                <span className=' px-3 border-2 border-teal-500 rounded-lg'>{amount}</span>
                                <AddIcon onClick={() => handleAmount('inc')} className="cursor-pointer"/>
                            </div>
                            <div className='flex flex-col'>
                                <button className='border-4 border-teal-500 py-3 px-2' onClick={handleClick}>
                                    ADD TO CART
                                </button>
                                {error ? <p className='text-red-500'>Please login first</p> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                ) :( 
                <p>
                     <LoaderIcon />
                </p>
               )
            }
            
            <Newsletter/>
            <Footer/>
        </>
    )
}

export default SingleProduct
