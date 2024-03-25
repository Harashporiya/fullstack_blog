import React from 'react'
import Navbar from './Navbar'
import './index.css'
function About() {
  return (
    <>
    <Navbar/>
      <div className='bg-gray-900 min-h-screen p-32'>
        <div  className=' bg-sky-900 p-10 rounded-xl font-medium text-white'>
        
        <h1>About DEV</h1>
        <p className='text-2xl'>DEV is a community of software developers getting together to help one another out. The software industry relies on collaboration and networked learning. We provide a place for that to happen.</p>

        <p className='text-2xl pt-9'>DEV is built on Forem: open source software designed to empower communities. Because our application is open source, you can inspect every little detail of the code, or chip in yourself! Forem is available for anyone interested in creating similar communities in any niche or passion. Visit our meta Forem, forem.dev for more information.</p>

        <p className='text-2xl pt-9'>We believe in transparency and adding value to the ecosystem. We hope you enjoy poking around and participating!</p>

        <h1 className='pt-4'>Leadership</h1>

        <img className='rounded-xl' src='https://res.cloudinary.com/practicaldev/image/fetch/s--c4zTsjvv--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://res.cloudinary.com/practicaldev/image/fetch/s--S2Ud7coR--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/0r746whbdtl8uvs98uah.JPG' alt=''/>
        <h1 className='pt-4'>Team</h1>
        <img className='rounded-xl' src='https://res.cloudinary.com/practicaldev/image/fetch/s--QmM9l7t1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://i.imgur.com/d6ZM27K.jpg' alt=''/>

        <p className='pt-9 text-2xl'>Our team is distributed around the world. We have no office, but we come together online each day to build community and improve the software careers of millions.</p>

        <p className='pt-9 text-2xl'>Happy coding ❤️</p>
        </div>
      </div>
    </>
  )
}

export default About
