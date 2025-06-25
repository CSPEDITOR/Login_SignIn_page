// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from './utils';
import { ToastContainer } from 'react-toastify';

function Home() {

  const [loggedInUser,setloggedInUser] =useState('');
  const [products,setproducts] =useState('');
  const navigate = useNavigate();
  const handleLogout =(e) =>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Loggedout successfully')
    setTimeout(()=>{
      navigate('/login');
    },1000)
  }

  useEffect(()=>{
    setloggedInUser(localStorage.getItem('loggedInUser'));
  },[])

  const fetchProducts = async ()=>{
    try{
      const url ="http://localhost:8080/products";
      const headers = {
        headers :{
          'Authorization' : localStorage.getItem('token')
        }
      }
      const response = await fetch(url,headers);
      const result = await response.json();
      console.log(result);
      setproducts(result);
      
    }catch(err){
        handleError(err);
      }
  }

  useEffect(()=>{
    fetchProducts();
  },[])
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products && products?.map((item,index)=>(
            <ul key={index}>
              <span>{item.name}: {item.price}</span>
            </ul>
          ))
        }
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Home;
