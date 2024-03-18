import React from 'react'
import Navbar from './Navbar'
function AddBlog() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900">

        <div className="bg-white p-16 rounded-2xl shadow-2xl w-2/3">

          <h2 className="text-3xl font-bold mb-10 text-gray-800">Add Blog</h2>

          <form className="space-y-5">

            <div>
              <label className="block mb-1 font-bold text-gray-500">Title</label>
              <input type="text" className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-600" />
            </div>

            <div>
              <label className="block mb-1 font-bold text-gray-500">Body</label>
              <input type="text" className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-600" />
            </div>



            <button className=" text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-lg px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Submit</button>

          </form>

        </div>

      </div>
    </div>
  )
}

export default AddBlog;
