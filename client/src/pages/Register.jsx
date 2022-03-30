import React,{useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [accountInfo, setAccountInfo] = useState({
        firstName:'',
        lastName:'',
        userName:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setAccountInfo({
            ...accountInfo,
            [name]: value
        })
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        const register = {
            username:accountInfo.userName,
            email:accountInfo.email,
            password:accountInfo.password
        }
        if(accountInfo.password !== accountInfo.password || accountInfo.userName === ''){
            console.log('password doesnt match')
        }else{
            axios.post('http://localhost:3001/api/auth/register',register)
            .then(res=>{
                console.log(res);
                navigate('/login')
            })
        }
    }
    return (
        <div className='h-screen w-screen bg-registerImage bg-center flex items-center justify-center'>
            <div className='w-1/2'>
                <div className='bg-white p-10 flex flex-col gap-y-5 rounded-md'>
                    <h1 className='text-3xl'>
                        CREATE AN ACCOUNT
                    </h1>
                    <form action="" className='flex flex-col gap-y-5' onSubmit={submitHandler}>
                        <div className='flex gap-x-3'>
                            <input name="firstName" type="text" className='flex-1 border-gray-400 border-2 p-2 rounded-sm' placeholder='first name' value={accountInfo.firstName} onChange={changeHandler}/>
                            <input name="lastName" type="text" className='flex-1 border-gray-400 border-2 p-2 rounded-sm' placeholder='last name' value={accountInfo.lastName} onChange={changeHandler}/>
                        </div>
                        <div className='flex gap-x-3'>
                            <input name="userName" type="text" className='flex-1 border-gray-400 border-2 p-2 rounded-sm' placeholder='user name' value={accountInfo.userName} onChange={changeHandler}/>
                            <input name="email" type="email" className='flex-1 border-gray-400 border-2 p-2 rounded-sm' placeholder='email' value={accountInfo.email} onChange={changeHandler}/>
                        </div>
                        <div className='flex gap-x-3'>
                            <input name='password' type="password" className='flex-1 border-gray-400 border-2 p-2 rounded-sm' placeholder='password' value={accountInfo.password} onChange={changeHandler}/>
                            <input name='confirmPassword' type="password" className='flex-1 border-gray-400 border-2 p-2 rounded-sm' placeholder='confirm password' value={accountInfo.confirmPassword} onChange={changeHandler}/>
                        </div>
                        <span className='flex-1 text-sm'>
                            By creating an account, I consent to the processing of my personal
                            data in accordance with the <b>PRIVACY POLICY</b>
                        </span>
                        <button className='w-1/2 items-center justify-start bg-teal-700 text-white px-5 py-4'>CREATE</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
