import React from 'react'
import {useNavigate } from 'react-router-dom';
import { useUser } from '../userContext';

const Home = () => {
const {setUserType} = useUser();
    const navigate = useNavigate();

    const handleAdmin =()=>{
        setUserType('Admin');
        navigate('/login');
    }

    const handleInstr =()=>{
        setUserType('Instructor');
        navigate('/login');
    }

  return (
    <div className="h-screen grid place-content-center bg-slate-900">
        <div className="flex gap-x-[4dvh]  justify-center">

            <div className="max-w-sm mx-auto text-center bg-white p-6 rounded-3xl overflow-hidden">
                <img src='/admin-1.png' alt="admin" className=""/>
                
                <button onClick={handleAdmin} className="bg-sky-500 text-white p-3 rounded-lg hover:bg-sky-950">Login as admin</button>
                
            </div>
            <div className="max-w-sm mx-auto text-center bg-white p-6 rounded-3xl overflow-hidden">
                <img src='/teacher-1.png' alt="instructor" className='' />
                
                <button onClick={handleInstr}className="bg-sky-500 text-white p-3 rounded-lg hover:bg-sky-950">Login as instructor</button>
               
            </div>

        </div>
        
        </div>
  )
}

export default Home;
