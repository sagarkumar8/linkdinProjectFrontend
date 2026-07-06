import React from "react";
import { BsThreeDots } from "react-icons/bs";
import profileImage from "../constence/images.jpeg"

function Notification (props)
{
   return(
      <div className="w-full   ">
        <div className="p-3 w-full flex items-start justify-center gap-3 border-b-2 ">
            <div className="w-[50px] h-[50px] border-2 rounded-full">
                <img src={props.notification.senderPhotoUrl || profileImage  } className="h-full w-full object-cover rounded-full "></img>

            </div >

            <div className=" w-[450px]  ">
               
               <p className=" leading-none text-sm"><span className="text-xl ">{props.notification?.senderName}</span> {props.notification?.content}  </p>
               
            </div>
            <div>
                    <button type="button" className="text-2xl"><BsThreeDots />
                    </button>
            </div>
        </div>
      </div>

   )
}

export default Notification;