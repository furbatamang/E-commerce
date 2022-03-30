import React,{useState} from 'react'
import { loginStart, loginFail, loginSuccess } from '../redux/user';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Login = () => {
    const dispatch = useDispatch()
    const {fetching, error} = useSelector(state => state.user)
    const [info, setInfo] = useState({
        username:'',
        password:''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInfo({
            ...info,
            [name]: value
        })
    }


    const handleSubmit = async (e) =>{
        e.preventDefault()
        dispatch(loginStart());
        try{
            const res = await axios.post('http://localhost:3001/api/auth/login', info);
            dispatch(loginSuccess(res.data))
        }catch(err){
            console.log('error',err);
            dispatch(loginFail())
        }

    }
    return (
        <div className='h-screen w-screen bg-loginImage flex items-center justify-center'>
            <div className='w-1/3'>
                <div className='bg-white p-10 flex flex-col gap-y-5 rounded-md'>
                    <h1 className='text-3xl'>
                        SIGN IN
                    </h1>
                    <form action="" className='flex flex-col gap-y-5' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-y-5'>
                            <input type="text" className='flex-1 border-gray-400 border-2 p-2 rounded-sm' placeholder='user name' name='username' onChange={handleChange} value={info.username}/>
                            <input type="password" className='flex-1 border-gray-400 border-2 p-2 rounded-sm' placeholder='password' name='password' onChange={handleChange} value={info.password}/>
                        </div>
                        <button className={`w-1/2 items-center justify-start bg-teal-700 text-white px-5 py-4 ${fetching ? 'cursor-not-allowed': ''}`} disabled={fetching} >LOGIN</button>
                        {error && <p className='text-red-500 text-xl'>Something went wrong....</p>}
                    </form>
                    <div className='flex flex-col gap-y-5'>
                        <p className='cursor-pointer'><u>FORGOT PASSWORD?</u></p>
                        <Link to="/register">
                            <p className='cursor-pointer'><u>CREATE NEW ACCOUNT</u></p>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
