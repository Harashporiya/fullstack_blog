import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import './index.css'

function Comment() {
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const { blogId } = useParams();




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("authorisation");
      const response = await axios.post(
        `http://localhost:5001/blog/comment/${blogId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      setComments([...comments, response.data]);
      setContent('');
    } catch (error) {
      console.log('Error posting comment:', error);
    }
  };


  useEffect(() => {
    async function fetchCommentsForBlog() {
      try {
        const response = await axios.get(`http://localhost:5001/blog/all/${blogId}/comment`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    fetchCommentsForBlog();
  }, [blogId]);


  const handleDeleteComment = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5001/blog/delete/${blogId}/comment`);
      setComments(comments.filter(comments => comments._id !== blogId));
    } catch (error) {
      console.log("Error deleting blog:", error);
    }
  };





  return (
    <>
      <p className='text-white text-4xl font-semibold ml-7'>Comment({comments.length})</p>
      <form onSubmit={handleSubmit} className="max-w-5xl bg-white rounded-lg border p-2 ml-5 mt-5">
        <div className="px-3 mb-2 mt-2">
          <textarea
            placeholder="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-gray-100 rounded border border-gray-400 h-20 py-2 px-3 font-medium placeholder-gray-700"
            required
          ></textarea>
        </div>

        <div className="flex px-4">

          <button type="submit" className="font-semibold px-2.5 py-1.5 rounded-md text-white text-sm bg-blue-700 hover:bg-blue-600">
            Comment
          </button>
        </div>
      </form>


      <div className="mt-5 ml-5">
        {comments.map(comment => (
          <div key={comment._id} className="max-w-sm bg-gray-200 rounded-lg p-2 my-1">
          <div className='flex'>
  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU__UzGcTo0GOAf11f211PZ2wGfMsX--5kBg&usqp=CAU' alt='' className='rounded-full w-16 h-16 ' />
  {/* {comment.createdBy && // Check if createdBy is not null */}
    <div className='text-gray-900 pt-4 text-xl font-semibold ml-4'>
     <p className='text-gray-900'> {comment.createdBy.firstname} {comment.createdBy.lastname}</p>
    </div>
  {/* } */}
</div>
            <div className='bg-gray-900 text-white p-3 rounded-xl'>
              <p >{comment.content}</p>
              <p>{comment.createdAt}</p>
            </div>



            <button
              onClick={() => handleDeleteComment(comment._id)}
              className='space-x-4 mt-2 text-white bg-red-600 px-4 py-2  hover:bg-red-700 rounded-md font-semibold'
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </>
  );
}

export default Comment;
