
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import profileImage from "../constence/images.jpeg"

function MainHeader(props) {
 

  const handleLogout = () => {
   props.logout()
  };

 
  return (
    <div className="w-full  ">
      <div className='w-full flex justify-center shadow-md bg-white fixed z-50'>
    
      <nav className=" flex justify-between h-[60px] w-[95%]    items-center  ">
        
          <div className="logo hidden sm:block">Logo</div>

        <form className="flex border-2 w-[40%] rounded-md focus-within:border-blue-600 shadow-sm md:w-[300px]">
          <input  type="text" className='  focus:outline-none p-2 w-[90%]  '></input>
          <button className="  onFocus={() => background(false)} p-2 text-xl transition-all hover:text-blue-800" type="submit"><FaSearch /></button>
        </form>

        

         

        <ul className="flex justify-center items-center gap-5 w-[50%] ">
          <li><NavLink to="/"><div className=" flex flex-col justify-center items-center w-full h-full"><span className='text-2xl'>< IoHomeSharp /></span> <span className="text-[13px] hidden md:block">Home</span></div></NavLink></li>
          <li><NavLink to="/my-network"><div className=" flex flex-col justify-center items-center "><span className='text-2xl'><FaUserFriends /></span><span className="text-[13px] hidden md:block ">Network</span></div></NavLink></li>
          <li><NavLink to="/notifications"><div className=" flex flex-col justify-center items-center" ><span className='text-2xl'><IoNotifications /></span><span className="text-[13px] hidden md:block">Notification</span></div></NavLink></li>
          <li><NavLink to="/me"><div className='flex  flex-col items-center'><span className='w-6 h-6 rounded-full block '><img src={props.user?.profilePictureUrl || profileImage} className="object-cover h-full w-full rounded-full  "></img></span> <span className='text-[13px] hidden md:block'>Me</span></div></NavLink></li>
          <li><button className="blue-btn text-sm" onClick={handleLogout}>Log Out</button></li>
        </ul>

       

      </nav>  
      </div>
      <Outlet />
    </div>
  );
}


export default MainHeader;