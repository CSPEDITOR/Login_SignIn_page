// src/pages/Signup.jsx
import React, { useState } from 'react';
import {ToastContainer} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import { handleError, handleSuccess } from './utils';
function Login() {
    const [logininfo, setlogininfo] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const handleChange = (e)=>{
        const {name,value} = e.target;
        console.log(name,value);
        const copylogininfo = {...logininfo};
        copylogininfo[name]=value;
        setlogininfo(copylogininfo);
    }


    const handleLogin = async (e) =>{
        e.preventDefault();
        const{email,password} = logininfo;
        if(!email || !password){
            return handleError('email and Password require');
        }
        try{
            const url = "https://login-signup-page-beta-six.vercel.app/auth/login";
            const response = await fetch(url,{
                method: "POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(logininfo)
            });
            const result = await response.json();
            const {success, message,jwtToken,name ,error} =result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(()=>{
                    navigate('/home')
                },1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        }catch(err){
            handleError(err);
        }
    }

  return (
    <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="email">email</label>
                <input onChange={handleChange} type="email" name='email' autoFocus placeholder='Enter your password' value={logininfo.email} />
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input onChange={handleChange} type="password" name='password' placeholder='Enter your password' value={logininfo.password}/>
            </div>
            <button type='submit'>Login</button>
            <span> don't have an account ?
                <Link to= "/signup">signup</Link>
            </span>
        </form>
        <ToastContainer />
    </div>
  );
}

export default Login;
