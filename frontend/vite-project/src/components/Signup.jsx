import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Cookies from 'js-cookie'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/signup", {
        firstname,
        lastname,
        email,
        password,
        
      });
      console.log(password)
      console.log(response.data);
      Cookies.set("authorisation", response.data.token)
     navigate("/home")
      if (response.status >= 200 && response.status < 300) {
        toast.info(response.data.message, {
          position: "top-right"
        });
      } else  {
        throw new Error("Error signing up. Please try again later.");
      }
    } catch (error) {
      console.error("Error sign-up:", error);
      toast.error(error.message, {
        position: "top-left"
      });
      throw error; 
    }
  };
  
  
  return (
    <>
      <Navbar />
      <div className='bg-gray-900 min-h-screen flex justify-center items-center'>

        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label htmlfor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
            <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:shadow-sm-light" placeholder="Enter your first name"  />
          </div>
          <div className="mb-5">
            <label htmlfor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
            <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:shadow-sm-light" placeholder="Enter your last name" required />
          </div>
          <div className="mb-5">
            <label htmlfor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light" placeholder="Enter your email" required />
          </div>
          <div className="mb-5">
            <label htmlfor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:shadow-sm-light" placeholder='Enter your password' required />
          </div>

         
        
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50  dark:bg-gray-700 dark:border-gray-600 " required />
            </div>
            <label htmlfor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
          </div>
          <button onSubmit={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Register new account</button>
        </form>

      </div>
        <ToastContainer />
    </>
  );
}
