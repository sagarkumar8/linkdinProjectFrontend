import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Post from "./Post";
const Home = (props)=>{


         const [homePost, setHomepost] = useState(null);
                 const [page, setPage] = useState(0);
                 const [isLastPage, setIsLastPage] = useState(false);

        

     async function homePostfeed(pageNumber) {
        try {
            const response = await axios.get(`http://localhost:8080/posts/core/feed?page=${pageNumber}`);
            console.log("Suggestions Data:", response.data);
            
            const newData = response.data.content;

            if (pageNumber === 0) {
                setHomepost(newData);
            } else {
                setHomepost((prev) => [...prev, ...newData]);
            }

            setIsLastPage(response.data.last); 

        } catch (error) {
            console.log("notification error", error.response);
        }
     }

       useEffect(() => {
                  homePostfeed(page);
                   }, [page]);
     
                   console.log("home post",homePost)
             
           const handleViewMore = () => {
             setPage((prevPage) => prevPage + 1);
             };

             
     
        

      









    return <div className="w-full flex gap-5 justify-center items-start mt-5">

        <div className="h-[200px] w-[200px] border-2"></div>
        <div className="w-[700px]  flex justify-center items-center flex-col ">


            {  homePost === null ? <div className="custom-loader"> </div> :homePost.length > 0 ?

               <div className="w-full flex flex-col gap-5 ">

                        {   homePost.map((post)=>{ let user;
                                                    {    post.creatorName==="SELF"? user={name:props.user.name,headline:props.user.headline,profilePictureUrl:props.user.profilePictureUrl }:
                                                        user={name:post.creatorName,headline:post.creatorHeadLine,profilePictureUrl:post.creatorProfilePictureUrl}
                                                    }
                                                    const   postData={content:post.content,postFileUrl:post.postFileUrl,id:post.id ,postLikedByMe:post.postLikedByMe}
                                                    return <Post user={user} postData={postData}></Post>

                                                    })

                            }

                            {!isLastPage && homePost.length > 0 && (<button type="button" onClick={handleViewMore}> View More </button>)
                            }

                            {isLastPage &&  (<p className="text-gray-400 text-sm mt-4">No more post available.</p> ) }
                        
              </div>

                : <div> not post available</div>


             }

         </div>
        <div className="w-[300px] h-[300px] border-2" ></div>
        
    </div>
}

export default Home;