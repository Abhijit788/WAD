import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { logoutRoute } from '../utils/APIRoutes';
export const Home = () => {
  const navigate=useNavigate();
  const handleclick=async()=>{
    
    const {data} = await axios.post(logoutRoute,{}, {withCredentials:true});
    if(data.status===false){
      console.log(data.msg);
    }
    else{
      navigate("/test");
    }
  }
  return (
    <>
    <header className="p-4 bg-gray-800 text-gray-100">
	<div className="container flex justify-between h-16 mx-auto">
		<a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
			 
		</a>
		<ul className="items-stretch hidden space-x-3 lg:flex">
			<li className="flex">
				<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-violet-400 border-violet-400">Link</a>
			</li>
			<li className="flex">
				<a rel="noopener noreferrer" href="/Login" className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Link</a>
			</li>
			<li className="flex">
				<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Link</a>
			</li>
			<li className="flex">
				<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Link</a>
			</li>
		</ul>
		<div className="items-center flex-shrink-0 hidden lg:flex">
		<Link to="/Signup">
			<button className="self-center px-8 py-3 rounded">Sign up </button>
			</Link>	
			<Link to="/Login">
      <button className="self-center px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900"> Login   </button>
	  </Link>
		</div>
		<button className="p-4 lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-100">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</button>
	</div>
</header>
    </>
  )
}
