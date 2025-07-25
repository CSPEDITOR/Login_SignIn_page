// src/pages/Signup.jsx
import React, { useState } from 'react';
import {ToastContainer} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import { handleError, handleSuccess } from './utils';
function Signup() {
    const [signupinfo, setsignupinfo] = useState({
        name:'',
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const handleChange = (e)=>{
        const {name,value} = e.target;
        console.log(name,value);
        const copySignupInfo = {...signupinfo};
        copySignupInfo[name]=value;
        setsignupinfo(copySignupInfo);
    }
    console.log('SignupInfo -> ',signupinfo)
    const handleSignup = async (e) =>{
        e.preventDefault();
        const{name ,email,password} = signupinfo;
        if(!name || !email || !password){
            return handleError('name, email and Password');
        }
        try{
            const url = "https://login-signup-page-beta-six.vercel.app/auth/signup";
            const response = await fetch(url,{
                method: "POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(signupinfo)
            });
            const result = await response.json();
            const {success, message,error} =result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
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
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} type="text" name='name' autoFocus placeholder='Enter your name' value={signupinfo.name} />
            </div>
            <div>
                <label htmlFor="email">email</label>
                <input onChange={handleChange} type="email" name='email' autoFocus placeholder='Enter your email' value={signupinfo.email}/>
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input onChange={handleChange} type="password" name='password' placeholder='Enter your password' value={signupinfo.password} />
            </div>
            <button type='submit'>Signup</button>
            <span> Already have an account ?
                <Link to= "/login">Login</Link>
            </span>
        </form>
        <ToastContainer />
    </div>
  );
}

export default Signup;
