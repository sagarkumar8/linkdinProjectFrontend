
import React from "react";
import Notification from "./Notification";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Notifications = ()=>{

         const [notifications, setnotifications] = useState(null);
         const [page, setPage] = useState(0);
         const [isLastPage, setIsLastPage] = useState(false);


     async function loadSuggestion(pageNumber) {
        try {
            const response = await axios.get(`http://localhost:8080/notifications?page=${pageNumber}`);
            console.log("Suggestions Data:", response.data);
            
            const newData = response.data.content;

            if (pageNumber === 0) {
                setnotifications(newData);
            } else {
                setnotifications((prev) => [...prev, ...newData]);
            }

            setIsLastPage(response.data.last); 

        } catch (error) {
            console.log("notification error", error.response);
        }
     }

      useEffect(() => {
             loadSuggestion(page);
              }, [page]);

              console.log("notifications",notifications)
        
      const handleViewMore = () => {
        setPage((prevPage) => prevPage + 1);
        };

     





    return <div className="w-full  flex justify-center  items-center">

        <div className="flex gap-5 items-start justify-center   ">
            <div className="border-2 w-[225px] h-[250px] rounded-md shadow-md">
              
            </div>
            <div className=" w-[600px] border-2 flex flex-col items-center rounded-md">
                     
                {    notifications===null ?<div className="custom-loader"></div> : notifications.length > 0 ? 
                  <div>  {
                        notifications.map((notification,index)=>{
                            return <Notification  key={index}
                                            notification={notification}  >

                                            </Notification>   
                                   
                        })
                        }

                            {!isLastPage && notifications.length > 0 && (
                                                <button 
                                                    type="button"
                                                    onClick={handleViewMore}
                                                    > View More </button>
                                                )
                            }

                                {isLastPage &&  (
                                <p className="text-gray-400 text-sm mt-4">No more Notification available.</p>
                                )
                            }

                </div>  : <div> no notifivation available</div>
                
                }  
            </div>
             <div className="border-2 w-[300px] h-[400px] rounded-md shadow-md">
                
            </div>
        </div>

        
      
        
    </div>
} 

export default Notifications;