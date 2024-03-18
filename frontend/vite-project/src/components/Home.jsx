import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ });

  useEffect(()=>{
   
    const fetchData = async ()=>{
      try{
        const token = Cookies.get("authorisation")
       
     const response = await axios.get("http://localhost:5000/user/data",{
      headers: {authorisation:token}
     })
     setUserData(response.data);
     console.log(response.data)
    } catch(error){
    navigate('/login')
    console.log("Error", error);
  }
  }
    fetchData();
  },[]);
  return (
    <>
      <Navbar />
      <div className='bg-gray-900 min-h-screen'>
        <p className='pt-40 flex justify-center  text-white'>Home</p>
        <h2 className='text-white flex justify-center '> {userData.email} </h2>
      </div>
    </>
  );
}

export default Home;
