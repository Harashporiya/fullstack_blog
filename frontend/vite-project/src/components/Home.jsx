import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './index.css';
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa6";

function Home() {
  const navigate = useNavigate();
 
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState({}); 
  const [dislikes, setdisLikes] = useState({});

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blog/get/all");
        setBlogs(response.data);
        
        const initialLikes = {};
        response.data.forEach(blog => {
          initialLikes[blog._id] = 0;
        });
        setLikes(initialLikes);
        setdisLikes(initialLikes);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleShowBody = (blogId) => {
    navigate(`/showbody/${blogId}`);
  };

  const handleLikeClick = (blogId) => {
    
    setLikes(prevLikes => ({
      ...prevLikes,
      [blogId]: prevLikes[blogId] + 1
    }));
  };

  const handledisLikeClick=(blogId)=>{
    setdisLikes(prevLikes => ({
      ...prevLikes,
      [blogId]: prevLikes[blogId] + 1
    }));
  };
  

  return (
    <>
      <Navbar />
      <div className='pt-40 bg-gray-900 min-h-screen p-8'>
        <div>
          {blogs.map((blog) => (
            <div key={blog._id} id='card' className='overflow-hidden mx-4 my-4 flex justify-between'>
              <div className='p-4 pt-10'>
                <div onClick={() => handleShowBody(blog._id)}>
                
                  <h4 className='text-white font-semibold mb-2'>{blog.title}</h4>
                  <p className='text-gray-300 font-semibold'>{blog.descreption}</p>
                
                </div>
                <p className='text-gray-500 font-semibold'>{blog.createdAt}</p>
                <div className='text-white flex justify-between w-20 pt-6 '>
                <FaRegThumbsUp className='text-white ' onClick={() => handleLikeClick(blog._id)} />
                <span className='text-white'>{likes[blog._id]}</span>
                <FaRegThumbsDown onClick={() => handledisLikeClick(blog._id)} />
                <span className='text-white'>{dislikes[blog._id]}</span>
                </div>
              </div>
              
              <img className='p-8 rounded-t-lg' src={blog.coverImageURL} alt='' />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
