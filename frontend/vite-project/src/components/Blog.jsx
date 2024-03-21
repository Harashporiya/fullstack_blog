import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Blog() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ });
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blog/get/all");
        setBlogs(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5000/blog/delete/${blogId}`);
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.log("Error deleting blog:", error);
    }
  };



  useEffect(()=>{
   
    const fetchData = async ()=>{
      try{
        const token = Cookies.get("authorisation")
       
     const response = await axios.get("http://localhost:5000/user/data",{
      headers: {authorisation:token}
     })
     setUserData(response.data);
    //  console.log(response.data)
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
      <div className='pt-40 bg-gray-900 min-h-screen p-8'>
        <div className='flex flex-wrap justify-center'>
          {blogs.map((blog) => (
            <div key={blog.id} className='bg-sky-900 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-lg overflow-hidden shadow-md mx-4 my-4'>
              <img className='h-40 w-full object-cover rounded-t-lg' src={blog.coverImageURL} alt='' />
              <div className='p-4'>
                <h4 className='text-white font-semibold mb-2'>{blog.title}</h4>
                <p className='text-gray-300 font-semibold'>{blog.descreption}</p>
            
               
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className='mt-2 text-white bg-red-600 px-4 py-2 rounded-md font-semibold'
                  >
                    Delete
                  </button>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blog;
