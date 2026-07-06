import React, { useState } from "react"
import { GiHomeGarage } from "react-icons/gi";
import { Form } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";



const CreatePostSection = (props)=>{


   const [content, setContent] = useState("");
    const [postFile, setPostFile] = useState(null);

    const [createPost,setCreatePost]=useState(false)


    

    


    function fileChangeHandler(event) {
        const file = event.target.files[0];
        if (file) {
            setPostFile(file);
        }
    }

  

  async  function submitHandler(event)
    {
      event.preventDefault();
      if (!content.trim() && !postFile) {
        alert("Please write something or select a file.");
        return;
    }

       props.createPost(content,postFile);
        console.log (content)
        console.log(postFile)
        setCreatePost(false)

    }

    
    return (
        <div className="p-4 relative border-2 shadow-md rounded-md">
            <div className="flex justify-between ">
                <h3 className="text-xl font-bold text">Activity</h3>
                <button type="button" className="blue-btn" onClick={()=>{setCreatePost(true)}}>Create a post</button>
                { createPost &&
                    
                    <div className="absolute top-[-300px]  min-w-full h-[400px] bg-white p-2 z-10 border-2 rounded-md shadow-lg">

                        <div className="w-full flex justify-end">
                        <button type="button" 
                        onClick={(e)=>{setCreatePost(false)}}
                        className="border-2 p-1 red text-red-500 "
                        ><RxCross2 /></button>
                        

                        </div>
                        
                        <form onSubmit={submitHandler}>
                            <div>
                            <textarea
                            placeholder="What do you want to talk about"
                            className="border-2 w-full  " 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            
                            ></textarea>

                            <input 
                            type="file"
                            accept="image/*, video/*"
                            onChange={fileChangeHandler}
                            ></input>

                           </div>
                           <button type="submit" 
                           className="button"
                           >Post</button>
                            
                        </form>
                    </div>
                
              
                
               

                }

            </div>

        </div>
    
    )

}

export default CreatePostSection;






// {/* 📸 Sirf Images ke liye (.jpg, .png, .jpeg etc.) */}
// <input type="file" accept="image/*" onChange={fileChangeHandler} />

// {/* 🎥 Sirf Videos ke liye (.mp4, .mkv, .mov etc.) */}
// <input type="file" accept="video/*" onChange={fileChangeHandler} />

// {/* 🛠️ Agar strictly batana ho ki sirf PNG aur PDF chahiye */}
// <input type="file" accept=".png, .pdf" onChange={fileChangeHandler} />


// size check karne ke liee predefine method nhi hai khud se code karna hoga