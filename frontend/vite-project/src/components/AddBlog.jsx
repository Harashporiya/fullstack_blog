import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddBlog() {
  const [descreption, setdescreption] = useState();
  const [title, settitle] = useState();
  const [body, setbody] = useState();
  const [coverImageURL, stecoverImageURL] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault(); 
    try{
    const response = await axios.post("http://localhost:5000/blog/add-new",{
      descreption,
        title,
        body,
        coverImageURL,

    })
    toast.info("Create Blog  Succesfully", {
      position: "top-right"
    });
    console.log(response.data);
  } catch(error){
    console.log("error", error);
  }
  }
  
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900">

        <div className="bg-white p-16 rounded-2xl shadow-2xl w-2/3">

          <h2 className="text-3xl font-bold mb-10 text-gray-800">Add Blog</h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block mb-1 font-bold text-gray-500" htmlFor='title'>Title</label>
              <input onChange={(e)=>settitle(e.target.value)} type="text" className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-600" />
            </div>

            <div>
              <label className="block mb-1 font-bold text-gray-500" htmlFor='descreption'>Descreption</label>
              <input onChange={(e)=>setdescreption(e.target.value)} type="text" className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-600" />
            </div>

            <div>
              <label className="block mb-1 font-bold text-gray-500" htmlFor='body'>Body</label>
              <input onChange={(e)=>setbody(e.target.value)} type="text" className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-600" />
            </div>


            <div>
              <label className="block mb-1 font-bold text-gray-500" htmlFor='body'>Image url</label>
              <input onChange={(e)=>stecoverImageURL(e.target.value)} type="url" className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-600" />
            </div>



            <button onChange={handleSubmit}  className=" text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-lg px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Submit</button>

          </form>

        </div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default AddBlog;
