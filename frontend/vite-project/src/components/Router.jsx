import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import AddBlog from './AddBlog'
import Blog from './Blog'
function Router() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
        <Route path='/addblog' element={<AddBlog/>} />
        <Route path='/blog' element={<Blog/>}/>
     </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router
