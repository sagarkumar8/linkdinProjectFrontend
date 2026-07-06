import logo from './logo.svg';
import {Routes,Route} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import Login from './component/Login';
import { useState } from 'react';
import MainHeader from './component/MainHeader';
import Home from './component/Home';
import Support from './component/MyNetwork';
import Me from './component/Me';
import NotFound from './component/NotFound';
import Signup from './component/Signup';
import { useEffect } from 'react';
import axios from 'axios'
import MyNetwork from './component/MyNetwork';
import Notifications from './component/Notifications';


//  SABSE ZAROORI: Axios ko har request me cookies handle karne ki permission dein
axios.defaults.withCredentials = true;

function App() 
{
 
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState(null);
   const [userPost,setUserPost] = useState(null);
   

   
   async function signup(data)
    { 
                 
        
        try{
                 const signUpResponce = await axios.post("http://localhost:8080/auth/signup",data,
                                { headers: { "Content-Type": "application/json" }  });
                  
                                
                  
                  return{success:true}
                  
        
           }  catch(error){  console.log("signupp api call nhi huaa")
                            const errorMsg = error.response?.data?.massage
                            setLoading(false)
                            return{success:false,message:errorMsg}
                          }

    }


    async function login(data) {

           
       try {
          
                const loginResponse = await axios.post("http://localhost:8080/auth/login", data, {
                                headers: { "Content-Type": "application/json"  } });

           console.log("Backend Response:", loginResponse.data);
            setIsLoggedIn(true); 
            userData();
            return{success:true}

       } catch (error) {
           console.log("Login Error:", error.response?.data || error.message);
           const errorMsg = error.response.data.massage

           setLoading(false);
           return{success:false,massage:errorMsg}
       }finally{setLoading(false)}
       
      }


     
  
   useEffect(() => {
       async function checkAuthentication() {
           try {
               const r = await axios.get("http://localhost:8080/auth/validate-token-or-profile");
               
                console.log(r)
               setIsLoggedIn(true);
               await userData();
           } catch (error) {
               // Agar 401 Unauthorized aaya, matlab cookie nahi hai ya expire ho gayi
               setIsLoggedIn(false);
           } finally {
               setLoading(false); // Checking khatam
           }
       }
       
       checkAuthentication();
   }, []);


   


   // Agar app abhi check kar rahi hai, toh ek loading screen dikhao
   if (loading) {
       return <div>Loading Your Session...</div>;
   }


   async function logout() {
    setLoading(true); 
    try {
        
        const response = await axios.post("http://localhost:8080/auth/logout");
        console.log(response.data.message);
        setIsLoggedIn(false); 
    } catch (error) {
        console.log("Logout karne me error aaya:", error);
    } finally {
        setLoading(false);
    }
    }


    async function userData()
    {
          try { const response = await axios.get("http://localhost:8080/user")
                setUser(response.data)
                allPosts()
            
          } catch (error) {
            console.log(error);
            
          }


    }



    async function updateData(data)
    {
          try { const response = await axios.put("http://localhost:8080/user" , data , {
                                headers: { "Content-Type" : "application/json"  } })

                setUser(response.data)
                console.log("update")
            
          } catch (error) {
            console.log(error);
            console.log("update error")
            
          }


    }



    async function createPost (content, selectedFile) {
    // 1. Ek FormData ka khali dibba banaya
    const formData = new FormData();
    // 2. Usme text data aur file dono daal diye
    formData.append("content", content);
    if (selectedFile) {
        formData.append("postFile", selectedFile); // 🔥 Sahi naam (key) jo Spring Boot DTO me hai
    }

    try {
        // 3. API hit karte waqt header badal diya
        const response = await axios.post("http://localhost:8080/posts/core", formData, {
            headers: {
                // 🎯 YAHAN BATA DIYA KI MULTIPART DATA HAI (JSON + FILE)
                "Content-Type": "multipart/form-data"
            }
        });

        console.log("Post Created:", response.data);
        console.log(response);
    } catch (error) {
        console.log("create post nhi chala")
        console.error("Error creating post:", error);
    }
   
}
    

   async function allPosts () {
   
    try {
        
        const response = await axios.get("http://localhost:8080/posts/core/allposts");

        setUserPost(response.data);

         console.log(response);
         console.log("all posts:", response.data);
       
    } catch (error) {
        console.log("allpost nhi chala")
        console.error("all post:", error);
    }
   
      }


      
 

   

     
    


     



  return (
      <div className="flex  w-full justify-center  ">
     
      <Routes>
              <Route path = "/login" element ={ isLoggedIn ? <Navigate to="/" /> : <Login  login={login} />}></Route>
               <Route path = "/signup" element ={ isLoggedIn ? <Navigate to="/" /> : <Signup setIsLoggedIn={setIsLoggedIn} signup={signup} login={login} loading={loading} />}></Route>

                  
                  
                  <Route path='/' element={isLoggedIn ? <MainHeader  logout={logout} user={user} /> :< Navigate to="/login" replace />} >
                          <Route index element={<Home user={user} />} />
                          <Route path="/my-network" element={<MyNetwork />} />
                          <Route path="/notifications" element={<Notifications />} />
                          <Route path="/me" element={<Me user={user} updateData={updateData} createPost={createPost} userPost={userPost}/>} />
                  </Route>

             
              <Route path="*" element={<NotFound />} />
  
  
     </Routes>


    </div>
 );
}

export default App;
