import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import './index.css'
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from './Comment';

function Showbody() {
  const navigate = useNavigate()
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  // const [blogs, setBlogs] = useState([]);
  const [userData, setUserData] = useState({});



  useEffect(() => {
    axios.get(`http://localhost:5001/blog/blogId/${blogId}`)
      .then((res) => setBlog(res.data))
      .catch((error) => console.error("Error fetching blog:", error));
  }, [blogId]);


  // const handleDelete = async (blogId) => {
  //   try {
  //     await axios.delete(`http://localhost:5001/blog/delete/${blogId}`);
  //     setBlogs(blogs.filter(blog => blog._id !== blogId));
  //   } catch (error) {
  //     console.log("Error deleting blog:", error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("authorisation");
        // console.log(token)
        const response = await axios.get("http://localhost:5001/user/data", {
          headers: { authorisation: token }
        });
        setUserData(response.data);
      } catch (error) {
        navigate('/login');
        console.log("Error", error);
      }
    };
    fetchData();
  }, [navigate]);






  return (
    <>
      <Navbar />
      <div className='pt-28 bg-gray-900 min-h-screen p-8'>
        <div className='flex flex-wrap justify-center'>
          {blog && (
            <div className=' rounded-lg overflow-hidden shadow-md mx-4 my-4 '>
              <div className='p-4'>
                <h4 className='text-white font-semibold mb-2'>{blog.title}</h4>
                <p className='text-gray-300 font-semibold'>{blog.descreption}</p>
              </div>
              <img id='img' className=' rounded-lg ' src={blog.coverImageURL} alt='' />
              <div className='p-4'>

                <p className='text-white mt-2 text-xl'>{blog.body}</p>
              </div>
            </div>
          )}



        </div>
        {/* <button
            onClick={() => handleDelete(blog._id)}
            className='mt-2 text-white bg-red-600 px-4 py-2 rounded-md font-semibold'
          >
            Delete
          </button> */}
        <Comment />
      </div>


    </>
  );
}

export default Showbody;
