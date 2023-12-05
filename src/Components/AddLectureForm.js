import React, { useState } from 'react'

const AddLectureForm = ({course, instructors, setShowForm }) => {
    console.log(instructors,"this is from me")

    const [selectedDate, setSelectedDate] = useState('');
    const [instructor, setInstructor] = useState('');
    const [instructorId , setInstructorId] = useState('');

    const putlecture = async() =>{
        try{
            if(selectedDate && instructorId){
                console.log(course._id,instructorId,selectedDate);
                const response = await fetch('https://online-3rbe.onrender.com/assignlecture',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Admin ${localStorage.getItem("Admin-token")}`,
                      },
                    body: JSON.stringify({courseId: course._id,instructId: instructorId,date: selectedDate })
                });
                if(response.status === 409){

                    console.log(response);
                    alert("you can not assign same lecture twise or more than one lecture for same instructor");
                }

                if(response.ok){
                    alert("Lecture Assigned Successfully");
                    setShowForm(false);
                    window.location.reload();
                }

            }else{
                alert("Please fill all fields");
            }

        }catch(err){
            console.log('Error during assigning course: ', err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        putlecture();
        // setShowForm(false);

    }

    const handleDropdownChange = (event) => {
        setInstructor(event.target.value);
        let selectedIns = instructors.filter((ins)=> ins.name === event.target.value)[0];
    //    console.log(selectedIns,"this is selected instructor")
        setInstructorId(selectedIns._id)
    };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    // console.log(selectedDate);
  };

  console.log(selectedDate);
    return (
        <div className="h-full bg-black bg-transparent grid place-content-center">
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>

                <div className='flex'>
                    <label className="p-2 m-2 bg-black text-white">
                        Select a date:
                        <input type="date" className=' text-black ml-2' value={selectedDate} onChange={handleDateChange} />
                    </label>

                    <label className="p-2 m-2 bg-black text-white">
                        Select Instructor
                    <select id='level' className=" text-black ml-2 focus:border-slate-600"value={instructor} onChange={handleDropdownChange} >
                        <option value="">Instructor names</option>
                        {
                            instructors && instructors.map((instr)=>(
                                <option key={instr._id} value={instr.name}>{instr.name}</option>
                            ))
                        }
                    </select>
                    </label>
                </div>

                <div className='flex justify-evenly'>

                    <button className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-950" type="submit">Submit</button>
                    <button className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-950" type="button" onClick={() => setShowForm(false)}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default AddLectureForm