import React from 'react'
import { useNavigate } from 'react-router-dom'

export const AdminBase = () => {
    const navigate = useNavigate();
  return (
    <body className='bg-rose-10'>
    <div className='flex justify-evenly items-center pt-24'>
      <button  onClick={() => navigate('/adminpast')}className='m-4 h-64 w-64 border-none border-2 rounded-md shadow-xl bg-teal-500 text-center text-white p-6 cursor-pointer font-bold font-sans hover:shadow-teal-800/40'><hr />Past Events</button>
      <button  onClick={() =>navigate('/adminlive') } className='m-4 h-64 w-64 border-none border-2 rounded-md shadow-xl bg-teal-500 text-center text-white p-6 cursor-pointer font-bold font-sans hover:shadow-teal-800/40'><hr />Live Events</button>
      <button  onClick={() => navigate('/adminhome')}className='m-4 h-64 w-64 border-none border-2 rounded-md shadow-xl bg-teal-500 text-center text-white p-6 cursor-pointer font-bold font-sans hover:shadow-teal-800/40'><hr />Add New Event</button>
    </div>
    </body>
  )
}
