import React from "react";
import Connections from "./Connections";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Request from "./Request";


function MyNetwork()
{ 
     const [suggestions, setSuggestions] = useState([]);
     const [page, setPage] = useState(0);
     const [isLastPage, setIsLastPage] = useState(false);


     const [requests, setRequests] = useState([]);
     const [requestPage, setRequestPage] = useState(0); 
     const [isRequestLastPage, setIsRequestLastPage] = useState(false);

    

     async function loadSuggestion(pageNumber) {
        try {
            const response = await axios.get(`http://localhost:8080/connection/suggestions?page=${pageNumber}`);
            console.log("Suggestions Data:", response.data);
            
            const newData = response.data.content;

            if (pageNumber === 0) {
                setSuggestions(newData);
            } else {
                setSuggestions((prev) => [...prev, ...newData]);
            }

            setIsLastPage(response.data.last); 

        } catch (error) {
            console.log("Suggestion error", error.response);
        }
     }




     async function fetchReceivedRequests(pageNumber) {
         try {
             const response = await axios.get( `http://localhost:8080/connection/requests/received?page=${pageNumber}`);
            
             const newData = response.data.content;
             console.log("responce",response)

             if (pageNumber === 0) {
                 setRequests(newData);
             } else {
                 setRequests((prev) => [...prev, ...newData]); 
             }

             setIsRequestLastPage(response.data.last); 
         } catch (error) {
             console.error("Received requests fetch karne me error:", error);
         }
     }


     async function handleAcceptRequest(slug) {
         try {
             await axios.post(`http://localhost:8080/connection/accept/${slug}`);
             

             setRequests((prev) => prev.filter((item) => item.slugPublicId !== slug));
             alert("Connection Request Accepted!");
         } catch (error) {
             console.error("Accept API call me dikkat aayi:", error);
         }
     }

     async function handleRejectRequest(slug) {
         try {
             await axios.post(`http://localhost:8080/connection/reject/${slug}`);
             
             
             setRequests((prev) => prev.filter((item) => item.slugPublicId !== slug));
             alert("Connection Request Ignored.");
         } catch (error) {
             console.error("Reject API call me dikkat aayi:", error);
         }
     }







        useEffect(() => {
        loadSuggestion(page);
         }, [page]);

         useEffect(() => {
         fetchReceivedRequests(requestPage); 
         }, [requestPage]);



         const handleViewMore = () => {
        setPage((prevPage) => prevPage + 1);
        };


        const handleViewMoreRequests = () => {
         setRequestPage((prevPage) => prevPage + 1);
        };

       console.log("suggesion",suggestions)
       console.log("request",requests)




    return(
        <div className="mt-[80px]">
            <div className="w-full h-full flex justify-center gap-5   ">
                    <div className="w-[20%] border-2 shadow-md "></div>

                    <div className="w-[60%] flex flex-col bg-white gap-5 mt-5">


                            <div className=" flex flex-col gap-3 justify-center items-center ">
                                {
                                    requests.map((request,index)=>{
                                      return  <Request key={index}
                                                      request={request}
                                                      onAccept={handleAcceptRequest} 
                                                      onReject={handleRejectRequest}
                                                      
                                                      ></Request>
                                    })
                                }

                                     {!isRequestLastPage && requests.length > 0 && (
                                                            <button 
                                                                type="button"
                                                                onClick={handleViewMoreRequests}
                                                              > View More </button>
                                                            )
                                     }

                                     {isLastPage &&  (
                                        <p className="text-gray-400 text-sm mt-4">No more suggestions available.</p>
                                        )
                                    }

                                                        

                                                      
                             
                            </div>



                            <div className=" w-full" >

                                 <div className="w-full flex flex-wrap p-2 justify-center items-center gap-3  border-2 shadow-md">
                                                        {suggestions.map((person,index) => (
                                                            // Hum ek unique key ke liye index ya person.id ka use kar sakte hain
                                                            <Connections key={index} person={person} />
                                                        ))}


                                                            {!isLastPage && suggestions.length > 0 && (
                                                            <button 
                                                                onClick={handleViewMore}
                                                                className="mt-4 px-5 py-2 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all duration-200"
                                                            >
                                                                View More
                                                            </button>
                                                            )}

                                                        {isLastPage && suggestions.length > 0 && (
                                                            <p className="text-gray-400 text-sm mt-4">No more suggestions available.</p>
                                                            )}
                                                
                                 </div>
                            </div>
                    </div>

         </div>
        
     </div>
    )
}

export default MyNetwork;
