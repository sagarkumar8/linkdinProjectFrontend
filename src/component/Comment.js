
import React from "react";
import Linkify from 'react-linkify';
import profileImage from "../constence/images.jpeg"

function Comment(props)
{
    return<div  className="p-5 flex gap-4 items-start   ">
        <div className="w-[40px] h-[40px] border-2 rounded-full">
            <img src={props?.commentData?.userDto?.profilePictureUrl || profileImage} className="object-cover h-full w-full rounded-full "></img>
        </div>
        <div className="flex flex-col gap-2 w-[90%]">
            <div className="w-full ">
                <h3 className="text-sm font-bold">{props?.commentData?.userDto?.name}</h3>
                <p className="text-sm text-gray-500">{props?.commentData?.userDto?.headline}</p>
            </div>
            <div className=" w-full">
                <p className="leading-5 text-[16px]">
                    <Linkify>
                    {props.commentData.commentContent}
                    </Linkify>
                    
                </p>
            </div>
        </div>
    </div>
}

export default Comment;