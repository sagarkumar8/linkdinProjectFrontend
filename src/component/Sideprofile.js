import React from "react";
import defaultCover from "../constence/default-cover.png"
import profileImage from "../constence/images.jpeg"

 function SideProfile(props)
{
    return <div className="border-2 rounded-md shadow-md bg-white">
        <div className="  h-[100px] relative">
            <div className=" h-[50px]">
                <img src={props?.user || defaultCover} className="h-full w-full object-cover "></img>
            </div>
             <div className="h-[70px] w-[70px]  rounded-full absolute bottom-0 left-2 bg-white">
                <img src={props?.user || profileImage} className="object-cover h-full w-full rounded-full p-[2px]"></img>
             </div>
        </div>
        <div className="p-3 mb-3 ">
            <h1 className="text-xl font-bold">sagar ARYAN</h1>
            <p className="text-xs leading-4  ">this is my heading if you want to say smohskfj jsdfj </p>
            <p className="text-xs text-gray-500 font-bold">bhopal gaya</p>
        </div>
        
    </div>

}

export default SideProfile;