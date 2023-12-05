import React, { useEffect, useState } from 'react'
import { useUser } from '../userContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const[email,setEmail]= useState('');
  const[password,setPassword]= useState('');
  const {userType,setUserType,setToken,setIsAuthenticate} = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userType);

    try {
      const response = await fetch('https://online-3rbe.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailId: email, pass: password, user: userType }), // Sending data to backend
      });

      if (response.ok) {
        const data = await response.json();
        const { token,user,InstrId } = data;
        // Set user type or token in context or localStorage/sessionStorage
        setUserType(user); // Set user type in context
        setIsAuthenticate(true); // Set authentication status
        localStorage.setItem(`${user}-token`, token); // Store token in localStorage
        setToken(token);
        // console.log(InstrId);
        // console.log(token);
        // console.log(user);
        // console.log(userType);
        if(user==="Admin"){

          navigate("/adminpanel")
        }else{
          navigate(`/instructorpanel/${InstrId}`)
        }
        // Redirect or perform necessary actions upon successful login
      } else {
        // Handle incorrect credentials or other errors
        alert(response.statusText)
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  useEffect(()=>{
    window.scrollTo(0,0);
    if(userType ===""){
      navigate("/")
    }
  })
  
  return (
    <div className='h-screen grid place-content-center bg-slate-200'>
      <form onSubmit={handleSubmit}>

      <div className="flex gap-6 flex-col max-w-md bg-slate-900 p-3">
        <div className="text-center text-2xl font-bold text-white">
          Login Page
        </div>
        <input type='email' name='email' className="border-collapse rounded-lg p-1" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        <input type='password' name='password' className="border-collapse rounded-lg p-1"value={password}
            onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit"className='bg-sky-500 text-white p-1 rounded-lg hover:bg-sky-950'>
          Login
        </button>

      </div>
            </form>
    </div>
  )
}

export default LoginPage;