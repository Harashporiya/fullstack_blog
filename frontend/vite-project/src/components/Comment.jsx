import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Comment() {
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const { blogId } = useParams();
    
    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await axios.get(`http://localhost:5000/blog/comment/${blogId}`);
                setComments(response.data);
            } catch (error) {
                console.log('Error fetching comments:', error);
            }
        }
        fetchComments();
    }, [blogId]);

    const token = localStorage.getItem('authorisation');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/blog/comment/${blogId}`, 
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

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-5xl bg-white rounded-lg border p-2 ml-5 mt-20">
                <div className="px-3 mb-2 mt-2">
                    <textarea
                        placeholder="comment"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full bg-gray-100 rounded border border-gray-400 h-20 py-2 px-3 font-medium placeholder-gray-700"
                    ></textarea>
                </div>
                <div className="flex px-4">
                    <button type="submit" className="px-2.5 py-1.5 rounded-md text-white text-sm bg-blue-700 hover:bg-blue-600">
                        Comment
                    </button>
                </div>
            </form>
            
           
            <div className="mt-5 ml-5">
                {comments.map(comment => (
                    <div key={comment.blogId} className= "max-w-sm bg-gray-200 rounded-lg p-2 my-1">
                        <p>{comment.content}</p>
                    
                        <p>{comment.createdAt}</p>
                        
                    </div>
                ))}
            </div>
        </>
    );
}

export default Comment;
