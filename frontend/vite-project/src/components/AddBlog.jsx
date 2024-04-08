import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddBlog() {
  const [descreption, setDescreption] = useState("");
  const [userData, setUserData] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImageURL, setCoverImageURL] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("authorisation");
        // console.log(token);
        const response = await axios.get("http://localhost:5001/user/data", {
          headers: { authorisation: token },
        });
        setUserData(response.data);
        //  console.log(response.data)
      } catch (error) {
        navigate("/login");
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const token = Cookies.get("authorisation");
      const response = await axios.post(
        "http://localhost:5001/blog/add-new",
      
        {
          descreption,
          title,
          body,
          coverImageURL,
        },  {
          headers: { authorization: `Bearer ${token }` },
        },
      );
      toast.info("Create Blog  Successfully", { position: "top-right" });
      // console.log(response.data);
      setTimeout(() => {
        navigate("/home")
      },6000);
      setTitle("");
      setDescreption("");
      setBody("");
      setCoverImageURL("");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-sky-900 p-16  rounded-2xl shadow-2xl w-2/3">
          <h2 className="text-3xl font-bold mb-10 text-gray-100">Add Blog</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block mb-1 font-bold text-gray-100"
                htmlFor="title"
              >
                Title
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label
                className="block mb-1 font-bold text-gray-100"
                htmlFor="descreption"
              >
                Description
              </label>
              <input
                onChange={(e) => setDescreption(e.target.value)}
                type="text"
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label
                className="block mb-1 font-bold text-gray-100"
                htmlFor="body"
              >
                Body
              </label>
              <input
                onChange={(e) => setBody(e.target.value)}
                type="text"
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label
                className="block mb-1 font-bold text-gray-100"
                htmlFor="coverImageURL"
              >
                Cover Image URL
              </label>
              <input
                onChange={(e) => setCoverImageURL(e.target.value)}
                type="url"
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-600"
              />
            </div>

            <button
              onChange={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-lg px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddBlog;
