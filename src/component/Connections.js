import axios from "axios"
import React from "react"
import { useState } from "react";

const Connections = (props)=>{

const [isRequested, setIsRequested] = useState(props.person.isRequested || false);

 async function sendRequest(slugPublicId)
 {    
   
     try{  const response= await axios.post(`http://localhost:8080/connection/request/${slugPublicId}`)
      console.log(response);
      setIsRequested(true)
     }catch(error)
     {
        console.log("Backend ka message:", error.response?.data);
        
         
     }

 }



    async function handleConnectClick()
    { 
       if(!isRequested) {
         await sendRequest(props.person.slugPublicId)
       }
      
    }




    return <div>

       <div className="border-2 w-[170px] h-[250px] p-2 flex flex-col justify-start items-center gap-2 shadow-md">
          
          <div className="flex flex-col justify-center items-center gap-1 ">

             <div className="h-[90px] w-[90px] border-2 rounded-full ">
            <img></img>
            </div>
            <div className="w-full h-[100px] flex flex-col gap-1 justify-start items-center  ">
               <h2 className="text-xl font-bold">{props.person.name}</h2>
               <h3 className="text-sm leading-none">{props.person.headline} </h3>
             </div>
               <button 
               className="blue-btn"
               onClick={handleConnectClick}

               >{isRequested ? "request send":"connect"}</button>

            


          </div>
         
       </div>

    </div>

}

export default Connections