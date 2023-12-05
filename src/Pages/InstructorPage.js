import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const InstructorPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [lectures,setLectures] = useState([]);

  const getLectures =async()=>{
    try {
      const response = await fetch(`https://online-3rbe.onrender.com/${id}/lectures`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Instructor ${localStorage.getItem("Instructor-token")}`,
              
          },
      })
      if (response.ok) {
          const data = await response.json(); // Extract data from response body
          setLectures(data.data); // Assuming the response has a property 'data' containing courses
          // console.log(data.data);
      }
  } catch (err) {
      alert("Something went wrong on server side");
  }
}

  useEffect(()=>{
    getLectures();
    window.scrollTo(0, 0);
        if(localStorage.getItem("Instructor-token")){
            
            getLectures();
        }else{
            if(localStorage.getItem("Admin-token")){
                navigate('/adminpanel')
            }else{

                navigate('/')
            }
        }
  },[])



  const handleSignOut =()=>{
    localStorage.removeItem("Instructor-token");
    navigate('/');

}

  return (
    <div className='h-screen text-white'>
      <div className='max-w-md m-auto pt-4'>

      <div className='flex p-3 justify-between'>

      <h1 className='font-bold '>
      Welcome back,
      </h1>
      <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className='pt-10'>
        Your all schedule lectures
      </div>

      <div className='pt-3'>
        <div className='flex justify-between'>
          <span>Date</span>
          <span>Lecture Name</span>
        </div>

        <div className='pt-4'>

        {
          lectures && lectures.map((lecture,index)=>(
            <div key={index} className='flex pt-2 pb-2 justify-between'>
              <span>{lecture.Date}</span>
              <span>{lecture.courseName}</span>
            </div>
          ))
        }
        </div>

      </div>
      </div>
      </div>
  )
}

export default InstructorPage