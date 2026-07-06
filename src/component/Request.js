import React from "react";


function Request(props)
{
    return <div className="w-full border-2 rounded-md shadow-md">


            <div className="h-[90px]  p-2 flex justify-center gap-3 ">
             
                <div className="h-[70px] w-[70px] border-2 rounded-full"></div>
                <div className="w-[60%] flex flex-col gap-1">
                    <h2 className="text-2xl">{props.request.name}</h2>
                    <h3 className="text-sm flex  leading-none">  {props.request.headline}</h3>
                </div>
                <div className="flex justify-center items-center gap-5">
                 <button 
                 className="blue-btn"
                 onClick={() => props.onAccept(props.request.slugPublicId)}
                 >accept</button>
                 <button 
                 className="blue-btn"
                 onClick={() => props.onReject(props.request.slugPublicId)}
                 >reject</button>
                </div>

             
                
                
            </div>
    </div>

}

export default Request