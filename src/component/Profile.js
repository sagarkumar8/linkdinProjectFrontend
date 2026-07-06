import React, { useState } from "react"
import { useEffect } from "react";
import "./profile.css"
import defaultCover from "../constence/default-cover.png"
import profileImage from "../constence/images.jpeg"
import { MdEdit } from "react-icons/md";


function Profile(props){


    const [editProfileData,setEditProfileData]=useState(
        {  name: "",
            headline: "",
            about: "",
            profileEmail: "",
            phoneNumber: "",
            gender: "",
            dateOfBirth: "",
            address: {
                street: "",
                city: "",
                state: "",
                country: "",
                pincode: ""
        }
        
        
        }
    )
    const[isEditing,setIsEditing]=useState(false);




  async function submitHandler(event)
    {    
         
           event.preventDefault(); 
           console.log(editProfileData);
           await props.updateData(editProfileData);
           setIsEditing(false)
    }


    useEffect(() => {
        if (props.user) {
            setEditProfileData({
                name: props.user.name || "",
                headline: props.user.headline || "",
                about: props.user.about || "",
                profileEmail: props.user.profileEmail || props.user.email || "",
                phoneNumber: props.user.phoneNumber || "",
                gender: props.user.gender || "",
                dateOfBirth: props.user.dateOfBirth || "",
                address: {
                    street: props.user.address?.street || "",
                    city: props.user.address?.city || "",
                    state: props.user.address?.state || "",
                    country: props.user.address?.country || "",
                    pincode: props.user.address?.pincode || ""
                }
            });
        }
    }, [props.user]);
      
    function changeHandler(event) {
    const { name, value } = event.target;

    // Check agar input address field ka hai (ex: address.city)
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1]; // gets 'city', 'state' etc.
      setEditProfileData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value
        }
      }));
    } else {
      // Regular fields ke liye
      setEditProfileData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  }
   
  

    if (!props.user) {
        return <div><span class="loader"></span></div>;
    }
   
console.log(isEditing)
console.log(props)
return (
    <div>
        <div className="relative w-full border-2 rounded-md shadow-md">
            <div className="h-[12rem] w-full border-2">
               <img src={props.user.conerPhotoUrl || defaultCover} className="h-full w-full object-cover "></img>
            </div>
            <div className="profile-image bg-gray-50">
                <img src={props.user.profilePictureUrl || profileImage} className="object-cover h-full w-full rounded-full p-1"></img>

            </div>
            <div className="h-[6rem] relative">

                <button className=" edit-profile text-3xl  p-2 rounded-full hover:bg-gray-200" onClick={()=>{setIsEditing(true)}}><MdEdit /></button>
                 
             { isEditing ? 

             (  <div className="form-wrapper">
                 <div className="edit-form-container border-2">  
                    <div className="flex ">
                        <h1 className="text-2xl border-b-2  shadow-sm font-bold ">Edit Intro</h1>
                        <button type="button" className="border-2" onClick={()=>setIsEditing(false)}>cross</button>

                    </div>
                    
                <form className="edit-form mt-3" onSubmit={submitHandler}>

                    <h3 className="form-section">Basic info</h3>
                    <label htmlFor="username" className="form-label">name</label>
                    <input 
                       type="text"  
                        className="form-input"
                        name="name" 
                        id="username" 
                         onChange={changeHandler} 
                         value={editProfileData.name}
                         
                     ></input>

                     <label htmlFor="headlineid" className="form-label">Headline</label>
                     <textarea
                     className="text-area-input"
                     id="headlineid"
                     name="headline"
                     placeholder="headline...."
                     value={editProfileData.headline}
                     onChange={changeHandler}
   

                     ></textarea>

                     <label htmlFor="aboutid" className="form-label">about</label>
                     <textarea
                     className="text-area-input"
                     id="aboutid"
                     name="about"
                     placeholder="about...."
                     value={editProfileData.about}
                      onChange={changeHandler}

                     ></textarea>

                   

                    <p className="form-label">Gender</p>
                    <div className="gender-section">
                    
                    <label htmlFor="maleid" className="form-label">Male</label>
                    <input type="radio"
                            name="gender"
                            value="male"
                            id="maleid"
                            onChange={changeHandler}
                            
                    ></input>

                    <label htmlFor="femaleid" className="form-label" >Female</label>
                    <input type="radio"  
                        name="gender"
                        value="female"
                        id="femaleid"
                        onChange={changeHandler}
                    ></input>

                    <label htmlFor="otherid" className="form-label">Other</label>
                    <input type="radio"  
                        name="gender"
                        value="other"
                        id="otherid"
                        onChange={changeHandler}
                    ></input>

                   </div>


                     <label htmlFor="dob" className="form-label">Date Of Birth</label>
                    <input type="date"
                       className="form-date-input"
                       name="dateOfBirth"
                       id="dob"
                       onChange={changeHandler}
                       value={editProfileData.dateOfBirth}
                       
                    ></input>

                    <h3 className="form-section">Contact info</h3>

                     <label htmlFor="useremail" className="form-label">email</label>
                    <input 
                        type="text"  
                        className="form-input"
                        name="profileEmail" 
                        inputMode="email"       
                        autoComplete="email"
                        id="useremail"  
                        onChange={changeHandler} 
                        value={editProfileData.profileEmail}
                        
                    ></input>

                    <label htmlFor="number" className="form-label">Contact Number</label>
                    <input type="text"
                      inputMode="nummeric"
                      className="form-input"
                       name="phoneNumber"
                       placeholder="Number"
                       id="number"
                       onChange={changeHandler}
                       value={editProfileData.phoneNumber}
                       
                    ></input>

                    <h3 className="form-section">Address</h3>

                     <label htmlFor="streetid" className="form-label">street</label>
                     <input type="text" 
                       className="form-input"
                       name="address.street"
                       placeholder="street"
                       id="streetid"
                       onChange={changeHandler}
                       value={editProfileData.address.street}
                       
                     ></input>

                    <label htmlFor="cityid" className="form-label">City</label>
                      <input type="text" 
                       className="form-input"
                       name="address.city"
                       placeholder="city"
                       id="cityid"
                       onChange={changeHandler}
                       value={editProfileData.address.city}
                    

                      ></input>

                        <label htmlFor="stateid" className="form-label">State</label>
                      <input type="text" 
                       className="form-input"
                       name="address.state"
                       placeholder="state"
                       id="stateid"
                       onChange={changeHandler}
                       value={editProfileData.address.state}
                        ></input>

                        <label htmlFor="countryid" className="form-label">Country</label>
                        <input type="text"
                            className="form-input"
                            name="address.country"
                            placeholder="country"
                            id="countryid"
                            onChange={changeHandler}
                            value={editProfileData.address.country}
                            
                        ></input>

                        <label htmlFor="pincodeid" className="form-label">Pincode</label>
                        <input type="text" 
                            className="form-input"
                            name="address.pincode"
                            placeholder="pincode"
                            id="pincode"
                            onChange={changeHandler}
                            value={editProfileData.address.pincode}
                            
                        ></input>

                        <div className="edit-form-submit">
                             <button type="submit"
                             className="edit-form-submit-btn"
                        
                           >Save</button>
                         </div>

                       

                </form>
               </div> 
            </div>
               ) :(
                <div> </div>
               )
             
             }
                
                
             

            </div>
            <div className="about-profile">

                    <h2 className="profile-name">{props.user.name}</h2>
                    <h3 className="headline">{props.user.headline} </h3>
                    <h2 className="about">{props.user.about} </h2>
                    <div className="info">
                        <p className=" text-gray-500">{props.user?.address?.city} {props.user.address?.state}</p>
                        <a className="contact-info">Contact info</a>

                    </div>
                
            </div>



        </div>
      



    </div>
)


}

export default Profile;