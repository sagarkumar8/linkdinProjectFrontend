
import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import CreatePostSection from "./CreatePostSection";
import Post from "./Post"



const Me = (props)=>{

    console.log("me post ",props.userPost)
 
    

    return <div>
       
       <div className="w-full h-full flex justify-center gap-5">
           <div className="w-[55%] flex flex-col gap-4">
            <Profile user={props.user} updateData={props.updateData}></Profile>
            <CreatePostSection createPost={props.createPost} userPost={props.userPost}></CreatePostSection>
            {
                props.userPost === null ?
                (
                    <div>
                        <h1>loadding...</h1>
                    </div> 
                ):  props.userPost.length > 0 ?
                      (  
                         props.userPost.map((post) => {
                         return <Post key={post.id} postData={post} user={props.user}></Post>;
                        } ) 
                     ) : 
                    
                    (
                        <div className=" flex flex-col items-start p-4 border-2 rounded-md shadow-sm">
                           <h3 className="text-xl font-bold">You haven’t posted yet</h3>
                           <p> Posts you share will be displayed here.</p>

                        </div>
                    )
                    

                
            }
           
           </div>
           <div className="w-[20%] border-2 rounded-md shadow-md"></div>
       </div>
       







    </div>
} 

export default Me
