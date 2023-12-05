import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../userContext';
import AddLectureForm from '../Components/AddLectureForm';

const CoursePage = ({match}) => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const { isAuthenticate, userType } = useUser();
    const {id} = useParams();
    // console.log(id)
    const [course,setCourse]= useState();
    const [instructors,setInstructors] = useState([]);
    const [lectures,setLectures] = useState([]);

    const getCourse = async()=>{
        try {
            const response = await fetch(`https://online-3rbe.onrender.com/course/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Admin ${localStorage.getItem("Admin-token")}`,
                },
            })
            if (response.ok) {
                const data = await response.json(); // Extract data from response body
                setCourse(data.data[0]); // Assuming the response has a property 'data' containing courses
                // console.log(data.data);
            }
        } catch (err) {
            alert("Something went wrong on server side");
        }
    }

    const getInstructors =async()=>{
        try {
            const response = await fetch(`https://online-3rbe.onrender.com/instructors`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Admin ${localStorage.getItem("Admin-token")}`,
                },
            })
            if (response.ok) {
                const data = await response.json(); // Extract data from response body
                setInstructors(data.data); // Assuming the response has a property 'data' containing courses
                // console.log(data.data);
            }
        } catch (err) {
            alert("Something went wrong on server side");
        }
    }

    const getLectures = async()=>{
        try {
            const response = await fetch(`https://online-3rbe.onrender.com/course/${id}/getlectures`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Admin ${localStorage.getItem("Admin-token")}`,
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

    console.log(isAuthenticate , userType);
    useEffect(()=>{
        window.scrollTo(0, 0);
        if(localStorage.getItem("Admin-token")){
            
            getCourse();
            getInstructors();
            getLectures();
        }else{
            if(localStorage.getItem("Instructor-token")){
                navigate('/instructorpanel')
            }else{

                navigate('/')
            }
        }

    },[]);

    const handleButtonClick = () => {
        setShowForm(true);
    };
    // console.log(course?.Name);
    // console.log(lectures);
  return (
    <div className="text-center h-full m-auto p-2 md:p-4 max-w-lg md:max-w-2xl lg:max-w-3xl ">
        <div className="">

<div className='flex justify-between m-10'>

        <h2 className='font-bold text-2xl text-left text-white'>Course name :- {course?.Name}</h2>
        <div className='font-bold p-2 bg-white'>{course?.Level}</div>
</div>
        <div className="text-center max-w-xl m-auto">
            <div className="text-center">
                <img src={course?.image} alt='course' className="m-auto w-min"/>
            </div>
            <div className='text-white mt-2 mb-2 text-left'>
                {course?.Description}
            </div>

            <div>

            </div>
        </div>
        </div>
        <div className='bg-white m-2 p-2'>
            {/* button to assign lecture */}
            <div className='text-right p-4'>
            {!showForm ? (
                    <button className='bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-950' onClick={handleButtonClick}>Assign lecture +</button>
                ) : (

                    <AddLectureForm course={course} instructors={instructors} showForm={showForm} setShowForm={setShowForm} />
                )}

            </div>
            {/* all lecture assign will show here */}

            <h2 className='font-bold text-left'>All Schedule lecture will display here</h2>
            <div className='p-3 border-2 m-2'>
                <div className='flex justify-between pb-4'>
                <span className='font-bold'>Date</span>
                            <span className='font-bold'>Instructor Name</span>
                </div>

                {
                    lectures && lectures.map((lecture, index) => (
                        <div key={index} className='flex justify-between pb-3'>
                            <span >{lecture.Date}</span>
                            <span>{lecture.instructor[0].name}</span>
                        </div>
                    ))
                }
            </div>
    </div>

    </div>
  )
}

export default CoursePage