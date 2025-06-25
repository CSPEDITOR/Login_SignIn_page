// src/App.jsx
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import { useState } from 'react';
import RefreshHandler from './pages/RefreshHandler.jsx';

function App() {
  const [isAuthenticated,setisAuthenticated] =useState(false);
  const PrivetRoute =({element}) =>{
    return isAuthenticated ? element : <Navigate to='/login' />
  }
  
  return (
    <div>
      <RefreshHandler setisAuthenticated={setisAuthenticated} />
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<PrivetRoute element={<Home/>}/>} />
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
    </div>
  );
}

export default App;

