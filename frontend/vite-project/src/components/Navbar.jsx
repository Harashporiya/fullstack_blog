import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import './index.css'

function Navbar() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>


      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 ">
   
            <span><img className='w-16' src='https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png' alt=''/></span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 ">
            <div className='space-x-6'>
              <button id='signup' onClick={() => navigate("/signup")} type="button" className=" text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-lg px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">SignUp</button>

              <button id="login" onClick={() => navigate("/login")} type="button" className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-lg px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Login</button>
             
            </div>
            <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100  dark:text-gray-400 dark:hover:bg-gray-700 " >
              <span className="sr-only">Open main menu</span>



              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <svg className="w-20 h-8 dark:text-blue-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
               

                <MenuItem onClick={() => { handleClose(); navigate("/home"); }}>Home</MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate("/about"); }}>About</MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate("/addblog"); }}>Add Blog</MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate("/blog"); }}>Blog</MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate("/signup"); }}>Signup</MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate("/login"); }}>Login</MenuItem>
              </Menu>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8  md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <button onClick={() => navigate("/home")} className="text-lg  block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white" >
                Home
              </button>
              <button  onClick={()=>navigate("/about")} className="text-lg block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white">
                About
              </button>
              <button onClick={() => navigate("/addblog")} className="text-lg block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white">
                Add Blog
              </button>
              <button onClick={() => navigate("/blog")} className="text-lg  block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white">
                Blog
              </button>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar
