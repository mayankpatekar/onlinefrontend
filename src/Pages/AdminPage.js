import React, { useEffect, useState } from 'react'
import { useUser } from '../userContext';
import { Link, useNavigate } from 'react-router-dom';
import AddCourseForm from '../Components/AddCourseForm';

const AdminPage = () => {
    const navigate = useNavigate();
    const {setIsAuthenticate, setUserType, isAuthenticate, userType } = useUser();
    const [showForm, setShowForm] = useState(false);
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);

    const getCourses = async () => {
        try {
            const response = await fetch('https://online-3rbe.onrender.com/courses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Admin ${localStorage.getItem("Admin-token")}`,
                },
            })
            if (response.ok) {
                const data = await response.json(); // Extract data from response body
                setCourses(data.data); // Assuming the response has a property 'data' containing courses
                // console.log(data.data);
            }
        } catch (err) {
            alert("Something went wrong on server side");
        }
    }

    const getInstructors = async () => {
        try {
            const response = await fetch('https://online-3rbe.onrender.com/instructors', {
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

    useEffect(() => {
        window.scrollTo(0, 0);
        if(localStorage.getItem("Admin-token")){

            // if (!localStorage.getItem("Admin-token") === "") {
            //     if (!isAuthenticate || !userType === "Admin") {
            //         navigate("/login")
            //     } else {
                    
            //         navigate("/login")
            //     }
            // }
            // if (isAuthenticate && userType === "Instructor") {
            //     navigate("/instructorpanel")
            // }
            
            getCourses();
            getInstructors();
        }else{
            if(localStorage.getItem("Instructor-token")){
                navigate('/instructorpanel')
            }else{

                navigate('/')
            }
        }

    }, [navigate, isAuthenticate, userType]);


    const handleButtonClick = () => {
        setShowForm(true);
    };


    const handleSignOut =()=>{
        localStorage.removeItem("Admin-token");

        // setIsAuthenticate(false);
        // setUserType("");
        navigate('/');

    }


    return (

        <div className="h-full md:h-screen text-white">
            <h1 className="p-3 font-bold text-3xl text-center">Admin Panel</h1>
            <div className="text-center m-4">
                {!showForm ? (
                    <button className='bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-950' onClick={handleButtonClick}>Add Course +</button>
                ) : (

                    <AddCourseForm showForm={showForm} setShowForm={setShowForm} />
                )}
                <button className='bg-sky-500 ml-10 text-white p-2 rounded-lg hover:bg-sky-950' onClick={handleSignOut}>Sign out</button>

            </div>
            <div className='md:flex justify-evenly'>

                {/* all courses box */}
                <div>

                <h1 className="text-3xl font-bold p-6">Our courses</h1>
                <div className="p-10 m-4 md:flex gap-8 bg-white text-black border-2 border-slate-900">
                    {courses && (
                        <>
                            {courses.map((course, index) => (
                                <Link key={index} to={`/adminpanel/course/${course._id}`} >
                                    <div className="max-w-[200px]  m-2 justify-center content-center text-center align-middle border-2 border-slate-950 rounded-xl overflow-hidden">

                                        <img src={course.image} alt='course' className="h-40 w-auto m-auto" />
                                        <div className='p-3'>
                                            <h3 className="font-bold bg-zinc-900 text-white ">
                                                {course.Name}
                                            </h3>
                                            <span className="font-sans text-left">{course.Description}</span><br></br>

                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </>
                    )
                }

                </div>
                </div>



                {/* <--all instructors will show here --> */}
                <div className='border-2 m-4 h-auto bg-white text-black  border-black p-4' >
                    <h1 className="text-3xl font-bold p-6">Instructors</h1>

                    {
                        instructors && instructors.map((instructor) => (
                            <div key={instructor._id} className='bg-black text-white m-5 p-3'>
                                <div>
                                    {instructor.name}
                                </div>
                                <div>
                                    {instructor.emailId}
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>



        </div>

    )
}

export default AdminPage;