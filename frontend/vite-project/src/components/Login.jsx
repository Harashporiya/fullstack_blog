import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import Cookies from 'js-cookie'; 

import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });

      console.log(response.data);
      Cookies.set("authorisation", response.data.token);

      setTimeout(() => {
        navigate("/home");
      }, 6000);

      toast.success(response.data.message, {
        position: "top-right"
      });
     
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error login:", error);
      toast.error(error.message, { 
        position: "top-right"
      });
    }
  };

  return (
    <><Navbar />
      <div className='bg-gray-900 min-h-screen flex justify-center items-center'>


        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <p className='mb-9 text-white font-semibold text-2xl'>Login to your account</p>
          <div>
            <p className='mb-4 text-white font-semibold text-xl'>
              Don't have an account yet? <Link to="/signup" className="text-blue-500">Signup</Link>
            </p>
          </div>
          <div className="mb-5">
            <label htmlfor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:shadow-sm-light" placeholder="Enter your email" required />
          </div>
          <div className="mb-5">
            <label htmlfor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:shadow-sm-light" placeholder='Enter your password' required />
          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50  dark:bg-gray-700 dark:border-gray-600 " required />
            </div>
            <label htmlfor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
          </div>
          <button onChange={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Login</button>
        </form>

      </div>
      <ToastContainer />
    </>
  )
}

export default Login
