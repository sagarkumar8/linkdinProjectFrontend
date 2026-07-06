import React from "react";
import Linkify from 'react-linkify';
import profileImage from "../constence/images.jpeg"
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { TbLocationShare } from "react-icons/tb";
import { BsSendFill } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";

const Post = (props)=>{

    const [commentContent,setCommentContent]=useState("");
    const [isComment,setIsComment]=useState(false)
    const [liked, setLiked] =  useState(props.postData.postLikedByMe);
  
   async function likeHandler(e)
    {
         const isChecked = e.target.checked
         setLiked(isChecked);

       try {
            if (isChecked) {
                
                console.log("liked")
                
               await axios.post(`http://localhost:8080/posts/likes/${props.postData.id}`);
                console.log("Post liked successfully");
            } else {
                console.log("unlike")
                await axios.delete(`http://localhost:8080/posts/likes/${props.postData.id}`);
                
            }
           } catch (error) {
            console.error("API failed, reverting state:", error);
            setLiked(!isChecked); // Agar API fail ho jaye toh purani state wapas set ho jayegi
           }
    }


    return (
    <div className="border-2 rounded-md shadow-md ">

        <div className=" flex  gap-2 p-3 ">
                        <div className="h-[50px] w-[50px] border-2 rounded-full">
                            <img src={props.user.profilePictureUrl || profileImage} className="object-cover h-full w-full rounded-full "></img>
                        </div>
                        <div>
                            <span className="text-xl font-semibold "> {props.user?.name}</span>
                            <p className=" leading-none text-sm text-gray-500"> {props.user?.headline} </p>
                        </div>
        </div>




        <div className="flex flex-col items-start py-1  gap-3   ">
                        <p className="px-4 text-s text-start leading-[18px] " >
                            <Linkify>
                            {props.postData?.content}
                            </Linkify>

                        
                        </p>
        
                        {  props.postData?.postFileUrl && (
                                <div className=" flex justify-center items-center w-full  max-h-[450px] border-2"
                                    >
                                        <img src={props.postData.postFileUrl}
                                        alt="Post Image"
                                        className=" w-full h-full  object-center object-contain block"
                                        ></img>
                            
                                </div>

                            )
                        }


                        <div className=" w-full flex gap-5 p-2  items-center  ">
                            <div className="flex gap-2 items-center justify-center">
                                
                                    <div className="relative"> 
                                        <input className=" w-5 h-6 opacity-1 absolute opacity-0 cursor-pointer z-10 " 
                                            type="checkbox"
                                            checked={liked}
                                            onChange={likeHandler} >

                                        </input>
                                        <div
                                            className={`text-2xl ${
                                            liked ? "text-blue-600" : "text-gray-500"
                                            }`}
                                            >
                                            <BiLike />
                                        </div>
                                    </div>
                                     <span className="text-[14px] block text-gray-600 font-bold">234</span>
                            </div>
                            <button  className="text-xl text-gray-500" onClick={()=>setIsComment(!isComment)}> <FaRegCommentDots /></button>
                             <button  className="text-xl text-gray-500"> <TbLocationShare /></button>

                        </div>
                   
        </div>
        { isComment &&(
         <div className=" p-1"> 
            <form className=" flex gap-3 justify-center ">
                <div className="h-[40px] w-[40px] border-2 rounded-full">
                    <img src={profileImage} className="object-cover h-full w-full rounded-full "></img>
                </div>
                <div className=" flex p-1 flex-col w-[90%] border-2 border-gray-400 rounded-3xl  ">
                    <textarea 
                        className=" flex text-sm px-5  focus:outline-none  rounded-3xl   resize-none "
                        rows={1}
                        value={commentContent}
                        onChange={(e)=>setCommentContent(e.target.value)}
                         onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                        }}> 
                    </textarea>

                    {commentContent.trim() && (
                        <div  className="flex justify-between  p-2 px-5">
                        <div></div>
                        <button type="submit" className=" p-1 text-lg text-blue-700"> <BsSendFill /></button>
                    </div>
                    )
                    }
                </div>
               
                
            </form>


        </div>)
      }





       
    </div>
    )
}


export default Post;