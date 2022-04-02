import React,{useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { loginFail, loginStart, loginSuccess } from '../../redux/user';
import {useHistory, Redirect} from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [info, setInfo] = useState({
        username:'',
        password:'' 
        
    })
    const changeHandler = (e) => {
        const {name, value} = e.target;
        setInfo({
            ...info,
            [name]:value
        })
    }
    
    // console.log(JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token)
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginStart())
        try{
            const res = await axios.post('http://localhost:3001/api/auth/login', info)
            dispatch(loginSuccess(res.data));
            window.location.replace('http://localhost:3000/dashboard')
            console.log('loginsuccess')
        }catch(err){
            console.log(err)
            dispatch(loginFail())
        }
    }
    return (
    <div>
        <form style={{
            display:'flex',
            flexDirection:'column',
            height:'100vh',
            alignItems:'center',
            justifyContent:'center',
            
        }}
        onSubmit={handleSubmit} 
        >
            <input type="text" name='username' placeholder='Username' value={info.username} onChange={changeHandler} style={{padding:'10px', marginBottom:'20px'}}/>
            <input type="password" name="password" id="" placeholder='Password'value={info.password} onChange={changeHandler} style={{padding:'10px', marginBottom:'20px'}}/>
            <button type='submit' style={{padding:"10px 50px"}}>Login</button>
        </form>
    </div>
  )
}

export default Login