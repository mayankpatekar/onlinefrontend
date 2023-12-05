import React, { useState } from 'react'

const AddCourseForm = ({ showForm, setShowForm }) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [description, setDescription] = useState('');
    // const formData = new FormData();
    
    // const handleButtonClick = () => {
    //     setShowForm(true);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToUpload = new FormData();
    formDataToUpload.append('file', document.getElementById('courseimage').files[0]);

        // Handle form submission logic here
        // After submission, you can close the form by updating state
        try {

            if (image && name && level && description) {

                const response1 = await fetch('https://online-3rbe.onrender.com/api/upload', {
                    method: 'POST',
                    body: formDataToUpload
                });

                const data = await response1.json();
                const courseImageUrl = data.imageUrl;

                if (!courseImageUrl) {
                    throw Error("Failed to upload image");
                }

                const response = await fetch('https://online-3rbe.onrender.com/course', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Admin ${localStorage.getItem("Admin-token")}`,
                    },
                    body: JSON.stringify({ Name: name, Level: level, Description: description, Image: courseImageUrl }), // Sending data to backend
                });

                if (response.ok) {

                    window.alert(response.data.message);
                    setImage(null);
                    setName("");
                    setLevel('');
                    setDescription('');
                    setShowForm(false);
                    window.location.reload();

                } else {
                    throw new Error(response.statusText);
                }
            } else {
                alert('Please fill all fields')
            }
        } catch (err) {
            console.log('Error during adding course: ', err);
        }


    };

    const handleDropdownChange = (event) => {
        setLevel(event.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // Read the file content using FileReader
        const reader = new FileReader();

        reader.onloadend = () => {
            // Convert the file content to base64 or blob
            const base64Data = reader.result; // This can be sent to the server or used directly in the client
            setImage(base64Data);
        };

        if (file) {
            reader.readAsDataURL(file); // This reads the file content
            // If you need to handle file content as a blob, use reader.readAsArrayBuffer(file);
        }
    };



    return (
        <div className="h-screen grid place-content-center">
            <form className='flex flex-col gap-5 ' onSubmit={handleSubmit}>
                <h3 className="font-bold text-center">Add Course</h3>

                <input type="text" placeholder="Name" name='name' className="p-2 rounded-lg text-black focus:border-slate-600"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                {/* <input type="text" placeholder="Level" name='level' className="p-2 rounded-lg focus:border-slate-600"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)} /> */}
                <select id='level' className="p-2 rounded-lg focus:border-slate-600 text-black" value={level} onChange={handleDropdownChange}>
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Medium">Medium</option>
                    <option value="Advanced">Advanced</option>
                </select>
                <textarea placeholder='Description' name='description' className="p-2 rounded-lg text-black focus:border-slate-600"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <input type="file" id='courseimage' onChange={handleImageChange} accept="image/*" size="50000" className="p-2 rounded-lg focus:border-slate-600"
                />
                {image && (
                    <div className='font-bold'>
                        <p>Preview:</p>
                        <img src={image} alt="Uploaded" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </div>
                )}
                <div className='flex justify-evenly'>

                    <button className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-950" type="submit">Submit</button>
                    <button className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-950" type="button" onClick={() => setShowForm(false)}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default AddCourseForm