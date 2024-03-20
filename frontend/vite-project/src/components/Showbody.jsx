import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import './index.css'
import { useParams } from 'react-router-dom';

function Showbody() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null); 

  useEffect(() => {
    axios.get(`http://localhost:5000/blog/blogId/${blogId}`) 
      .then((res) => setBlog(res.data))
      .catch((error) => console.error("Error fetching blog:", error)); 
  }, [blogId]); 

  return (
    <>
      <Navbar />
      <div className='pt-40 bg-gray-900 min-h-screen p-8'>
  <div className='flex flex-wrap justify-center'>
    {blog && ( 
      <div className=' rounded-lg overflow-hidden shadow-md mx-4 my-4 '>
        <img id='img' className=' rounded-lg ' src={blog.coverImageURL} alt='' />
        <div className='p-4'>
          <h4 className='text-white font-semibold mb-2'>{blog.title}</h4>
          <p className='text-gray-300 font-semibold'>{blog.description}</p>
        <p className='text-white mt-2'>{blog.body}</p>
        </div>
      </div>
    )}
  </div>
</div>

    </>
  );
}

export default Showbody;
