

import React, { useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

function Login (props)
    {
        const [loginData,setLoginData]=useState({email:"",password:""})
        const [errorMessage, setErrorMessage] = useState("");
        const navigate = useNavigate();


       async function submitHandler(event)
        { 
           
             event.preventDefault();
          const result = await props.login(loginData) 
          if (!result.success){ setErrorMessage(result.massage); } 

       }


       

        function signupHandler(event)
        {
            event.preventDefault();
            navigate('/signup')

        }


        const handleGoogleLoginSuccess = useGoogleLogin({

                    onSuccess : async (authResult) => { 

                        try {

                            const authorizationCode = authResult.code;
                            console.log("Google Auth Code Received:");

                            const response = await axios.get(`http://localhost:8080/api/auth/google/callback`, {
                            params: { code: authorizationCode }
                            });
                            console.log("Backend Response:", response.data);
                            window.location.reload();
                                    
                        } catch (error) {
                            console.error("Backend validation failed:", error);
                          setErrorMessage("Google Auth failed at backend");
                            
                        }
                    
                     
                    
                    },

                  onError : (error) => {
                     console.error("Google Login Failed:", error);
                     } ,

                  flow: "auth-code"
                
                
                })





        function changeHandler(event)
        {
            const {name,value,type}=event.target;

            setLoginData(prevLoginData =>{
                return{
                    ...prevLoginData,
                    [name]:value
                }
            })

           if (errorMessage) {
            setErrorMessage('');
        }

        }

    return(
     <div className="mt-[50px] w-full ">
        <div className=" p-10 flex  flex-col w-[40%]  gap-5 ">

            <h2 className="text-3xl font-bold"> Login Page</h2>

            <form className="flex flex-col gap-5" onSubmit={submitHandler}> 
                
                <div>
                    <label htmlFor="useremail" className="text-xl">email</label>
                    <input className="form-input "
                            type="text" 
                            name="email" 
                            id="useremail"
                            inputMode="email"       
                            autoComplete="email"
                            onChange={changeHandler} 
                            value={loginData.email}></input>

                </div>

                <div>
                    <label htmlFor="userpassword" className="text-xl">password</label>
                    <input className="form-input" 
                        type="password" 
                        name="password" 
                        id="userpassword" 
                        onChange={changeHandler} 
                        value={loginData.password}></input>
                </div>
                

                <div className="w-full ">
                       <button className="button w-full  " type="submit" > Login</button>
                </div>
             
                
                 
                       <span className="flex items-center justify-start text-red-500 ">{errorMessage}</span>
                 
                       
                

                
                
            </form>

                  

                
                <button className="  flex justify-center items-center gap-3" type="button" onClick={signupHandler} > Don't have an account? <span className="text-blue-600">signup</span></button>
                


                 <div className="w-full  flex gap-5 items-center justify-center">
                    <span className=" w-[40%] border-b-2 block"></span>
                    <span> or</span> 
                     <span className=" w-[40%] border-b-2 block"></span>
                 </div>          


                  <button className=" border-2 flex items-center justify-center gap-3 p-2 rounded-md shadow-sm" type="button" onClick={() => handleGoogleLoginSuccess()}>
                      <span className="text-2xl"><FcGoogle /></span>  Continue with Google 
                    </button>
             
        </div>
       

      </div>  
    )
}


export default Login;