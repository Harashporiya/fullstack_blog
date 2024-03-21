import React from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
       
        Cookies.remove("authorisation");
       
        navigate("/login");

        toast.info("Logout succesfull", {
            position: "top-right"
          });
      };
  return (
    <>
      <button onClick={handleLogout()} className='type="submit" className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700'>Logout</button>
      <div>
      <ToastContainer />
      </div>
    </>
  )
}

export default Logout
